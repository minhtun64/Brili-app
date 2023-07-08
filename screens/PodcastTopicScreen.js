import {
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
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

import * as SplashScreen from "expo-splash-screen";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import * as Speech from "expo-speech";
import { useFocusEffect } from "@react-navigation/native";

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

export default function PodcastTopicScreen({ navigation }) {
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
  const [reloadImage, setReloadImage] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      // Tải lại hình ảnh
      setReloadImage(!reloadImage);
    }, [navigation])
  );

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const [loaded1, setLoaded1] = useState(false);
  const [loaded2, setLoaded2] = useState(false);
  const [loaded3, setLoaded3] = useState(false);

  const [sound, setSound] = React.useState();
  const [backCount, setBackCount] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [allow, setAllow] = useState(true);
  const [recording, setRecording] = useState(null);
  const [repeat, setRepeat] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageKey, setImageKey] = useState(0);

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
        case "Tuyển dụng": {
          navigation.navigate("RecruitmentStack", { screen: "Recruitment" });
          // navigation.navigate("PodcastTopic");
          break;
        }
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
          navigation.navigate("S_PreRecruitment", {
            type: "Tiếp thị",
          });
          break;
        }
        case "Tiếp thì": {
          navigation.navigate("S_PreRecruitment", {
            type: "Tiếp thị",
          });
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
          // setTimeout(() => {
          //   navigation.navigate("S_LinktoSpotify");
          // }, 2000);
        }}
        style={styles.mainForm}
      >
        <Text style={styles.title}>Chủ đề</Text>
        <View style={styles.line}></View>
        <View style={styles.content}>
          {loaded1 && loaded2 && loaded3 ? null : (
            <Image
              source={require("../assets/images/loading1.gif")}
              style={styles.loading}
            ></Image>
          )}

          {/* button navigate to  Brili-Life podcasts */}
          <View>
            <View
            // onPress={() => navigation.navigate("S_LinktoSpotify")}
            >
              <ImageBackground
                key={reloadImage}
                source={require("../assets/images/brili-life.png")}
                onLoad={() => {
                  setLoaded1(true);
                  playSound(require("../assets/sounds/sound12.mp3"));
                }}
                style={styles.backgroundImage}
              >
                <View
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 4,
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.label}>Brili - Life</Text>
                </View>
              </ImageBackground>
            </View>
          </View>

          {/* button navigate to  Brili-Love podcasts */}
          <View>
            <View>
              <ImageBackground
                source={require("../assets/images/brili-love.png")}
                style={styles.backgroundImage}
                onLoad={() => setLoaded2(true)}
              >
                <View
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 4,
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.label}>Brili - Love</Text>
                </View>
              </ImageBackground>
            </View>
          </View>

          {/* button navigate to  Brili-Study podcasts */}
          <View>
            <View>
              <ImageBackground
                source={require("../assets/images/brili-study.png")}
                style={styles.backgroundImage}
                onLoad={() => setLoaded3(true)}
              >
                <View
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 4,
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.label}>Brili - Study</Text>
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
    height: "86%",
    flexDirection: "column",
    justifyContent: "space-around",
    paddingTop: 24,
    paddingBottom: 48,
  },
  backgroundImage: {
    width: 300,
    height: 180,
    borderRadius: 12,
    overflow: "hidden",
    marginLeft: "auto",
    marginRight: "auto",
  },
  label: {
    fontSize: 36,
    fontFamily: "LexendExa_500Medium",
    color: "#ffffff",
    letterSpacing: -1.6,
  },

  loading: {
    marginTop: "126%",
    width: 60,
    height: 30,
    marginBottom: "320%",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
