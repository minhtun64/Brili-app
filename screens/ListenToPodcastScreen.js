import React, { PureComponent, useEffect, useCallback } from "react";
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
import {
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
  PanResponder,
  View,
  Easing,
} from "react-native";
import { Audio } from "expo-av";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import sleep from "../components/sleep";
import DigitalTimeString from "../components/DigitalTimeString";
import { LogBox } from "react-native";

const TRACK_SIZE = 4;
const THUMB_SIZE = 20;

export default class ListenToPodcastScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      currentTime: 0, // miliseconds; value interpolated by animation.
      duration: 0,
      trackLayout: {},
      dotOffset: new Animated.ValueXY(),
      xDotOffsetAtAnimationStart: 0,
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

  onSwipeLeft(gestureState) {
    this.state.dotOffset.setValue({ x: 0, y: 0 });
    this.soundObject.setPositionAsync(0);
    this.props.navigation.navigate("ListenToPodcast2");
    this.pause();
    this.state.dotOffset.removeAllListeners();
  }

  onSwipeRight(gestureState) {
    this.setState({ myText: "You swiped right!" });
  }

  onArrowRight() {
    this.props.navigation.navigate("ListenToPodcast2");
    this.soundObject.unloadAsync();
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
    // Animation-duration is over (reset Animation and Audio):
    // await sleep(200); // In case animation has finished, but audio has not
    // this.setState({ playing: false });
    // await this.soundObject.pauseAsync();

    console.log("Next Screen");
    await sleep(200);
    await this.state.dotOffset.setValue({ x: 0, y: 0 });
    //this.state.dotOffset.setValue(0);
    await this.soundObject.setPositionAsync(0);

    this.props.navigation.navigate("ListenToPodcast2");
    //this.soundObject.unloadAsync();
    this.pause();
    this.state.dotOffset.removeAllListeners();
    //return;
  };

  measureTrack = (event) => {
    this.setState({ trackLayout: event.nativeEvent.layout }); // {x, y, width, height}
  };

  async componentDidMount() {
    this.soundObject = new Audio.Sound();
    await this.soundObject.loadAsync(
      require("../assets/podcasts/podcast-1.mp3")
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
          require("../assets/podcasts/podcast-1.mp3")
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
    // this.state.dotOffset.removeAllListeners();
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
            this.props.navigation.navigate("PodcastTopic");
            this.soundObject.unloadAsync();
            this.state.dotOffset.removeAllListeners();
          }}
        >
          <Image
            style={styles.backIcon}
            source={require("../assets/icons/back.png")}
          ></Image>
        </TouchableOpacity>

        <Text style={styles.title}>Brili - Life</Text>
        <View style={styles.line}></View>

        <GestureRecognizer
          //style={{ height: "30%" }}
          keyboardShouldPersistTaps="handled"
          onSwipeLeft={(state) => this.onSwipeLeft(state)}
          onSwipeRight={(state) => this.onSwipeRight(state)}
          config={config}
        >
          <View style={styles.podcast}>
            <View style={styles.row}>
              <TouchableOpacity
              //onPress={this.}
              >
                <Image
                  style={styles.arrowLeft}
                  source={require("../assets/icons/arrow-left.png")}
                ></Image>
              </TouchableOpacity>
              <Image
                style={styles.podcastImage}
                source={require("../assets/images/podcast-image-1.png")}
              ></Image>
              <TouchableOpacity onPress={() => this.onArrowRight()}>
                <Image
                  style={styles.arrowRight}
                  source={require("../assets/icons/arrow-right.png")}
                ></Image>
              </TouchableOpacity>
            </View>
          </View>
        </GestureRecognizer>
        {/* <View style={styles.line}></View>
          <View style={styles.label}>
            <Text style={styles.allText}>0:01</Text>
            <Text style={styles.sortText}>-24:36</Text>
          </View> */}

        {/* <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#000000"
            maximunTrackTintColor="#000000"
          /> */}

        <Animated.View
          onLayout={this.measureTrack}
          style={{
            //   flex: 8,
            //   flexDirection: "row",
            //   justifyContent: "flex-start",
            alignItems: "center",
            height: TRACK_SIZE,
            borderRadius: TRACK_SIZE / 2,
            backgroundColor: "black",
            width: "70%",
            //height: "-200%",
            marginTop: 300,
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
        <GestureRecognizer
          style={{ height: "100%" }}
          keyboardShouldPersistTaps="handled"
          onSwipeLeft={(state) => this.onSwipeLeft(state)}
          onSwipeRight={(state) => this.onSwipeRight(state)}
          config={config}
        >
          <View
            style={{
              flex: 0,
              flexDirection: "row",
              justifyContent: "space-between",
              width: "75%",
              marginTop: 12,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <DigitalTimeString time={this.state.currentTime} />
            <DigitalTimeString time={this.state.duration} />
          </View>

          <View style={styles.controlSpeed}>
            <TouchableOpacity onPress={this.fastBackward}>
              <Image
                style={styles.backwardIcon}
                source={require("../assets/icons/backward-15-seconds.png")}
              ></Image>
            </TouchableOpacity>

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

            <TouchableOpacity onPress={this.fastForward}>
              <Image
                style={styles.forwardIcon}
                source={require("../assets/icons/forward-15-seconds.png")}
              ></Image>
            </TouchableOpacity>
          </View>

          <Text style={styles.podcastTitle}>#4. Lời xin lỗi muộn màng</Text>
          <Text style={styles.podcastDes}>
            Trên hình trình trưởng thành, chúng ta đã trải qua bao nhiêu lần xin
            lỗi? Có lời xin lỗi nào mà chúng ta mang nặng đến tận bây giờ dành
            cho quá khứ chúng ta từng bỏ quên hay không? Hãy cùng theo dõi lá
            thư ngày hôm nay và chia sẻ câu chuyện của ... Xem thêm{" "}
          </Text>

          <View style={styles.containerAuthor}>
            <Text style={styles.podcastAuthor}>Đặng Minh Tuấn</Text>
            <View style={styles.lineEnd}></View>
          </View>
        </GestureRecognizer>
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
  slider: {
    width: 280,
    height: 1,
    //backgroundColor: "#000000",
    marginLeft: "auto",
    marginRight: "auto",
    //marginTop: 4,
  },
  label: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
    marginTop: 8,
    marginLeft: "auto",
    marginRight: "auto",
  },
  allText: {
    fontSize: 16,
    fontFamily: "LexendExa_500Medium",
  },
  sortText: {
    fontSize: 16,
    fontFamily: "LexendExa_500Medium",
  },
  podcast: {
    padding: 12,
  },
  row: {
    width: "100%",
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  arrowLeft: {
    marginTop: 120,
    marginBottom: "auto",
    padding: 18,
    width: 30,
    height: 30,
  },
  arrowRight: {
    marginTop: 120,
    marginBottom: "auto",
    padding: 18,
    width: 30,
    height: 30,
  },
  podcastImage: {
    width: 256,
    height: 256,
    borderRadius: 8,
    overflow: "hidden",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 24,
    marginBottom: 6,
  },
  podcastTitle: {
    width: 320,
    fontSize: 17,
    fontFamily: "LexendExa_600SemiBold",
    letterSpacing: -2,
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  podcastDes: {
    fontSize: 14,
    marginTop: 8,
    fontFamily: "LexendExa_400Regular",
    letterSpacing: -2,
    textAlign: "center",
    paddingLeft: 16,
    paddingRight: 16,
  },
  containerAuthor: {
    width: 200,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
  },
  podcastAuthor: {
    fontSize: 15,
    color: "#757671",
    fontFamily: "LexendExa_500Medium",
    letterSpacing: -2,
    textAlign: "center",
  },
  lineEnd: {
    width: 200,
    height: 1,
    backgroundColor: "#757671",
    marginTop: 6,
  },
  controlSpeed: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 220,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 32,
  },
  backwardIcon: {
    justifyContent: "center",
    marginTop: "auto",
    marginBottom: "auto",
    padding: 18,
    width: 30,
    height: 30,
  },
  forwardIcon: {
    justifyContent: "center",
    marginTop: "auto",
    marginBottom: "auto",
    padding: 18,
    width: 30,
    height: 30,
  },
  pauseIcon: {
    width: 70,
    height: 70,
  },
});
