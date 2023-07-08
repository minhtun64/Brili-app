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
import { database } from "../firebase";
import { onValue, ref, get } from "firebase/database";

import { Audio } from "expo-av";
import React, {
  useState,
  useEffect,
  useCallback,
  PureComponent,
  Component,
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
import {
  useNavigation,
  useScrollToTop,
  useRoute,
} from "@react-navigation/native";

const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
};

const TRACK_SIZE = 4;
const THUMB_SIZE = 20;

export default function S_MarketingConsulting({ navigation }) {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [trackLayout, setTrackLayout] = useState({});
  const [dotOffset] = useState(new Animated.ValueXY());
  const [recruitments, setRecruitments] = useState([]);
  const [currentRecruitmentIndex, setCurrentRecruitmentIndex] = useState(0);
  const [title, setTitle] = useState("");
  const [backCount, setBackCount] = useState(0);
  const [isPause, setIsPause] = useState(false);

  const soundObject = new Audio.Sound();

  const route = useRoute();
  const type = route?.params?.type;

  const loadRecruitments = useCallback(async () => {
    const recruitmentRef = ref(database, "recruitment");
    const snapshot = await get(recruitmentRef);
    if (snapshot.exists()) {
      const recruitmentList = [];
      snapshot.forEach((childSnapshot) => {
        const recruitment = childSnapshot.val();
        if (recruitment.type === type) {
          recruitmentList.push(recruitment);
        }
      });
      setRecruitments(recruitmentList);
    }
    console.log(recruitmentList);
  }, []);

  const loadRecruitmentAudio = useCallback(async (recruitment) => {
    console.log("Hủy tải audio");
    await soundObject.unloadAsync();
    if (!isPause) {
      console.log("Tải audio");
      await soundObject.loadAsync({ uri: recruitment.audio });
      await onPressPlayPause();
    }
  }, []);

  const onPressPlayPause = async () => {
    if (playing) {
      console.log("Dừng audio");
      await pause();
    } else {
      console.log("Phát audio");
      await play();
    }
  };

  const play = async () => {
    await soundObject.playAsync();
    setPlaying(true);
    // startMovingDot();
  };

  const pause = async () => {
    await soundObject.pauseAsync();
    setPlaying(false);
    // Animated.timing(dotOffset).stop();
  };

  const handlePreviousRecruitment = () => {
    if (currentRecruitmentIndex > 0) {
      setCurrentRecruitmentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNextRecruitment = () => {
    if (currentRecruitmentIndex < recruitments.length - 1) {
      setCurrentRecruitmentIndex((prevIndex) => prevIndex + 1);
    }
  };

  useEffect(() => {
    console.log("Tải - Effect");
    loadRecruitments();
    return () => {
      console.log("Hủy tải - Effect");
      soundObject.unloadAsync();
    };
  }, [loadRecruitments]);

  useEffect(() => {
    if (recruitments.length > 0) {
      loadRecruitmentAudio(recruitments[currentRecruitmentIndex]);
    }
  }, [recruitments, isPause, currentRecruitmentIndex, loadRecruitmentAudio]);

  return (
    <View>
      <TouchableOpacity style={styles.back} disabled>
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
        ></Image>
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm"
          returnKeyType="search"
        ></TextInput>
      </View>
      {recruitments.length > 0 && (
        <View>
          <GestureRecognizer
            keyboardShouldPersistTaps="handled"
            onSwipeLeft={(state) => this.onSwipeLeft(state)}
            onSwipeRight={(state) => this.onSwipeRight(state)}
            config={config}
            style={styles.podcastImage}
          >
            <Text style={styles.jobName}>
              {recruitments[currentRecruitmentIndex].job_name}
            </Text>
            <Text style={styles.companayName}>
              {recruitments[currentRecruitmentIndex].company_name}
            </Text>
          </GestureRecognizer>

          <View style={styles.job}>
            <View style={styles.row}>
              <TouchableOpacity onPress={handlePreviousRecruitment}>
                <Image
                  style={styles.arrowLeft}
                  source={require("../assets/icons/arrow-left.png")}
                ></Image>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNextRecruitment}>
                <Image
                  style={styles.arrowRight}
                  source={require("../assets/icons/arrow-right.png")}
                ></Image>
              </TouchableOpacity>
            </View>
          </View>

          <GestureRecognizer
            keyboardShouldPersistTaps="handled"
            onSwipeLeft={handleNextRecruitment}
            onSwipeRight={handlePreviousRecruitment}
            onSwipeUp={() => {
              navigation.navigate("S_Recruitment");
            }}
            onSwipeDown={() => {
              navigation.navigate("S_Recruitment");
              navigation.navigate("S_CurriculumVitae");
            }}
            config={config}
            style={styles.jobImage}
          >
            {/* {this.state.loaded1 ? null : (
            <Image
              style={styles.image}
              source={require("../assets/images//job1-loading.png")}
            ></Image>
          )} */}
            <Image
              style={styles.image}
              source={{ uri: recruitments[currentRecruitmentIndex].job_image }}
              // onLoad={() => this.loadedImage()}
            ></Image>
          </GestureRecognizer>

          <ScrollView>
            <GestureRecognizer
              style={{ height: "100%" }}
              keyboardShouldPersistTaps="handled"
              onSwipeLeft={handleNextRecruitment}
              onSwipeRight={handlePreviousRecruitment}
              onSwipeUp={() => {
                navigation.navigate("S_Recruitment");
              }}
              onSwipeDown={() => {
                navigation.navigate("S_Recruitment");
                navigation.navigate("S_CurriculumVitae");
              }}
              config={config}
            >
              <View style={styles.detailJob}>
                <Image
                  style={styles.iconDetail}
                  source={require("../assets/icons/user-square.png")}
                ></Image>
                <Text style={styles.textIcon}>Số lượng: </Text>
                <Text style={styles.textDes}>
                  {recruitments[currentRecruitmentIndex].quantity}
                </Text>
              </View>
              <View style={styles.detailJob}>
                <Image
                  style={styles.iconDetail}
                  source={require("../assets/icons/dollar-square.png")}
                ></Image>
                <Text style={styles.textIcon}>Mức lương: </Text>
                <Text style={styles.textDes}>
                  {recruitments[currentRecruitmentIndex].salary}
                </Text>
              </View>
              <View style={styles.detailJob}>
                <Image
                  style={styles.iconDetail}
                  source={require("../assets/icons/location.png")}
                ></Image>
                <Text style={styles.textIcon}>Địa chỉ: </Text>
                <Text style={styles.textDes}>
                  {recruitments[currentRecruitmentIndex].address}
                </Text>
              </View>
              <View style={styles.detailJob}>
                <Image
                  style={styles.iconDetail}
                  source={require("../assets/icons/calendar.png")}
                ></Image>
                <Text style={styles.textIcon}>Ngày đăng: </Text>
                <Text style={styles.textDes}>
                  {recruitments[currentRecruitmentIndex].created_date}
                </Text>
              </View>
              <View style={styles.detailJob}>
                <Image
                  style={styles.iconDetail}
                  source={require("../assets/icons/calendar.png")}
                ></Image>
                <Text style={styles.textIcon}>Mô tả công việc: </Text>
              </View>
              <Text style={styles.textDes2}>
                {recruitments[currentRecruitmentIndex].description}
              </Text>
              <View style={styles.detailJob}>
                <Image
                  style={styles.iconDetail}
                  source={require("../assets/icons/calendar.png")}
                ></Image>
                <Text style={styles.textIcon}>Yêu cầu: </Text>
              </View>
              <Text style={styles.textDes2}>
                {recruitments[currentRecruitmentIndex].requirement}
              </Text>
              <View style={styles.detailJob}>
                <Image
                  style={styles.iconDetail}
                  source={require("../assets/icons/calendar.png")}
                ></Image>
                <Text style={styles.textIcon}>Liên hệ: </Text>
                <Text style={[styles.textDes, { color: "red" }]}>
                  {recruitments[currentRecruitmentIndex].phone_num}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.confirm}
                disable
                // onPress={() => {
                //   this.onPressPlayPause();
                //   this.props.navigation.navigate("S_CurriculumVitae");
                // }}
              >
                <Text style={styles.TextConfirm}>Ứng tuyển công việc</Text>
              </TouchableOpacity>
            </GestureRecognizer>

            <View style={{ height: 500 }}></View>
          </ScrollView>
        </View>
      )}
    </View>
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
