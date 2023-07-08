import {
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
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
import {
  useNavigation,
  useScrollToTop,
  useRoute,
} from "@react-navigation/native";

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

export default function S_PreRecruitmentScreen({ navigation }) {
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

  const route = useRoute();
  const type = route?.params?.type;

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/JobList/sound1.mp3")
    );
    setSound(sound);
    setPlaying(true);
    await sound.playAsync();
    setTimeout(() => {
      setPlaying(false);
      navigation.navigate("S_MarketingConsulting", {
        type: type,
      });
    }, 8000);
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
          navigation.navigate("S_MarketingConsulting");
          break;
        }
        case "Tiếp thì": {
          navigation.navigate("S_MarketingConsulting");
          break;
        }
        case "Lao động phổ thông": {
          navigation.navigate("S_PreRecruitment", {
            type: "Lao động phổ thông",
          });
          break;
        }
        case "Các công việc khác": {
          navigation.navigate("S_PreRecruitment", {
            type: "Các công việc khác",
          });
          break;
        }
        case "Cuộc sống": {
          navigation.navigate("ListenToPodcast", {
            topic: "Brili - Life",
          });
          break;
        }
        case "Tình Yêu": {
          navigation.navigate("ListenToPodcast", {
            topic: "Brili - Love",
          });
          break;
        }
        case "Học tập": {
          navigation.navigate("ListenToPodcast", {
            topic: "Brili - Study",
          });
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
        <TouchableOpacity
          style={styles.back}
          onPress={() => {
            navigation.navigate("Recruitment");
            soundObject.unloadAsync();
            dotOffset.removeAllListeners();
          }}
        >
          <Image
            style={styles.backIcon}
            source={require("../assets/icons/back.png")}
          ></Image>
        </TouchableOpacity>

        <Text style={styles.title}>{type}</Text>
        <View style={styles.line}></View>

        <View style={styles.searchBox}>
          <Image
            style={styles.searchIcon}
            source={require("../assets/icons/search.png")}
            onLoad={playSound}
          ></Image>
          <TextInput
            style={styles.input}
            placeholder="Tìm kiếm"
            returnKeyType="search"
            //value={search}
            //onChangeText={(text) => setSearch(text)}
          ></TextInput>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  back: {
    width: 40,
  },
  backIcon: {
    width: 40,
    height: 40,
    marginTop: 48,
  },
  title: {
    marginTop: -28,
    fontSize: 24,
    //fontWeight: "bold",
    fontFamily: "LexendExa_400Regular",
    color: "#000000",
    marginLeft: "auto",
    marginRight: "auto",
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

  line1: {
    width: 380,
    height: 1,
    backgroundColor: "#E7E3E3",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 8,
  },

  searchBox: {
    margin: 20,
    height: 40,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "#E7E3E3",
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginTop: 8,
    marginLeft: 8,
    marginRight: 12,
  },
  input: {
    width: "100%",
  },
  label: {
    marginLeft: 16,
    marginRight: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  allText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  sort: {
    padding: 4,
    width: 60,
    backgroundColor: "#777D84",
    borderRadius: 8,
  },
  sortText: {
    color: "#ffffff",
    marginLeft: "auto",
    marginRight: "auto",
  },
  emptyText: {
    color: "#777D84",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 120,
  },
  add: {
    position: "absolute",
    bottom: "30%",
    right: 20,
  },
  addImage: {
    width: 60,
    height: 60,
  },
  jobName: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  companayName: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    color: "#777D84",
  },

  jobImage: {
    width: 240,
    height: 160,
    borderRadius: 8,
    overflow: "hidden",
    marginLeft: "auto",
    marginRight: "auto",
    //marginTop: 18,
    //marginBottom: 6,
  },

  image: {
    width: 240,
    height: 160,
  },

  containerImg: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    alignItems: "center",
  },
  job: {
    padding: 12,
  },
  row: {
    width: "100%",
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row1: {
    width: "100%",
    flex: 0,

    flexDirection: "row",
    justifyContent: "space-between",
  },
  arrowLeft: {
    marginTop: 72,
    marginBottom: "auto",
    padding: 18,
    width: 30,
    height: 30,
  },
  arrowRight: {
    marginTop: 72,
    marginBottom: "auto",
    padding: 18,
    width: 30,
    height: 30,
  },
  audioInfo: {
    width: 320,
    height: 16,
  },
  audioInfoContainer: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  detailJob: {
    flexDirection: "row",
    //    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: 15,
    marginRight: 15,
    marginTop: 30,
  },
  iconDetail: {
    width: 30,
    height: 30,
  },
  textIcon: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    width: 150,
  },
  textDes: {
    fontSize: 18,
    width: 200,
  },
  textDes2: {
    fontSize: 18,
    marginLeft: 70,
    marginRight: 15,
  },
  confirm: {
    height: 65,
    backgroundColor: "#195ABB",
    marginBottom: 120,
    marginTop: 40,
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
  pauseIcon: {
    marginTop: 4,
    width: 40,
    height: 40,
    marginLeft: 28,
  },
});
