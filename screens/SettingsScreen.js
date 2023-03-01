import {
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import React, { Component } from "react";
import Modal from "react-native-modal";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

// export default function CurriculumVitae({navigation}){
//   function onSwipeRight() {
//     // console.log("SWIPE_RIGHT");
//     navigation.goBack();
//   }
// }

export default class SettingsScreen extends Component {
  render() {
    return (
      <ScrollView>
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

          <View style={styles.form}>
            <View style={styles.row}>
              <Text style={styles.prop}> Ngôn ngữ chính:</Text>
              <Text style={styles.prop1}> Tiếng Việt</Text>
              <Image
                style={styles.arrowRightIcon}
                source={require("../assets/icons/arrow-right.png")}
              ></Image>
            </View>
            <View style={styles.line}></View>
            <View style={styles.row}>
              <Text style={styles.prop2}> Ngôn ngữ khác</Text>
              <Image
                style={styles.arrowRightIcon}
                source={require("../assets/icons/arrow-right.png")}
              ></Image>
            </View>
          </View>

          <View style={styles.form}>
            <View></View>
            <View style={styles.row}>
              {/* <Image
                  style={styles.logo}
                  source={require("../assets/icons/notification.png")}
                ></Image> */}
              <Text style={styles.prop}>Thông báo</Text>
              <Image
                style={styles.arrowRightIcon}
                source={require("../assets/icons/arrow-right.png")}
              ></Image>
            </View>
          </View>

          <View style={styles.form}>
            <View style={styles.row}>
              <Text style={styles.prop}> Gửi cho chúng tôi phản hồi </Text>
              <Image
                style={styles.arrowRightIcon}
                source={require("../assets/icons/arrow-right.png")}
              ></Image>
            </View>
            <View style={styles.line}></View>
            <View style={styles.row}>
              <Text style={styles.prop2}> Điều khoản&chính sách bảo mật </Text>
              <Image
                style={styles.arrowRightIcon}
                source={require("../assets/icons/arrow-right.png")}
              ></Image>
            </View>
          </View>

          <View style={styles.form}>
            <View style={styles.row}>
              <Text style={styles.prop}> Chia sẻ Brili </Text>
              <Image
                style={styles.arrowRightIcon}
                source={require("../assets/icons/arrow-right.png")}
              ></Image>
            </View>
            <View style={styles.line}></View>
            <View style={styles.row}>
              <Text style={styles.prop2}> Đánh giá Brili</Text>
              <Image
                style={styles.arrowRightIcon}
                source={require("../assets/icons/arrow-right.png")}
              ></Image>
            </View>
          </View>

          <View style={styles.form}>
            <View style={styles.row}>
              <Text style={styles.prop}> Phiên bản</Text>
              <Text style={styles.prop1}> 1.0.23</Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
    // marginTop: 40,
  },
  arrowRightIcon: {
    marginTop: 0,
    width: 26,
    height: 26,
  },

  title: {
    marginTop: 46,
    fontSize: 24,
    //fontWeight: "bold",
    fontFamily: "LexendExa_400Regular",
    color: "#000000",
    marginLeft: "auto",
    marginRight: "auto",
  },
  prop: {
    marginTop: 0,
    fontSize: 18,
  },
  prop1: {
    fontSize: 18,
    color: "#777D84",
  },
  prop2: {
    marginTop: 10,
    fontSize: 18,
  },
  form: {
    padding: 16,
    backgroundColor: "#D8D8D8",
    margin: 26,
    marginTop: 20,
    borderRadius: 12,
  },
  row: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "black",
  },
  line: {
    width: 290,
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
  logo: {
    width: 60,
    height: 60,
    marginTop: 12,
    marginLeft: 6,
  },
  selectIcon: {
    width: 40,
    height: 40,
    marginTop: 48,
  },
  // smallBackGround: {
  //   backgroundColor: "#D9D9D9",
  //   borderRadius: 12,
  //   marginLeft: 14,
  //   marginRight: 14,
  // },
});
