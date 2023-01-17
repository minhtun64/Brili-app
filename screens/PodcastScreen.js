import {
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
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

export default function PodcastScreen({ navigation }) {
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

  const [loaded1, setLoaded1] = useState(false);
  const [loaded2, setLoaded2] = useState(false);

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View>
        <Text style={styles.title}>Podcasts</Text>
        <View style={styles.line}></View>
        <View style={styles.content}>
          {loaded1 && loaded2 ? null : (
            <Image
              source={require("../assets/images/loading1.gif")}
              style={styles.loading}
            ></Image>
          )}
          <View>
            <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
              <ImageBackground
                source={require("../assets/images/listen-podcast.png")}
                onLoad={() => setLoaded1(true)}
                style={styles.backgroundImage}
                //  style={loaded ? styles.backgroundImage : { display: "none" }}
              >
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.label}>Nghe Podcast</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate("MyPodcast")}>
              <ImageBackground
                source={require("../assets/images/post-podcast.png")}
                style={styles.backgroundImage}
                onLoad={() => setLoaded2(true)}
                // style={loaded ? styles.backgroundImage : { display: "none" }}
              >
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.label}>Đăng tải Podcast</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginTop: 44,
    fontSize: 24,
    //fontWeight: "bold",
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
    height: "84%",
    //flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    paddingTop: 48,
    paddingBottom: 48,
    //backgroundColor: "black",
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
    fontSize: 28,
    fontFamily: "LexendExa_700Bold",
    color: "#ffffff",
    letterSpacing: -1.5,
  },

  loading: {
    marginTop: "132%",
    width: 60,
    height: 30,
    marginBottom: "280%",
    marginLeft: "auto",
    marginRight: "auto",
  },
});

/*
export default class PodcastScreen extends Component {
  render() {
    return (
      <View>
        <Text style={styles.title}>Podcast</Text>
        <View style={styles.formControl1}>
          <View style={styles.line}></View>
        </View>
      </View>
    );
  }
}
*/
