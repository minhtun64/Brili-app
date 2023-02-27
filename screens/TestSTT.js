import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ActivityIndicator, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
// import FadeInView from './components/FadeInView';
import { Audio } from 'expo-av';
// import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
// import { InstantSearch } from 'react-instantsearch-native';
// import algoliasearch from 'algoliasearch/lite';

// import config from './config';
// import SearchBox from './components/SearchBox';
// import Hits from './components/Hits';

// const searchClient = algoliasearch(
//     config.ALGOLIA_APP_ID,
//     config.ALGOLIA_API_KEY,
// );

const recordingOptions = {
    // android not currently in use, but parameters are required
    android: {
      extension: ".acc",
      outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
      audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
      sampleRate: 16000,
      numberOfChannels: 1,
      bitRate: 128000,
    },
    ios: {
      extension: ".m4a",
      audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
      sampleRate: 44100,
      numberOfChannels: 1,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
  };

const TestSTT = () => {
    const [recording, setRecording] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [query, setQuery] = useState('');

    useEffect(() => {
        Audio.requestPermissionsAsync()
    }, []);

    const deleteRecordingFile = async () => {
        try {
            const info = await FileSystem.getInfoAsync(recording.getURI());
            await FileSystem.deleteAsync(info.uri)
        } catch(error) {
            console.log("There was an error deleting recording file", error);
        }
    }

    const startRecording = async () => {
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== 'granted') return;

        setIsRecording(true);
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            // interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            // shouldDuckAndroid: true,
            // interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            // playThroughEarpieceAndroid: true,
        });
        const recording = new Audio.Recording();

        try {
            await recording.prepareToRecordAsync(recordingOptions);
            await recording.startAsync();
        } catch (error) {
            console.log(error);
            stopRecording();
        }
        setRecording(recording);
    }

    const stopRecording = async () => {
        setIsRecording(false);
        try {
            await recording.stopAndUnloadAsync();
        } catch (error) {
            // Do nothing -- we are already unloaded.
        }
    }
    
    const getTranscription = async () => {
        setIsFetching(true);
        try {
            const info = await FileSystem.getInfoAsync(recording.getURI());
            console.log(`FILE INFO: ${JSON.stringify(info)}`);
            const uri = info.uri;

            await toDataUrl(uri, async function (base64content) {
                if (Platform.OS == "ios")
                  base64content = base64content.replace("data:audio/m4a;base64,", "");
                else
                  base64content = base64content.replace("data:audio/aac;base64,", "");
        
                console.log(recording?._options?.android)
                
                const body = {
                  audio: {
                    content: base64content,
                  },
                  config: {
                    enableAutomaticPunctuation: true,
                    encoding: "LINEAR16",
                    languageCode: "en-US",
                    model: "default",
                    sampleRateHertz: 16000,
                  },
                };
            });
            const transcriptResponse = await fetch(
                "https://speech.googleapis.com/v1p1beta1/speech:recognize?key=AIzaSyATOBs4KUVhKDnk56MxhgOJtN8_Pw1Z280",
                { method: "POST", body: JSON.stringify(body) }
              );
              const data = await transcriptResponse.json();
      
              const userMessage = data.results && data.results[0].alternatives[0].transcript || "";
              setQuery(userMessage);
              console.log(query);
            // const formData = new FormData();
            // formData.append('file', {
            //     uri,
            //     type: 'audio/flac',
            //     name: 'speech2text'
            // });
            // const response = await fetch("https://speech.googleapis.com/v1p1beta1/speech:recognize?key=AIzaSyATOBs4KUVhKDnk56MxhgOJtN8_Pw1Z280", {
            //     method: 'POST',
            //     body: formData
            // });
            // const data = await response.json();
            // console.log(data);
            // setQuery(data.transcript);
            // console.log(query);            
        } catch(error) {
            console.log('There was an error reading file', error);
            stopRecording();
            resetRecording();
        }
        setIsFetching(false);
    }

    const resetRecording = () => {
        deleteRecordingFile();
        setRecording(null);
    };

    const handleOnPressIn = () => {
        startRecording();
    };

    const handleOnPressOut = () => {
        stopRecording();
        getTranscription();
    };

    const handleQueryChange = (query) => {
        setQuery(query);
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                {isRecording &&
                    <View>
                        <FontAwesome name="microphone" size={32} color="#48C9B0" />
                    </View>
                }
                {!isRecording &&
                    <FontAwesome name="microphone" size={32} color="#48C9B0" />
                }
                <Text>Voice Search</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPressIn={handleOnPressIn}
                    onPressOut={handleOnPressOut}
                >
                    {isFetching && <ActivityIndicator color="#ffffff" />}
                    {!isFetching && <Text>Hold for Voice Search</Text>}
                </TouchableOpacity>
            </View>
            <View style={{paddingHorizontal: 20}}>                
                <Text>{query}</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 80,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#48C9B0',
        paddingVertical: 20,
        width: '90%',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
    }
});

export default TestSTT;