import {
  TouchableOpacity,
  Button,
  Text,
  StyleSheet,
  View,
  Image,
} from "react-native";
import React, { Component } from "react";
import Sound from "react-native-sound";

const audioList = [
  {
    title: "Chao mung",
    isRequire: true,
    url: require("../assets/sounds/sound1.mp3"),
  },
];
var sound1, sound2;
function playSound(item, index) {
  if (index == 0) {
    sound1 = new Sound(item.url, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        alert("error" + error + message);
        return;
      }
      sound1.play(() => {
        sound1.release();
      });
    });
  } else if (index == 1) {
    sound2 = new Sound(item.url, (error, sound) => {
      if (error) {
        alert("error" + error + message);
        return;
      }
      sound2.play(() => {
        sound2.release();
      });
    });
  }
}

export default class WelcomeScreen extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <View>
        <Image
          style={styles.logo}
          source={require("../assets/images/logo.png")}
        ></Image>
        <Image
          style={styles.image}
          source={require("../assets/images/welcome.png")}
        ></Image>
        <Text style={styles.ask}>Bạn là ... ?</Text>

        <View>
          {audioList.map((item, index) => {
            return (
              <View key={item.title}>
                <TouchableOpacity
                  style={styles.btn}
                  // onPress={() => navigation.navigate("SignIn")}
                  onPress={() => {
                    return playSound(item, index);
                  }}
                >
                  <Text style={styles.opt}>Người gặp khó khăn về thị lực</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => navigation.navigate("SignIn")}
                >
                  <Text style={styles.opt}>Tình nguyện viên</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 48,
    height: 48,
    marginTop: 60,
    marginLeft: 20,
  },
  image: {
    width: 347,
    height: 247,
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 60,
    marginBottom: 32,
  },
  ask: {
    marginLeft: "auto",
    marginRight: "auto",
    color: "#0D7596",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  btn: {
    width: 332,
    height: 80,
    backgroundColor: "#195ABB",
    marginTop: 20,
    marginBottom: 8,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 8,
  },
  opt: {
    fontSize: 24,
    color: "#ffffff",
    textAlign: "center",
    marginTop: 20,
  },
});
