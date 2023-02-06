import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  StatusBar,
} from "react-native";
import React from "react";
import type { StatusBarStyle } from "react-native";
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

export default function HelpSearch2Screen({ navigation }) {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <View>
      <StatusBar barStyle="light-content" />
      {loaded ? null : (
        <Image
          source={require("../assets/images/loading1.gif")}
          style={styles.loading}
        ></Image>
      )}
      <ImageBackground
        source={require("../assets/images/calling-background.png")}
        onLoad={() => setLoaded(true)}
        style={styles.image}
      >
        <View>
          <Image
            style={styles.icon1}
            source={require("../assets/icons/search-center-white.png")}
          ></Image>
          <View style={styles.formControl}>
            <Text style={styles.label}>Đang kết nối</Text>
            <Image
              style={styles.gif}
              source={require("../assets/images/loading-dots-white.gif")}
            ></Image>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Help");
            }}
          >
            <Image
              style={styles.icon2}
              source={require("../assets/icons/cancel.png")}
            ></Image>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 48,
    height: 48,
    marginTop: 60,
    marginLeft: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  icon1: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 100,
    height: 100,
    marginTop: 200,
  },
  icon2: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 50,
    height: 50,
    marginTop: 400,
  },
  label: {
    marginLeft: "auto",
    marginRight: "auto",
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  gif: {
    width: 40,
    height: 30,
    marginTop: 22,
  },
  formControl: {
    //flex: 1,
    flexDirection: "row",
    justifyContent: "center",

    paddingLeft: 120,
    paddingRight: 120,
    //alignItems: "center",
  },
  view: {
    height: "100%",
  },
  loading: {
    marginTop: "100%",
    width: 60,
    height: 30,
    marginBottom: "280%",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
