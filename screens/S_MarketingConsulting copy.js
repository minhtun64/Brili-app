import {
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  PanResponder,
  Easing,
} from "react-native";

import { Audio } from "expo-av";
import React, {
  PureComponent,
  Component,
  useCallback,
  useEffect,
  useState,
} from "react";
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
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import sleep from "../components/sleep";
import DigitalTimeString from "../components/DigitalTimeString";
import { LogBox } from "react-native";

const TRACK_SIZE = 4;
const THUMB_SIZE = 20;

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

export default function S_MarketingConsulting({ navigation }) {
  const [sound, setSound] = React.useState();
  const [backCount, setBackCount] = React.useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [allow, setAllow] = useState(true);
  const [recording, setRecording] = useState(null);
  const [repeat, setRepeat] = useState(false);

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [trackLayout, setTrackLayout] = useState({});
  const dotOffset = useState(new Animated.ValueXY())[0];
  const [xDotOffsetAtAnimationStart, setXDotOffsetAtAnimationStart] =
    useState(0);
  const [loaded1, setLoaded1] = useState(false);
  const soundObject = useState(new Audio.Sound())[0];
  const panResponder = useState(
    PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: async (e, gestureState) => {
        if (playing) {
          await pause();
        }
        await setXDotOffsetAtAnimationStart(dotOffset.x._value);
        await dotOffset.setOffset({ x: dotOffset.x._value });
        await dotOffset.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (e, gestureState) => {
        Animated.event([null, { dx: dotOffset.x, dy: dotOffset.y }], {
          useNativeDriver: false,
        })(e, gestureState);
      },
      onPanResponderTerminationRequest: () => false,
      onPanResponderTerminate: async (evt, gestureState) => {
        const currentOffsetX = xDotOffsetAtAnimationStart + dotOffset.x._value;
        if (currentOffsetX < 0 || currentOffsetX > trackLayout.width) {
          await dotOffset.setValue({
            x: -xDotOffsetAtAnimationStart,
            y: 0,
          });
        }
        await dotOffset.flattenOffset();
        await mapAudioToCurrentTime();
      },
      onPanResponderRelease: async (e, { vx }) => {
        const currentOffsetX = xDotOffsetAtAnimationStart + dotOffset.x._value;
        if (currentOffsetX < 0 || currentOffsetX > trackLayout.width) {
          await dotOffset.setValue({
            x: -xDotOffsetAtAnimationStart,
            y: 0,
          });
        }
        await dotOffset.flattenOffset();
        await mapAudioToCurrentTime();
        await onPressPlayPause();
      },
    })
  )[0];

  const loadedImage = async () => {
    setLoaded1(true);
  };

  const onSwipeLeft = (gestureState) => {
    dotOffset.setValue({ x: 0, y: 0 });
    soundObject.setPositionAsync(0);
    navigation.navigate("MarketingConsulting2");
    pause();
    dotOffset.removeAllListeners();
  };

  const onSwipeRight = (gestureState) => {
    soundObject.unloadAsync();
    dotOffset.removeAllListeners();
    navigation.navigate("S_Recruitment");
  };

  const onArrowRight = () => {
    console.log("Next Screen - Using ArrowRight");
    dotOffset.setValue({ x: 0, y: 0 });
    soundObject.setPositionAsync(0);
    navigation.navigate("MarketingConsulting2");
    pause();
    dotOffset.removeAllListeners();
  };

  const mapAudioToCurrentTime = async () => {
    await soundObject.setPositionAsync(currentTime);
  };

  const onPressPlayPause = async () => {
    if (playing) {
      await pause();
      return;
    }
    await play();
  };

  const play = async () => {
    await soundObject.playAsync();
    setPlaying(true);
    startMovingDot();
  };

  const pause = async () => {
    await soundObject.pauseAsync();
    setPlaying(false);
    Animated.timing(dotOffset).stop();
  };

  const startMovingDot = async () => {
    const status = await soundObject.getStatusAsync();
    const durationLeft = status.durationMillis - status.positionMillis;
    Animated.timing(dotOffset, {
      toValue: { x: trackLayout.width, y: 0 },
      duration: durationLeft,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      animationPausedOrStopped();
    });
  };

  const animationPausedOrStopped = async () => {
    if (!playing) {
      return;
    }
    console.log("Next Screen");
    await sleep(200);
    await dotOffset.setValue({ x: 0, y: 0 });
    await soundObject.setPositionAsync(0);
    navigation.navigate("MarketingConsulting2");
    pause();
    dotOffset.removeAllListeners();
  };

  const measureTrack = (event) => {
    setTrackLayout(event.nativeEvent.layout);
  };

  const fastForward = async () => {
    const status = await soundObject.getStatusAsync();
    setPlaying(false);
    dotOffset.setValue({
      x:
        (trackLayout.width / status.durationMillis) *
        (status.positionMillis + 15000),
      y: 0,
    });
    await soundObject.setPositionAsync(status.positionMillis + 15000);
    onPressPlayPause();
  };

  const fastBackward = async () => {
    const status = await soundObject.getStatusAsync();
    setPlaying(false);
    if (status.positionMillis >= 15000) {
      dotOffset.setValue({
        x:
          (trackLayout.width / status.durationMillis) *
          (status.positionMillis - 15000),
        y: 0,
      });
    } else {
      dotOffset.setValue({ x: 0, y: 0 });
    }
    await soundObject.setPositionAsync(status.positionMillis - 15000);
    onPressPlayPause();
  };

  useEffect(() => {
    const setupSound = async () => {
      await soundObject.loadAsync(
        require("../assets/recruitments/recruitment-1.mp3")
      );
      const status = await soundObject.getStatusAsync();
      setDuration(status.durationMillis);
      await onPressPlayPause();
      dotOffset.addListener(() => {
        let animatedCurrentTime = dotOffset.x
          .interpolate({
            inputRange: [0, trackLayout.width],
            outputRange: [0, duration],
            extrapolate: "clamp",
          })
          .__getValue();
        setCurrentTime(animatedCurrentTime);
      });
    };

    setupSound();

    return () => {
      const cleanup = async () => {
        await soundObject.playAsync();
        dotOffset.removeAllListeners();
      };

      cleanup();
    };
  }, []);

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/JobList/sound1.mp3")
    );
    setSound(sound);
    setPlaying(true);
    setTimeout(() => {
      console.log("Playing Sound");
    }, 2000);
    await sound.playAsync();
    setTimeout(() => {
      setPlaying(false);
    }, 10000);
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
    } catch (error) {}
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

  const stop = () => {
    console.log("stop recording");

    stopRecording();
    getTranscription();
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

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

      <Text style={styles.title}>Tiếp thị</Text>
      <View style={styles.line}></View>

      <View style={styles.searchBox}>
        <Image
          style={styles.searchIcon}
          source={require("../assets/icons/search.png")}
        ></Image>
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm"
          returnKeyType="search"
          //value={search}
          //onChangeText={(text) => setSearch(text)}
        ></TextInput>
      </View>
      <GestureRecognizer
        keyboardShouldPersistTaps="handled"
        onSwipeLeft={(state) => onSwipeLeft(state)}
        onSwipeRight={(state) => onSwipeRight(state)}
        config={config}
        style={styles.podcastImage}
      >
        <Text style={styles.jobName}>
          Nhân viên tư vấn gói chăm sóc sức khỏe
        </Text>
        <Text style={styles.companayName}>ManpowerGroupVietNam</Text>
      </GestureRecognizer>

      <View style={styles.job}>
        <View style={styles.row}>
          <TouchableOpacity>
            <Image
              style={styles.arrowLeft}
              source={require("../assets/icons/arrow-left.png")}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onArrowRight()}>
            <Image
              style={styles.arrowRight}
              source={require("../assets/icons/arrow-right.png")}
            ></Image>
          </TouchableOpacity>
        </View>
      </View>

      <GestureRecognizer
        keyboardShouldPersistTaps="handled"
        onSwipeLeft={(state) => onSwipeLeft(state)}
        onSwipeRight={(state) => onSwipeRight(state)}
        config={config}
        style={styles.jobImage}
      >
        {loaded1 ? null : (
          <Image
            style={styles.image}
            source={require("../assets/images//job1-loading.png")}
          ></Image>
        )}
        <Image
          style={styles.image}
          source={require("../assets/images/job1.png")}
          onLoad={() => loadedImage()}
        ></Image>
      </GestureRecognizer>
      <View style={styles.row1}>
        <TouchableOpacity onPress={onPressPlayPause}>
          {playing ? (
            <Image
              style={styles.pauseIcon}
              source={require("../assets/icons/pause-podcast.png")}
            ></Image>
          ) : (
            <Image
              style={styles.pauseIcon}
              source={require("../assets/icons/play-podcast.png")}
            ></Image>
          )}
        </TouchableOpacity>

        <Animated.View
          onLayout={measureTrack}
          style={{
            alignItems: "center",
            height: TRACK_SIZE,
            borderRadius: TRACK_SIZE / 2,
            backgroundColor: "black",
            width: "60%",
            marginTop: 24,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Animated.View
            style={{
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              left: -((THUMB_SIZE * 4) / 2),
              width: THUMB_SIZE * 4,
              height: THUMB_SIZE * 4,
              transform: [
                {
                  translateX: dotOffset.x.interpolate({
                    inputRange: [0, trackLayout.width || 1],
                    outputRange: [0, trackLayout.width || 1],
                    extrapolate: "clamp",
                  }),
                },
              ],
            }}
            {...PanResponder.panHandlers}
          >
            <View
              style={{
                width: THUMB_SIZE,
                height: THUMB_SIZE,
                borderRadius: THUMB_SIZE / 2,
                backgroundColor: "rgba(0,0,0,0.5)",
                marginTop: -76,
              }}
            ></View>
          </Animated.View>
        </Animated.View>

        <View
          style={{
            flex: 0,
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 12,
            marginLeft: -8,
            marginTop: 16,
          }}
        >
          <Text>-</Text>
          <DigitalTimeString time={duration - currentTime} />
        </View>
      </View>
      <View style={styles.line1}></View>
      <ScrollView>
        <GestureRecognizer
          style={{ height: "100%" }}
          keyboardShouldPersistTaps="handled"
          onSwipeLeft={(state) => onSwipeLeft(state)}
          onSwipeRight={(state) => onSwipeRight(state)}
          config={config}
        >
          <View style={styles.detailJob}>
            <Image
              style={styles.iconDetail}
              source={require("../assets/icons/user-square.png")}
            ></Image>
            <Text style={styles.textIcon}>Số lượng: </Text>
            <Text style={styles.textDes}>3 nhân viên nữ, 1 nhân viên nam</Text>
          </View>
          <View style={styles.detailJob}>
            <Image
              style={styles.iconDetail}
              source={require("../assets/icons/dollar-square.png")}
            ></Image>
            <Text style={styles.textIcon}>Mức lương: </Text>
            <Text style={styles.textDes}>4 - 7 triệu</Text>
          </View>
          <View style={styles.detailJob}>
            <Image
              style={styles.iconDetail}
              source={require("../assets/icons/location.png")}
            ></Image>
            <Text style={styles.textIcon}>Địa chỉ: </Text>
            <Text style={styles.textDes}>
              26 Đường Hoàng Cầm, Phường Bình An, Thành phố Dĩ An, tỉnh Bình
              Dương
            </Text>
          </View>
          <View style={styles.detailJob}>
            <Image
              style={styles.iconDetail}
              source={require("../assets/icons/calendar.png")}
            ></Image>
            <Text style={styles.textIcon}>Ngày đăng: </Text>
            <Text style={styles.textDes}>2/3/2023</Text>
          </View>
          <View style={styles.detailJob}>
            <Image
              style={styles.iconDetail}
              source={require("../assets/icons/calendar.png")}
            ></Image>
            <Text style={styles.textIcon}>Mô tả công việc: </Text>
          </View>
          <Text style={styles.textDes2}>
            - Môi trường làm việc quốc tế, chuyên nghiệp, sạch sẽ, lành mạnh,
            văn minh, nói không với tệ nạn xã hội. Đối tượng khách hàng là khách
            du lịch quốc tế và Việt Nam có mức thu nhập khá.
          </Text>
          <View style={styles.detailJob}>
            <Image
              style={styles.iconDetail}
              source={require("../assets/icons/calendar.png")}
            ></Image>
            <Text style={styles.textIcon}>Yêu cầu: </Text>
          </View>
          <Text style={styles.textDes2}>
            - Có tay nghề massage, ưu tiên những bạn có kinh nghiệm và có sẵn
            chứng chỉ massage. Nếu chưa biết nghề sẽ được đào tạo thêm.
          </Text>
          <View style={styles.detailJob}>
            <Image
              style={styles.iconDetail}
              source={require("../assets/icons/calendar.png")}
            ></Image>
            <Text style={styles.textIcon}>Liên hệ: </Text>
            <Text style={[styles.textDes, { color: "red" }]}>
              069 797 3232 {"\n"}056 780 6910
            </Text>
          </View>
          <TouchableOpacity
            style={styles.confirm}
            onPress={() => {
              onPressPlayPause();
              navigation.navigate("S_CurriculumVitae");
            }}
          >
            <Text style={styles.TextConfirm}>Ứng tuyển công việc</Text>
          </TouchableOpacity>
        </GestureRecognizer>

        <View style={{ height: 500 }}></View>
      </ScrollView>
    </TouchableOpacity>
  );
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
