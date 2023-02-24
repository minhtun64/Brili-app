import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSwipe } from "../hooks/useSwipe";
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
import Slider from "@react-native-community/slider";

export default function ListenPodcastScreen({ navigation }) {
  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6);

  function onSwipeLeft() {
    //navigation.goBack();
  }

  function onSwipeRight() {
    // console.log("SWIPE_RIGHT");
    //navigation.navigate("Podcast");
  }

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

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={styles.backIcon}
            source={require("../assets/icons/back.png")}
          ></Image>
        </TouchableOpacity>
        <Text style={styles.title}>Brili - Life</Text>
        <View style={styles.line}></View>

        <ScrollView
          style={{ height: "100%" }}
          keyboardShouldPersistTaps="handled"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <View style={styles.podcast}>
            <View style={styles.row}>
              <TouchableOpacity>
                <Image
                  style={styles.arrowLeft}
                  source={require("../assets/icons/arrow-left.png")}
                ></Image>
              </TouchableOpacity>
              <Image
                style={styles.podcastImage}
                source={require("../assets/images/podcast-image-1.png")}
              ></Image>
              <TouchableOpacity>
                <Image
                  style={styles.arrowRight}
                  source={require("../assets/icons/arrow-right.png")}
                ></Image>
              </TouchableOpacity>
            </View>
          </View>

          {/* <View style={styles.line}></View>
          <View style={styles.label}>
            <Text style={styles.allText}>0:01</Text>
            <Text style={styles.sortText}>-24:36</Text>
          </View> */}

          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#000000"
            maximunTrackTintColor="#000000"
          />

          <View style={styles.controlSpeed}>
            <TouchableOpacity>
              <Image
                style={styles.backwardIcon}
                source={require("../assets/icons/backward-15-seconds.png")}
              ></Image>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={styles.pauseIcon}
                source={require("../assets/icons/pause-podcast.png")}
              ></Image>
            </TouchableOpacity>
            <TouchableOpacity>
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
    marginTop: "auto",
    marginBottom: "auto",
    padding: 18,
    width: 30,
    height: 30,
  },
  arrowRight: {
    marginTop: "auto",
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
