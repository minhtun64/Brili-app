import { StatusBar } from "expo-status-bar";
import {
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, {
  Component,
  useEffect,
  useState,
  useLayoutEffect,
  useRef,
  useCallback,
} from "react";
import MainNavigator from "./navigation/BriliNav";
// import { Assets } from "@react-navigation/elements";
import AudioSlider from "./screens/ListenToPodcastScreen";
import { LogBox } from "react-native";
export default function App() {
  loadResourcesAsync;
  useEffect(() => {
    LogBox.ignoreAllLogs(true);
  }, []);
  return (
    <MainNavigator>
      <AudioSlider audio={"./assets/sounds/sound2.mp3"} />
    </MainNavigator>
  );
}

async function loadResourcesAsync() {
  await Promise.all([
    Assets.loadAsync([
      require("./assets/images/listen-podcast.png"),
      require("./assets/images/post-podcast.png"),
    ]),
    /*
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-extrabold': require('./assets/fonts/OpenSans-ExtraBold.ttf'),
    }),
    */
  ]);
}

const styles = StyleSheet.create({});
