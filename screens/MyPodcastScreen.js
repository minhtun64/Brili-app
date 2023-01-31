import {
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
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

const DismissKeyboardHOC = (Comp) => {
  return ({ children, ...props }) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Comp {...props}>{children}</Comp>
    </TouchableWithoutFeedback>
  );
};
const DismissKeyboardView = DismissKeyboardHOC(View);

export default function MyPodcastScreen({ navigation }) {
  const [search, setSearch] = useState("");

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
  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={styles.backIcon}
            source={require("../assets/icons/back.png")}
          ></Image>
        </TouchableOpacity>
        <Text style={styles.title}>Podcast của tôi</Text>
        <View style={styles.line}></View>

        <View style={styles.searchBox}>
          <Image
            style={styles.searchIcon}
            source={require("../assets/icons/search.png")}
          ></Image>
          <TextInput
            style={styles.input}
            placeholder="Tìm kiếm"
            returnKeyType="search"
            value={search}
            onChangeText={(text) => setSearch(text)}
          ></TextInput>
        </View>
        <View style={styles.label}>
          <Text style={styles.allText}>Tất cả các tập</Text>
          <TouchableOpacity style={styles.sort}>
            <Text style={styles.sortText}>Sắp xếp</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{ height: "100%" }}
          keyboardShouldPersistTaps="handled"
        >
          <View>
            <Text style={styles.emptyText}>Trống</Text>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate("UploadPodcast")}
          style={styles.add}
        >
          <Image
            style={styles.addImage}
            source={require("../assets/icons/adding-podcast.png")}
          ></Image>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  back: {
    width: 40,
  },
  backIcon: {
    width: 40,
    height: 40,
    marginTop: 48,
  },
  title: {
    marginTop: -28,
    fontSize: 24,
    //fontWeight: "bold",
    fontFamily: "LexendExa_400Regular",
    color: "#000000",
    marginLeft: "auto",
    marginRight: "auto",
    letterSpacing: -2,
  },
  line: {
    width: 280,
    height: 1,
    backgroundColor: "#000000",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 4,
  },
  searchBox: {
    margin: 20,
    height: 40,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "#E7E3E3",
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginTop: 8,
    marginLeft: 8,
    marginRight: 12,
  },
  input: {
    width: "100%",
  },
  label: {
    marginLeft: 16,
    marginRight: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  allText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  sort: {
    padding: 4,
    width: 60,
    backgroundColor: "#777D84",
    borderRadius: 8,
  },
  sortText: {
    color: "#ffffff",
    marginLeft: "auto",
    marginRight: "auto",
  },
  emptyText: {
    color: "#777D84",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 120,
  },
  add: {
    position: "absolute",
    bottom: "30%",
    right: 20,
  },
  addImage: {
    width: 60,
    height: 60,
  },
  content: {},
});

/*
  export default class PodcastScreen extends Component {
    render() {
      return (
        <View>
          <Text style={styles.title}>Podcast</Text>
          <View style={styles.formControl1}>
            <View style={styles.line}></View>
          </View>
        </View>
      );
    }
  }
  */
