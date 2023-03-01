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
        <Text style={styles.title}>Tuyển dụng</Text>
        <View style={styles.line}></View>
        <View style={styles.content}>
          <Image
            style={styles.image}
            source={require("../assets/images/Rectangle843.png")}
          ></Image>
          <View style={styles.btn_confirm}>
            <Text style={styles.des_confirm}>"Hãy xác thực doanh nghiệp</Text>
            <Text style={styles.des_confirm}>nếu bạn muốn tuyển dụng"</Text>
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("Confirm_Volunteer")}
          >
            <Text style={styles.des}>Xác thực</Text>
          </TouchableOpacity>
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
    justifyContent: "center",

    paddingTop: 48,
    paddingBottom: 48,
    alignItems: "center",
  },
  backgroundImage: {
    width: 350,
    height: 150,
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
  image: {
    width: 380,
    height: 380,
    // marginTop:-40
  },
  btn_confirm: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  des_confirm: {
    fontSize: 21,
    fontFamily: "LexendExa_400Regular",
    color: "#0D7596",
  },
  des: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  btn: {
    marginTop: 50,
    backgroundColor: "#195ABB",
    width: "50%",
    height: 60,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
});
