import {
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { Component, useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  LexendExa_100Thin,
  LexendExa_200ExtraLight,
  LexendExa_300Light,
  LexendExa_400Regular,
  LexendExa_500Medium,
  LexendExa_600SemiBold,
  LexendExa_700Bold,
  LexendExa_800ExtraBold,
  LexendExa_900Black,
} from "@expo-google-fonts/lexend-exa";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";

const recordingOptions = {
  android: {
    extension: ".m4a",
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
  },
  ios: {
    extension: ".wav",
    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
    sampleRate: 44100,
    numberOfChannels: 1,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
};

export default function S_RecruitmentScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    LexendExa_100Thin,
    LexendExa_200ExtraLight,
    LexendExa_300Light,
    LexendExa_400Regular,
    LexendExa_500Medium,
    LexendExa_600SemiBold,
    LexendExa_700Bold,
    LexendExa_800ExtraBold,
    LexendExa_900Black,
  });
  // useEffect(() => {
  //   async function prepare() {
  //     await SplashScreen.preventAutoHideAsync();
  //   }
  //   prepare();
  // }, []);

  const [sound, setSound] = React.useState();
  const [backCount, setBackCount] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [allow, setAllow] = useState(true);
  const [recording, setRecording] = useState(null);
  const [repeat, setRepeat] = useState(false);

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/recruitments/navigate-to-modules.mp3")
    );
    setSound(sound);
    setPlaying(true);
    setTimeout(() => {
      console.log("Playing Sound");
    }, 5000);
    await sound.playAsync();
    setTimeout(() => {
      setPlaying(false);
    }, 7000);
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const deleteRecordingFile = async () => {
    try {
      const info = await FileSystem.getInfoAsync(recording.getURI());
      await FileSystem.deleteAsync(info.uri);
    } catch (error) {
      console.log("There was an error deleting recording file", error);
    }
  };

  const getTranscription = async () => {
    setIsFetching(true);
    try {
      const info = await FileSystem.getInfoAsync(recording.getURI());
      console.log(`FILE INFO: ${JSON.stringify(info)}`);
      const uri = info.uri;

      const base64content: string = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const body = {
        audio: { content: base64content },
        config: {
          enableAutomaticPunctuation: true,
          encoding: "LINEAR16",
          languageCode: "vi-VN",
          model: "default",
          sampleRateHertz: 44100,
        },
      };

      const transcriptResponse = await fetch(
        "https://speech.googleapis.com/v1p1beta1/speech:recognize?key=AIzaSyATOBs4KUVhKDnk56MxhgOJtN8_Pw1Z280",
        {
          method: "POST",
          body: JSON.stringify(body),
        }
      );
      const data = await transcriptResponse.json();
      console.log(data);

      console.log(data.results);
      const message =
        (data.results && data.results[0].alternatives[0].transcript) || "";
      console.log(message);
      var str = message;
      str = str.replace(/\./g, "");
      console.log(str);
      switch (str) {
        case "Podcast": {
          navigation.navigate("PodcastStack", { screen: "PodcastTopic" });
          // navigation.navigate("PodcastTopic");
          break;
        }
        case "Trợ giúp": {
          navigation.navigate("HelpStack", { screen: "Help" });
          // navigation.navigate("Help");
          break;
        }
        case "Cài đặt": {
          break;
        }
        case "Tiếp thị": {
          navigation.navigate("MarketingConsulting");
          break;
        }
        case "Tiếp thì": {
          navigation.navigate("MarketingConsulting");
          break;
        }
      }
      console.log(str);
    } catch (error) {
      console.log("There was an error reading file", error);
      stopRecording();
      resetRecording();
    }
    setIsFetching(false);
  };

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      setIsRecording(true);

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(recordingOptions);
      await recording.startAsync();
      console.log("Start !!!");
      setRecording(recording);
    } catch (error) {
      console.log(error);
      stopRecording();
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    try {
      await recording.stopAndUnloadAsync();
    } catch (error) {
      // Do nothing -- we are already unloaded.
    }
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: false,
    });
    setAllow(false);
  };

  const resetRecording = () => {
    deleteRecordingFile();
    setRecording(null);
  };

  const start = () => {
    console.log("start recording");
    startRecording();
  };

  //   await Audio.setAudioModeAsync({
  //     allowsRecordingIOS: false,
  //   });

  const stop = () => {
    console.log("stop recording");

    stopRecording();
    getTranscription();
  };

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <TouchableOpacity
        onPressIn={() => {
          console.log(allow);
          sound.unloadAsync();

          start();
        }}
        onPressOut={() => {
          stop();
        }}
      >
        <View>
          <Text style={styles.title}>Tuyển dụng</Text>
          <View style={styles.line}></View>
          <View style={styles.content}>
            <View>
              <ImageBackground
                source={require("../assets/images/purposeoflife1.png")}
                onLoad={() => {
                  // setLoaded1(true);
                }}
                style={styles.backgroundImage}
                //  style={loaded ? styles.backgroundImage : { display: "none" }}
              >
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.label}>Tiếp thị</Text>
                </View>
              </ImageBackground>
            </View>
            <View>
              <ImageBackground
                source={require("../assets/images/getty_536615329_3428261.png")}
                style={styles.backgroundImage}
                // onLoad={() => setLoaded2(true)}
                // style={loaded ? styles.backgroundImage : { display: "none" }}
              >
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.label}>Lao động phổ thông</Text>
                </View>
              </ImageBackground>
            </View>
            <View>
              <ImageBackground
                source={require("../assets/images/How-to-Study-featured-image1.png")}
                style={styles.backgroundImage}
                onLoad={playSound}
                // style={loaded ? styles.backgroundImage : { display: "none" }}
              >
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.label}>Công việc khác</Text>
                </View>
              </ImageBackground>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginTop: 44,
    fontSize: 24,
    //fontWeight: "bold",
    fontFamily: "LexendExa_400Regular",
    color: "#000000",
    marginLeft: "auto",
    marginRight: "auto",
  },
  line: {
    width: 280,
    height: 1,
    backgroundColor: "#000000",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 4,
  },
  content: {
    height: "84%",
    //flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    paddingTop: 24,
    paddingBottom: 24,
    //backgroundColor: "black",
  },
  backgroundImage: {
    width: 344,
    height: 172,
    borderRadius: 12,
    overflow: "hidden",
    marginLeft: "auto",
    marginRight: "auto",
  },
  label: {
    fontSize: 28,
    fontFamily: "LexendExa_700Bold",
    color: "#ffffff",
    letterSpacing: -1.5,
  },
  loading: {
    marginTop: "132%",
    width: 60,
    height: 30,
    marginBottom: "280%",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
