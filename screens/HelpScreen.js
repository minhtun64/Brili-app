import { TouchableOpacity, Text, StyleSheet, View, Image } from "react-native";
import React from "react";
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

export default function HelpScreen({ navigation }) {
  return (
    <View>
      <Image
        style={styles.logo}
        source={require("../assets/images/logo.png")}
      ></Image>

      <View>
        <TouchableOpacity
          style={styles.btn1}
          onPress={() => navigation.navigate("HelpSearch1")}
        >
          <Image
            style={styles.image}
            source={require("../assets/images/help-call.png")}
          ></Image>
          <Text style={styles.opt1}>Tìm kiếm</Text>
          <Text style={styles.opt1}>sự giúp đỡ từ xa</Text>
          <Text style={styles.opt1}>của Tình nguyện viên</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn2}
          onPress={() => navigation.navigate("HelpSearch2")}
        >
          <Text style={styles.opt2}>Kết nối tới</Text>
          <Text style={styles.opt2}>trung tâm hỗ trợ người khuyết tật</Text>
          <Text style={styles.opt2}>để được giúp đỡ trực tiếp</Text>
        </TouchableOpacity>
      </View>
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
    width: 200,
    height: 150,
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 60,
    marginBottom: 60,
  },
  ask: {
    marginLeft: "auto",
    marginRight: "auto",
    color: "#0D7596",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  btn1: {
    width: 332,
    height: 450,
    backgroundColor: "#195ABB",
    marginTop: 20,
    marginBottom: 8,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 12,
  },
  btn2: {
    width: 332,
    height: 112,
    backgroundColor: "#195ABB",
    marginTop: 28,
    marginBottom: 8,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 12,
    paddingTop: 16,
  },
  opt1: {
    fontSize: 20,
    color: "#ffffff",
    textAlign: "center",
    marginTop: 4,
    fontFamily: "LexendExa_700Bold",
    letterSpacing: -2,
    //width: 230,
  },
  opt2: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
    marginTop: 4,
    fontFamily: "LexendExa_400Regular",
    letterSpacing: -2,
    width: 300,
    marginLeft: "auto",
    marginRight: "auto",
  },
  view: {
    height: "100%",
  },
});
