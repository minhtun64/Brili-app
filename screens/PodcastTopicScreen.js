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

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const [loaded1, setLoaded1] = useState(false);
  const [loaded2, setLoaded2] = useState(false);
  const [loaded3, setLoaded3] = useState(false);

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View>
        <Text style={styles.title}>Chủ đề</Text>
        <View style={styles.line}></View>
        <View style={styles.content}>
          {loaded1 && loaded2 && loaded3 ? null : (
            <Image
              source={require("../assets/images/loading1.gif")}
              style={styles.loading}
            ></Image>
          )}

          {/* button navigate to  Brili-Live podcasts */}
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("ListenToPodcast")}
            >
              <ImageBackground
                source={require("../assets/images/brili-life.png")}
                onLoad={() => setLoaded1(true)}
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
            </TouchableOpacity>
          </View>

          {/* button navigate to  Brili-Love podcasts */}
          <View>
            <TouchableOpacity>
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
            </TouchableOpacity>
          </View>

          {/* button navigate to  Brili-Study podcasts */}
          <View>
            <TouchableOpacity>
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
