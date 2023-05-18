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
import React, { PureComponent, Component } from "react";
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

export default class MarketingConsulting extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      currentTime: 0, // miliseconds; value interpolated by animation.
      duration: 0,
      trackLayout: {},
      dotOffset: new Animated.ValueXY(),
      xDotOffsetAtAnimationStart: 0,
      loaded1: false,
    };

    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: async (e, gestureState) => {
        if (this.state.playing) {
          await this.pause();
        }
        await this.setState({
          xDotOffsetAtAnimationStart: this.state.dotOffset.x._value,
        });
        await this.state.dotOffset.setOffset({
          x: this.state.dotOffset.x._value,
        });
        await this.state.dotOffset.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (e, gestureState) => {
        Animated.event(
          [null, { dx: this.state.dotOffset.x, dy: this.state.dotOffset.y }],
          { useNativeDriver: 0 }
        )(e, gestureState);
      },
      onPanResponderTerminationRequest: () => false,
      onPanResponderTerminate: async (evt, gestureState) => {
        // Another component has become the responder, so this gesture is cancelled.

        const currentOffsetX =
          this.state.xDotOffsetAtAnimationStart + this.state.dotOffset.x._value;
        if (
          currentOffsetX < 0 ||
          currentOffsetX > this.state.trackLayout.width
        ) {
          await this.state.dotOffset.setValue({
            x: -this.state.xDotOffsetAtAnimationStart,
            y: 0,
          });
        }
        await this.state.dotOffset.flattenOffset();
        await this.mapAudioToCurrentTime();
      },
      onPanResponderRelease: async (e, { vx }) => {
        const currentOffsetX =
          this.state.xDotOffsetAtAnimationStart + this.state.dotOffset.x._value;
        if (
          currentOffsetX < 0 ||
          currentOffsetX > this.state.trackLayout.width
        ) {
          await this.state.dotOffset.setValue({
            x: -this.state.xDotOffsetAtAnimationStart,
            y: 0,
          });
        }
        await this.state.dotOffset.flattenOffset();
        await this.mapAudioToCurrentTime();

        await this.onPressPlayPause();
      },
    });
  }

  loadedImage = async () => {
    this.setState({ loaded1: true });
  };

  onSwipeLeft(gestureState) {
    this.state.dotOffset.setValue({ x: 0, y: 0 });
    this.soundObject.setPositionAsync(0);
    this.props.navigation.navigate("MarketingConsulting2");
    this.pause();
    this.state.dotOffset.removeAllListeners();
  }

  onSwipeRight(gestureState) {
    this.soundObject.unloadAsync();
    this.state.dotOffset.removeAllListeners();
    this.props.navigation.navigate("S_Recruitment");
  }

  onArrowRight() {
    console.log("Next Screen - Using ArrowRight");
    this.state.dotOffset.setValue({ x: 0, y: 0 });
    this.soundObject.setPositionAsync(0);
    this.props.navigation.navigate("MarketingConsulting2");
    this.pause();
    this.state.dotOffset.removeAllListeners();
  }

  mapAudioToCurrentTime = async () => {
    await this.soundObject.setPositionAsync(this.state.currentTime);
  };

  onPressPlayPause = async () => {
    if (this.state.playing) {
      await this.pause();
      return;
    }
    await this.play();
  };

  play = async () => {
    await this.soundObject.playAsync();
    this.setState({ playing: true }); // This is for the play-button to go to play
    this.startMovingDot();
  };

  pause = async () => {
    await this.soundObject.pauseAsync();
    this.setState({ playing: false }); // This is for the play-button to go to pause
    Animated.timing(this.state.dotOffset).stop(); // Will also call animationPausedOrStopped()
  };

  startMovingDot = async () => {
    const status = await this.soundObject.getStatusAsync();
    const durationLeft = status["durationMillis"] - status["positionMillis"];
    Animated.timing(this.state.dotOffset, {
      toValue: { x: this.state.trackLayout.width, y: 0 },
      duration: durationLeft,
      easing: Easing.linear,
      useNativeDriver: 1,
    }).start(() => {
      this.animationPausedOrStopped();
    });
  };

  animationPausedOrStopped = async () => {
    if (!this.state.playing) {
      return;
    }
    console.log("Next Screen");
    await sleep(200);
    await this.state.dotOffset.setValue({ x: 0, y: 0 });
    await this.soundObject.setPositionAsync(0);

    this.props.navigation.navigate("MarketingConsulting2");
    this.pause();
    this.state.dotOffset.removeAllListeners();
  };

  measureTrack = (event) => {
    this.setState({ trackLayout: event.nativeEvent.layout }); // {x, y, width, height}
  };

  async componentDidMount() {
    this.soundObject = new Audio.Sound();
    await this.soundObject.loadAsync(
      require("../assets/recruitments/recruitment-1.mp3")
    );

    const status = await this.soundObject.getStatusAsync();
    this.setState({ duration: status["durationMillis"] });

    await this.onPressPlayPause();

    // This requires measureTrack to have been called.
    this.state.dotOffset.addListener(() => {
      let animatedCurrentTime = this.state.dotOffset.x
        .interpolate({
          inputRange: [0, this.state.trackLayout.width],
          outputRange: [0, this.state.duration],
          extrapolate: "clamp",
        })
        .__getValue();
      this.setState({ currentTime: animatedCurrentTime });
    });

    this.focusSubscription = this.props.navigation.addListener(
      "focus",
      async () => {
        this.soundObject = new Audio.Sound();
        await this.soundObject.loadAsync(
          require("../assets/recruitments/recruitment-1.mp3")
        );
        const status = await this.soundObject.getStatusAsync();
        this.setState({ duration: status["durationMillis"] });

        console.log("Refresh");
        await this.onPressPlayPause();

        // This requires measureTrack to have been called.
        this.state.dotOffset.addListener(() => {
          let animatedCurrentTime = this.state.dotOffset.x
            .interpolate({
              inputRange: [0, this.state.trackLayout.width],
              outputRange: [0, this.state.duration],
              extrapolate: "clamp",
            })
            .__getValue();
          this.setState({ currentTime: animatedCurrentTime });
        });
      }
    );
  }

  async componentWillUnmount() {
    await this.soundObject.playAsync();
    this.focusSubscription();
  }

  fastForward = async () => {
    const status = await this.soundObject.getStatusAsync();
    this.setState({ playing: false });
    this.state.dotOffset.setValue({
      x:
        (this.state.trackLayout.width / status["durationMillis"]) *
        (status["positionMillis"] + 15000),
      y: 0,
    });
    await this.soundObject.setPositionAsync(status["positionMillis"] + 15000);
    this.onPressPlayPause();
  };

  fastBackward = async () => {
    const status = await this.soundObject.getStatusAsync();
    this.setState({ playing: false });

    if (status["positionMillis"] >= 15000) {
      this.state.dotOffset.setValue({
        x:
          (this.state.trackLayout.width / status["durationMillis"]) *
          (status["positionMillis"] - 15000),
        y: 0,
      });
    } else {
      this.state.dotOffset.setValue({
        x: 0,
        y: 0,
      });
    }

    await this.soundObject.setPositionAsync(status["positionMillis"] - 15000);
    this.onPressPlayPause();
  };

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };

    return (
      <View>
        <TouchableOpacity
          style={styles.back}
          onPress={() => {
            this.props.navigation.navigate("Recruitment");
            this.soundObject.unloadAsync();
            this.state.dotOffset.removeAllListeners();
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
          onSwipeLeft={(state) => this.onSwipeLeft(state)}
          onSwipeRight={(state) => this.onSwipeRight(state)}
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
            <TouchableOpacity onPress={() => this.onArrowRight()}>
              <Image
                style={styles.arrowRight}
                source={require("../assets/icons/arrow-right.png")}
              ></Image>
            </TouchableOpacity>
          </View>
        </View>

        <GestureRecognizer
          keyboardShouldPersistTaps="handled"
          onSwipeLeft={(state) => this.onSwipeLeft(state)}
          onSwipeRight={(state) => this.onSwipeRight(state)}
          config={config}
          style={styles.jobImage}
        >
          {this.state.loaded1 ? null : (
            <Image
              style={styles.image}
              source={require("../assets/images//job1-loading.png")}
            ></Image>
          )}
          <Image
            style={styles.image}
            source={require("../assets/images/job1.png")}
            onLoad={() => this.loadedImage()}
          ></Image>
        </GestureRecognizer>
        <View style={styles.row1}>
          <TouchableOpacity onPress={this.onPressPlayPause}>
            {this.state.playing ? (
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
            onLayout={this.measureTrack}
            style={{
              alignItems: "center",
              height: TRACK_SIZE,
              borderRadius: TRACK_SIZE / 2,
              backgroundColor: "black",
              width: "60%",
              //height: "-200%",
              marginTop: 24,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Animated.View
              style={{
                // display: "flex",
                // flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                left: -((THUMB_SIZE * 4) / 2),
                width: THUMB_SIZE * 4,
                height: THUMB_SIZE * 4,
                transform: [
                  {
                    translateX: this.state.dotOffset.x.interpolate({
                      inputRange: [
                        0,
                        this.state.trackLayout.width != undefined
                          ? this.state.trackLayout.width
                          : 1,
                      ],
                      outputRange: [
                        0,
                        this.state.trackLayout.width != undefined
                          ? this.state.trackLayout.width
                          : 1,
                      ],
                      extrapolate: "clamp",
                    }),
                  },
                ],
              }}
              {...this._panResponder.panHandlers}
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
            <DigitalTimeString
              time={this.state.duration - this.state.currentTime}
            />
          </View>
        </View>
        <View style={styles.line1}></View>
        <ScrollView>
          <GestureRecognizer
            style={{ height: "100%" }}
            keyboardShouldPersistTaps="handled"
            onSwipeLeft={(state) => this.onSwipeLeft(state)}
            onSwipeRight={(state) => this.onSwipeRight(state)}
            config={config}
          >
            <View style={styles.detailJob}>
              <Image
                style={styles.iconDetail}
                source={require("../assets/icons/user-square.png")}
              ></Image>
              <Text style={styles.textIcon}>Số lượng: </Text>
              <Text style={styles.textDes}>
                3 nhân viên nữ, 1 nhân viên nam
              </Text>
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
              văn minh, nói không với tệ nạn xã hội. Đối tượng khách hàng là
              khách du lịch quốc tế và Việt Nam có mức thu nhập khá.
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
              onPress={() => this.props.navigation.navigate("CurriculumVitae")}
            >
              <Text style={styles.TextConfirm}>Ứng tuyển công việc</Text>
            </TouchableOpacity>
          </GestureRecognizer>

          <View style={{ height: 500 }}></View>
        </ScrollView>
      </View>
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
