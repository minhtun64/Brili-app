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
import { useSwipe } from "../hooks/useSwipe";

const DismissKeyboardHOC = (Comp) => {
  return ({ children, ...props }) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Comp {...props}>{children}</Comp>
    </TouchableWithoutFeedback>
  );
};
const DismissKeyboardView = DismissKeyboardHOC(View);

export default function MyPodcastScreen1({ navigation }) {
  const [search, setSearch] = useState("");

  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6);

  function onSwipeLeft() {
    //navigation.goBack();
  }

  function onSwipeRight() {
    // console.log("SWIPE_RIGHT");
    navigation.navigate("Podcast");
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
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  //   const onLayoutRootView = useCallback(async () => {
  //     if (fontsLoaded) {
  //       await SplashScreen.hideAsync();
  //     }
  //   }, [fontsLoaded]);
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
        <Text style={styles.title}>Podcast của tôi</Text>
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
            value={search}
            onChangeText={(text) => setSearch(text)}
          ></TextInput>
        </View>
        <View style={styles.label}>
          <Text style={styles.allText}>Tất cả các tập</Text>
          <TouchableOpacity style={styles.sort}>
            <Text style={styles.sortText}>Sắp xếp</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{ height: "100%" }}
          keyboardShouldPersistTaps="handled"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <View style={styles.podcast}>
            <TouchableOpacity>
              <View style={styles.row}>
                <Image
                  style={styles.podcastImage}
                  source={require("../assets/images/podcast-image.png")}
                ></Image>
                <Text style={styles.podcastTitle}>
                  #1. Làm thế nào để vượt qua cảm giác trống rỗng
                </Text>
              </View>
              <Text style={styles.podcastDes}>
                Chặng đời nào trên hành trình trưởng thành, ta cũng từng gặp
                phải trạng thái trống rỗng. Trống rỗng vì lạc lối, trống rỗng vì
                đánh mất bản thể của bản thân, trống rỗng vì không biết điểm
                mạnh và tài năng của mình là...{" "}
              </Text>
            </TouchableOpacity>
            <View style={styles.row}>
              <View style={styles.row2}>
                <Text style={styles.podcastInfo}> 20 thg 1</Text>
                <Text style={styles.point}> . </Text>
                <Text style={styles.podcastInfo}> 24 phút </Text>
                <Text style={styles.point}> . </Text>
                <Text style={styles.podcastInfo}> 0 lượt nghe </Text>
                <View style={styles.status}>
                  <Image
                    style={styles.statusImage}
                    source={require("../assets/icons/status-1.png")}
                  ></Image>
                  <Text style={styles.statusText}>Đang chờ xử lý</Text>
                </View>
              </View>
              <View>
                <TouchableOpacity style={styles.share}>
                  <Image
                    style={styles.shareImage}
                    source={require("../assets/icons/share.png")}
                  ></Image>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate("UploadPodcast")}
          style={styles.add}
        >
          <Image
            style={styles.addImage}
            source={require("../assets/icons/adding-podcast.png")}
          ></Image>
        </TouchableOpacity>
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
    marginBottom: 12,
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
  podcast: {
    padding: 12,
  },
  row: {
    // marginLeft: 16,
    // marginRight: 16,
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row2: {
    // marginLeft: 16,
    // marginRight: 16,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  podcastImage: {
    width: 60,
    height: 60,
  },
  podcastTitle: {
    width: 320,
    fontSize: 17,
    fontFamily: "LexendExa_600SemiBold",
    letterSpacing: -2,
  },
  podcastDes: {
    fontSize: 14,
    marginTop: 8,
    marginBottom: 8,
    fontFamily: "LexendExa_300Light",
    letterSpacing: -2,
  },
  status: {
    //marginLeft: 8,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: "#FB9D11",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 12,
  },
  statusImage: {
    height: 16,
    width: 16,
  },
  statusText: {
    color: "#ffffff",
    marginLeft: 4,
  },
  podcastInfo: {
    fontWeight: "600",
  },
  shareImage: {
    // marginLeft: 12,
    // marginRight: 8,
    height: 20,
    width: 15,
    marginTop: -2,
  },
  point: {
    fontWeight: "700",
    marginTop: -4,
  },
  content: {},
});
