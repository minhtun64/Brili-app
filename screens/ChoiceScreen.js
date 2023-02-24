import {
  TouchableOpacity,
  Button,
  Text,
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { Audio } from "expo-av";

export default function ChoiceScreen({ navigation }) {
  const [sound, setSound] = React.useState();
  const [playing, setPlaying] = useState(false);
  const [backCount, setBackCount] = React.useState(0);
  //const [status, setStatus] = useState(true);

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/sound1.mp3")
    );
    setSound(sound);
    //if (status) {
    setPlaying(true);
    console.log("Playing Sound");
    await sound.playAsync();
    setTimeout(() => {
      setPlaying(false);
    }, 12000);
    // } else {
    //   console.log("Chuyển");
    //   await sound.unloadAsync();
    // }
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
    <TouchableOpacity
      onLongPress={() => {
        sound.unloadAsync();
        setTimeout(() => {
          setBackCount(0);
        }, 500);
        navigation.navigate("S_Welcome");
      }}
      onPress={() => {
        setBackCount(backCount + 1);
        if (backCount == 1) {
          sound.unloadAsync();
          navigation.navigate("Welcome");
        } 
        else {
          setTimeout(() => {
            setBackCount(0);
          }, 500);
          console.log(backCount);
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
        source={require("../assets/images/choice.png")}
        onLoad={playSound}
      ></Image>
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
  );
}

{
  /* <DoubleClick
        singleTap={playSound}
        doubleTap={() => {
          sound.unloadAsync();
          navigation.navigate("Welcome");
        }}
        delay={200}
        style={styles.view}
      > */
}
{
  /* </DoubleClick> */
}
const styles = StyleSheet.create({
  logo: {
    width: 48,
    height: 48,
    marginTop: 60,
    marginLeft: 20,
  },
  image: {
    width: 350,
    height: 300,
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 80,
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
  icon: {
    height: 60,
    width: 60,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "100%",
  },
});
