import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
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

import { useSwipe } from "../hooks/useSwipe";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modal";
import { Button } from "react-native-elements";

const DismissKeyboardHOC = (Comp) => {
  return ({ children, ...props }) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Comp {...props}>{children}</Comp>
    </TouchableWithoutFeedback>
  );
};
const DismissKeyboardView = DismissKeyboardHOC(View);

export default function UploadPodcastScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [des, setDes] = useState("");
  const [height, setHeight] = useState("");

  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6);

  const ref_input2 = useRef();

  const topics = ["Brili - Life", "Brili - Study", "Brili - Love"];

  function onSwipeLeft() {
    //navigation.goBack();
  }

  function onSwipeRight() {
    // console.log("SWIPE_RIGHT");
    navigation.goBack();
  }

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

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        enabled
        keyboardVerticalOffset={Platform.select({ ios: 20, android: 200 })}
      >
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={styles.backIcon}
            source={require("../assets/icons/back.png")}
          ></Image>
        </TouchableOpacity>
        <Text style={styles.title}>Thêm mới</Text>
        <ScrollView
          style={{ height: "100%" }}
          keyboardShouldPersistTaps="handled"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <View style={styles.content}>
            <TouchableOpacity style={styles.imageBox}>
              <Image
                style={styles.imageIcon}
                source={require("../assets/icons/image.png")}
              ></Image>
              <Text style={styles.imageText}>Thêm ảnh chủ đề</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal} style={styles.audioBox}>
              <Image
                style={styles.audioIcon}
                source={require("../assets/icons/audio-add.png")}
              ></Image>
              <Text style={styles.audioText}>Thêm audio</Text>
            </TouchableOpacity>
            <Modal isVisible={isModalVisible}>
              <View style={{ flex: 1 }}>
                <Text>Hello!</Text>

                <Button title="Đóng" onPress={toggleModal} />
              </View>
            </Modal>
            <View style={styles.line}></View>
            <View style={styles.info}>
              <View style={styles.formControl}>
                <Text style={styles.prop}>Tên tập</Text>
                <TextInput
                  style={styles.input1}
                  onChangeText={(text) => setTitle(text)}
                  value={title}
                  returnKeyType="next"
                  onSubmitEditing={() => ref_input2.current.focus()}
                ></TextInput>
              </View>
              <View style={styles.formControl}>
                <Text style={styles.prop}>Chủ đề</Text>
                <SelectDropdown
                  data={topics}
                  renderDropdownIcon={(isOpened) => {
                    return (
                      <FontAwesome
                        name={isOpened ? "chevron-up" : "chevron-down"}
                        color={"#444"}
                        size={18}
                      />
                    );
                  }}
                  dropdownIconPosition={"right"}
                  onSelect={(selectedItem, index) => {
                    // console.log(selectedItem, index);
                    setTopic(index);
                  }}
                  defaultButtonText="Chọn chủ đề"
                  buttonStyle={styles.dropdownBtn}
                  buttonTextStyle={styles.dropdownText}
                  rowTextStyle={styles.dropdownText}
                  dropdownStyle={styles.dropdown}
                  selectedRowStyle={styles.dropdownSelectedRow}
                  selectedRowTextStyle={styles.dropdownSelectedText}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item;
                  }}
                />
              </View>
              <View style={styles.formControl}>
                <Text style={styles.prop}>Mô tả</Text>
                <TextInput
                  style={[styles.input2, { height: Math.max(60, height) }]}
                  multiline={true}
                  //keyboardType=""
                  onChangeText={(text) => setDes(text)}
                  value={des}
                  onContentSizeChange={(event) =>
                    setHeight(event.nativeEvent.contentSize.height)
                  }
                  ref={ref_input2}
                ></TextInput>
              </View>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.postBtn}
          //onPress={() => navigation.goBack()}
        >
          <Text style={styles.postText}>Đăng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.saveBtn}
          //onPress={() => navigation.goBack()}
        >
          <Text style={styles.saveText}>Lưu bản nháp</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  back: {
    width: 40,
  },
  backIcon: {
    width: 40,
    height: 40,
    marginTop: 48,
  },
  title: {
    marginTop: -32,
    fontSize: 20,
    fontWeight: "500",
    color: "#000000",
    marginLeft: 40,

    marginBottom: 8,
  },
  line: {
    width: 320,
    height: 1,
    backgroundColor: "#A0A0A0",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 32,
    marginBottom: 32,
  },
  imageBox: {
    marginTop: 20,
    width: 240,
    height: 240,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 8,
    backgroundColor: "#E7E3E3",
  },
  imageIcon: {
    width: 30,
    height: 30,
    marginTop: 88,
    marginLeft: "auto",
    marginRight: "auto",
  },
  imageText: {
    marginTop: 16,
    marginLeft: "auto",
    marginRight: "auto",
    color: "#A0A0A0",
  },
  audioBox: {
    marginTop: 20,
    width: 160,
    height: 44,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 8,
    backgroundColor: "#000000",
    borderWidth: 2,
    borderColor: "#ffffff",
    borderStyle: "dotted",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    // flexWrap: "wrap",
  },
  audioIcon: {
    width: 26,
    height: 26,
    marginTop: 8,
    // marginLeft: "auto",
    // marginRight: "auto",
  },
  audioText: {
    marginTop: 12,
    // marginLeft: "auto",
    // marginRight: "auto",
    color: "#ffffff",
  },
  prop: {
    fontFamily: "LexendExa_400Regular",
    letterSpacing: -2,
    marginTop: 8,
  },
  input1: {
    width: 260,
    height: 36,
    fontSize: 16,
    paddingHorizontal: 4,
    paddingVertical: 5,
    backgroundColor: "#CBC9C9",
    borderRadius: 12,
    fontFamily: "LexendExa_400Regular",
    letterSpacing: -2,
  },

  input2: {
    width: 260,
    height: 60,
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: "#CBC9C9",
    borderRadius: 12,
    fontFamily: "LexendExa_400Regular",
    letterSpacing: -2,
    marginBottom: 180,
  },

  formControl: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 24,
  },
  dropdown: {
    borderRadius: 8,
  },
  dropdownBtn: {
    width: 260,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#CBC9C9",
  },
  dropdownText: {
    fontWeight: "600",
  },
  dropdownSelectedRow: {
    backgroundColor: "#FFBE18",
  },
  dropdownSelectedText: {
    color: "#ffffff",
  },
  postBtn: {
    width: "100%",
    // marginLeft: "auto",
    // marginRight: "auto",
    paddingTop: 8,
    paddingBottom: 8,
    position: "absolute",
    bottom: 160,
    //bottom: "25%",
    backgroundColor: "#1868DF",
    borderRadius: 12,
    // right: 20,
  },
  postText: {
    color: "#ffffff",
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 20,
    fontFamily: "LexendExa_400Regular",
    letterSpacing: -2,
  },
  saveBtn: {
    width: "100%",
    paddingTop: 8,
    paddingBottom: 8,
    position: "absolute",
    bottom: 112,
    // bottom: "20%",
    // backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#1868DF",
    borderRadius: 12,
  },
  saveText: {
    color: "#1868DF",
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 20,
    fontFamily: "LexendExa_400Regular",
    letterSpacing: -2,
    // borderWidth: 1,
    // borderColor: "#ffffff",
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
