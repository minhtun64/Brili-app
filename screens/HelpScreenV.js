import { TouchableOpacity, Text, Switch, StyleSheet, View, Image } from "react-native";
import React from "react";
import  {useState} from 'react';
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
  const [isEnabled, setIsEnabled] = useState(false);
  const f = false;
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View>
      <Image
        style={styles.logo}
        source={require("../assets/images/logo.png")}
      ></Image>
     {/* style={[styles.btn1,isEnabled == flase ? styles.Active : null]} */}
      <View>
        <TouchableOpacity
          style={[styles.btn1,isEnabled == !f ? styles.Active : null]}
          onPress={() => navigation.navigate("HelpSearch1")}
        >
          <Image
            style={styles.image}
            source={require("../assets/images/help-call.png")}
          ></Image>
          <Text style={styles.opt1}>Nhận thông báo</Text>
          <Text style={styles.opt1}>để trợ giúp từ xa</Text>
          <View style={styles.btn_swich}>
        <Switch style={{ transform: [{ scaleX: 4 }, { scaleY: 4 }] }}
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
      />
        </View>
        </TouchableOpacity>
        
        {/* <TouchableOpacity
          style={styles.btn2}
          onPress={() => navigation.navigate("HelpSearch2")}
        >
          <Text style={styles.opt2}>Kết nối tới</Text>
          <Text style={styles.opt2}>trung tâm hỗ trợ người khuyết tật</Text>
          <Text style={styles.opt2}>để được giúp đỡ trực tiếp</Text>
        </TouchableOpacity> */}
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
    height: 550,
    backgroundColor: "#A9A9A9",
    marginTop: 20,
    marginBottom: 8,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 12,
  },
  Active:{
     backgroundColor: "#195ABB",
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
  btn_swich:{
     
     alignItems: "center",
     marginTop:80
  }

});
