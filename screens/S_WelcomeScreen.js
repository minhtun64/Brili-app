import {
  TouchableOpacity,
  Button,
  Text,
  StyleSheet,
  View,
  Image,
} from "react-native";
import React, { Component } from "react";
import { Audio } from "expo-av";
import { ScrollView } from "react-native-gesture-handler";
import { useSwipe } from "../hooks/useSwipe";

export default function S_WelcomeScreen({ navigation }) {
  const [sound, setSound] = React.useState();
  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6);
  const [backCount, setBackCount] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);

  function onSwipeLeft() {
    //navigation.goBack();
  }

  function onSwipeRight() {
    // console.log("SWIPE_RIGHT");
    navigation.goBack();
  }

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/sound2.mp3")
    );
    setSound(sound);
    setPlaying(true);
    console.log("Playing Sound");
    await sound.playAsync();
    setTimeout(() => {
      setPlaying(false);
    }, 7000);
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <ScrollView onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <TouchableOpacity
        onLongPress={() => {
          sound.unloadAsync();
          setTimeout(() => {
            setBackCount(0);
          }, 500);
          navigation.navigate("SignIn");
        }}
        onPress={() => {
          setBackCount(backCount + 1);
          if (backCount == 1) {
            sound.unloadAsync();
            navigation.navigate("SignIn");
          } else {
            setTimeout(() => {
              setBackCount(0);
            }, 500);
            playSound();
          }
        }}
      >
        <Image
          style={styles.logo}
          source={require("../assets/images/logo.png")}
        ></Image>
        <Image
          style={styles.image}
          source={require("../assets/images/welcome.png")}
          onLoad={playSound}
        ></Image>
        <Text style={styles.ask}>Bạn là ... ?</Text>

        <View>
          <View
            style={styles.btn}
            onPress={() => navigation.navigate("SignIn")}
            //onPress={playSound}
          >
            <Text style={styles.opt}>Người gặp khó khăn về thị lực</Text>
          </View>
          <View
            style={styles.btn}
            onPress={() => navigation.navigate("SignIn")}
          >
            <Text style={styles.opt}>Nhà tuyển dụng hoặc Tình nguyện viên</Text>
          </View>
        </View>
        {playing ? (
          <Image
            style={styles.icon}
            source={require("../assets/images/voice.gif")}
          ></Image>
        ) : (
          <Image
            style={styles.icon}
            source={require("../assets/images/voice-stop.png")}
          ></Image>
        )}
      </TouchableOpacity>
    </ScrollView>
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
    justifyContent: "center",
    marginTop: 8,
    marginLeft: 40, 
    marginRight: 40,
  },
  view: {
    height: "100%",
  },
  icon: {
    height: 60,
    width: 60,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "100%",
    marginTop: 32,
  },
});
