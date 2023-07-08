import { database } from "../firebase";
import { onValue, ref, get } from "firebase/database";
import React, { useState, useEffect, useCallback } from "react";
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
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import { Audio } from "expo-av";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import sleep from "../components/sleep";
import DigitalTimeString from "../components/DigitalTimeString";
import { LogBox } from "react-native";
import { StackActions } from "@react-navigation/native";
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

export default function ListenToPodcastScreen({ navigation }) {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [trackLayout, setTrackLayout] = useState({});
  const [dotOffset] = useState(new Animated.ValueXY());
  const [podcasts, setPodcasts] = useState([]);
  const [currentPodcastIndex, setCurrentPodcastIndex] = useState(0);
  const [title, setTitle] = useState("");
  const [backCount, setBackCount] = useState(0);

  const soundObject = new Audio.Sound();

  const route = useRoute();
  const topic = route?.params?.topic;

  const loadPodcasts = useCallback(async () => {
    const podcastRef = ref(database, "podcast");
    const snapshot = await get(podcastRef);
    if (snapshot.exists()) {
      const podcastList = [];
      snapshot.forEach((childSnapshot) => {
        const podcast = childSnapshot.val();
        if (podcast.topic === topic) {
          podcastList.push(podcast);
        }
      });
      setPodcasts(podcastList);
    }
  }, []);

  const loadPodcastAudio = useCallback(async (podcast) => {
    console.log("Hủy tải audio");
    await soundObject.unloadAsync();

    console.log("Tải audio");
    await soundObject.loadAsync({ uri: podcast.audio });
    // const status = await soundObject.getStatusAsync();
    // setDuration(status.durationMillis);
    // setCurrentTime(0);
    // setPlaying(true);
    // setPlaying(false);

    await onPressPlayPause();
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

  const handlePreviousPodcast = () => {
    if (currentPodcastIndex > 0) {
      setCurrentPodcastIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNextPodcast = () => {
    if (currentPodcastIndex < podcasts.length - 1) {
      setCurrentPodcastIndex((prevIndex) => prevIndex + 1);
    }
  };

  useEffect(() => {
    console.log("Tải - Effect");
    loadPodcasts();
    return () => {
      console.log("Hủy tải - Effect");
      soundObject.unloadAsync();
    };
  }, [loadPodcasts]);

  useEffect(() => {
    if (podcasts.length > 0) {
      loadPodcastAudio(podcasts[currentPodcastIndex]);
    }
  }, [podcasts, currentPodcastIndex, loadPodcastAudio]);

  return (
    <View>
      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.navigate("PodcastTopic")}
      >
        <Image
          style={styles.backIcon}
          source={require("../assets/icons/back.png")}
        ></Image>
      </TouchableOpacity>

      <Text style={styles.title}>{topic}</Text>
      <View style={styles.line}></View>
      {podcasts.length > 0 && (
        <View>
          <View style={styles.podcast}>
            <View style={styles.row}>
              <TouchableOpacity onPress={handlePreviousPodcast}>
                <Image
                  style={styles.arrowLeft}
                  source={require("../assets/icons/arrow-left.png")}
                ></Image>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNextPodcast}>
                <Image
                  style={styles.arrowRight}
                  source={require("../assets/icons/arrow-right.png")}
                ></Image>
              </TouchableOpacity>
            </View>
          </View>

          <GestureRecognizer
            keyboardShouldPersistTaps="handled"
            onSwipeLeft={handleNextPodcast}
            onSwipeRight={handlePreviousPodcast}
            onSwipeUp={() => {
              console.log("Vuốt lên");
              navigation.navigate("PodcastTopic");
            }}
            config={config}
            style={styles.podcastImage}
          >
            {/* {this.state.loaded1 ? null : (
            <Image
              style={styles.image}
              source={require("../assets/images/podcast-image-1-loading.png")}
            ></Image>
          )} */}

            <Image
              style={styles.image}
              source={{ uri: podcasts[currentPodcastIndex].image }}
              // onLoad={() => this.loadedImage()}
            ></Image>
          </GestureRecognizer>

          <GestureRecognizer
            style={{ height: "100%" }}
            keyboardShouldPersistTaps="handled"
            onSwipeLeft={handleNextPodcast}
            onSwipeRight={handlePreviousPodcast}
            onSwipeUp={() => {
              console.log("Vuốt lên");
              navigation.navigate("PodcastTopic");
            }}
            // onSwipeDown={onPressPlayPause}
            config={config}
          >
            <Text style={styles.podcastTitle}>
              {podcasts[currentPodcastIndex].title}
            </Text>
            <Text style={styles.podcastDes}>
              {podcasts[currentPodcastIndex].description}
            </Text>

            <View style={styles.containerAuthor}>
              <Text style={styles.podcastAuthor}>
                {podcasts[currentPodcastIndex].author}
              </Text>
              <View style={styles.lineEnd}></View>
            </View>
          </GestureRecognizer>
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
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  //   arrowLeft: {
  //     marginTop: 120,
  //     marginBottom: "auto",
  //     padding: 18,
  //     width: 30,
  //     height: 30,
  //   },
  //   arrowRight: {
  //     marginTop: 120,
  //     marginBottom: "auto",
  //     padding: 18,
  //     width: 30,
  //     height: 30,
  //   },
  //   podcastImage: {
  //     width: 256,
  //     height: 256,
  //     borderRadius: 8,
  //     overflow: "hidden",
  //     marginLeft: "auto",
  //     marginRight: "auto",
  //     marginTop: 24,
  //     marginBottom: 6,
  //   },

  arrowLeft: {
    marginTop: 132,
    marginBottom: "auto",
    padding: 18,
    width: 30,
    height: 30,
  },
  arrowRight: {
    marginTop: 132,
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
    marginTop: 18,
    marginBottom: 6,
  },

  image: {
    width: 256,
    height: 256,
  },

  podcastTitle: {
    width: 320,
    fontSize: 17,
    fontFamily: "LexendExa_600SemiBold",
    letterSpacing: -2,
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 100,
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
