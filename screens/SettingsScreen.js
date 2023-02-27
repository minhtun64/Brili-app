import {
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import React, { Component } from "react";
import Modal from "react-native-modal";
import { TouchableOpacity } from "react-native-gesture-handler";

// export default function CurriculumVitae({navigation}){
//   function onSwipeRight() {
//     // console.log("SWIPE_RIGHT");
//     navigation.goBack();
//   }
// }

export default class SettingsScreen extends Component {
  render() {
    return (
      <View>
        {/* <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={styles.backIcon}
            source={require("../assets/icons/back.png")}
          ></Image>
        </TouchableOpacity> */}
        <Text style={styles.title}> Cài đặt</Text>
        <View style={styles.line}></View>
        <View style={styles.content}>
          <Text style={styles.title1}> Ngôn ngữ:</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  back: {
    width: 40,
  },
  backIcon: {
    width: 36,
    height: 36,
    marginTop: 40,
  },
  title: {
    marginTop: 40,
    fontSize: 24,
    //fontWeight: "bold",
    fontFamily: "LexendExa_400Regular",
    color: "#000000",
    marginLeft: "auto",
    marginRight: "auto",
  },
  title1: {
    marginTop: 26,
    fontSize: 18,
    fontFamily: "Lexend",
    fontWeight: 400,
    color: "#000000",
    marginLeft: 18,
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
  Content: {
    fontSize: 20,
    backgroundColor: "#D9D9D9",
    borderRadius: 12,
    height: 40,
    marginTop: 10,
    marginLeft: 14,
    marginRight: 14,
    paddingLeft: 14,
  },
});
