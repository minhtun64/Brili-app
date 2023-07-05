import {
  Text,
  Keyboard,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React, { Component, useCallback, useEffect, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Modal from "react-native-modal";
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
import * as Speech from "expo-speech";

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

export default function S_CurriculumVitae_2({ navigation }) {
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

  const [sound, setSound] = React.useState();
  const [backCount, setBackCount] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [allow, setAllow] = useState(true);
  const [recording, setRecording] = useState(null);
  const [repeat, setRepeat] = useState(false);
  const [loading, setLoading] = useState(false);

  async function playSound(soundFile) {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(soundFile);
    setSound(sound);
    setPlaying(true);
    console.log(`Playing Sound: ${soundFile}`);
    await sound.playAsync();
    const soundStatus = await sound.getStatusAsync();
    const duration = soundStatus.durationMillis; // Lấy độ dài thực tế của tệp âm thanh
    setTimeout(() => {
      setPlaying(false);
    }, duration);
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
          navigation.navigate("S_PreRecruitment");
          break;
        }
        case "Tiếp thì": {
          navigation.navigate("S_PreRecruitment");
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

  return (
    <TouchableOpacity
      onPressIn={() => {
        console.log(allow);
        // sound.unloadAsync();

        start();
      }}
      onPressOut={() => {
        stop();
      }}
      style={styles.mainForm}
      onPress={() => {
        setBackCount(backCount + 1);
        if (backCount == 1) {
          sound.unloadAsync();
          setBackCount(0);
          navigation.navigate("MarketingConsulting");
        } else {
          setTimeout(() => {
            setBackCount(0);
          }, 10000);
          // playSound(require("../assets/sounds/CV/sound18.mp3"));
        }
      }}
    >
      <View style={styles.back}>
        <Image
          style={styles.backIcon}
          source={require("../assets/icons/back.png")}
        ></Image>
      </View>
      <Text style={styles.title}>Hồ sơ ứng tuyển</Text>
      <View>
        <Image
          style={styles.icon}
          source={require("../assets/icons/success.png")}
        ></Image>
        <Text style={styles.title1}>Đã gửi thành công</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  title1: {
    // fontSize: 24,
    fontFamily: "LexendExa_200ExtraLight",
    color: "green",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 12,
    fontSize: 20,
    letterSpacing: -2,
    marginBottom: "100%",
  },
  icon: {
    width: 60,
    height: 60,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 150,
  },
  container: {
    flex: 1,
  },
  back: {
    width: 36,
  },
  backIcon: {
    width: 36,
    height: 36,
    marginTop: 40,
  },
  title: {
    marginTop: -36,
    fontSize: 24,
    fontFamily: "LexendExa_400Regular",
    color: "#000000",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 24,
    letterSpacing: -2,
  },
  line: {
    width: 280,
    height: 1,
    backgroundColor: "#000000",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 4,
  },

  formInput: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 80,
  },
  formInputEx: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 150,
  },
  NameTitle: {
    fontWeight: "500",
    fontSize: 20,
  },
  Content: {
    fontSize: 20,
    backgroundColor: "#D9D9D9",
    borderRadius: 12,
    height: 40,
    marginTop: 10,
    marginLeft: 14,
    marginRight: 14,
    paddingLeft: 14,
  },
  ContentEx: {
    fontSize: 20,
    backgroundColor: "#D9D9D9",
    borderRadius: 12,
    height: 100,
    marginTop: 10,
    marginLeft: 14,
    marginRight: 14,
    paddingLeft: 14,
  },
  InputGender: {
    flexDirection: "row",
    marginLeft: 14,
    marginRight: 14,
    backgroundColor: "#D9D9D9",
    height: 40,
    marginTop: 20,
    borderRadius: 12,
  },
  OptionGender: {
    width: "50%",
    height: 40,

    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  GenderActive: {
    backgroundColor: "#FFBE18",
  },
  TextInputGender: {
    color: "white",
    fontSize: 20,
  },
  buttonDate: {
    height: 40,
    backgroundColor: "#D9D9D9",
    marginTop: 20,
    borderRadius: 12,
    marginLeft: 14,
    marginRight: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textDate: {
    fontSize: 20,
    marginLeft: 14,
  },
  dateIcon: {
    width: 34,
    height: 34,
    marginRight: 14,
  },
  confirm: {
    height: 65,
    backgroundColor: "#195ABB",
    marginBottom: 120,
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  TextConfirm: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  popup: {
    width: 350,
    height: 200,
    backgroundColor: "#ffffff",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 20,
    padding: 20,
    justifyContent: "center",
  },
  TextConfirm2: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
  btnConfirm: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    marginTop: 20,
    height: 50,
  },
  cancle: {
    width: "45%",
    borderWidth: 2,
    borderColor: "#1868DF",
    borderRadius: 12,
    justifyContent: "center",
  },
  textcancle: {
    textAlign: "center",
    color: "#1868DF",
    fontSize: 24,
    fontWeight: "bold",
  },
  send: {
    width: "45%",
    borderWidth: 2,
    borderColor: "#1868DF",
    backgroundColor: "#1868DF",
    borderRadius: 12,
    justifyContent: "center",
  },
  textsend: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
});
