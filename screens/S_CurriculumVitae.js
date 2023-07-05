import {
  Text,
  Keyboard,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React, { Component, useCallback, useEffect, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Modal from "react-native-modal";
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
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import * as Speech from "expo-speech";

const recordingOptions = {
  android: {
    extension: ".m4a",
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
  },
  ios: {
    extension: ".wav",
    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
    sampleRate: 44100,
    numberOfChannels: 1,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
};

export default function S_CurriculumVitae({ navigation }) {
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

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Chọn ngày sinh");
  const DismissKeyboardHOC = (Comp) => {
    return ({ children, ...props }) => (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Comp {...props}>{children}</Comp>
      </TouchableWithoutFeedback>
    );
  };
  const DismissKeyboardView = DismissKeyboardHOC(View);

  const [recording, setRecording] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [fullname, setFullname] = useState("");
  const [gender, setGender] = useState("Nam");
  const [phonenum, setPhonenum] = useState("");
  const [age, setAge] = useState("");
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [sound, setSound] = React.useState();
  const [playing, setPlaying] = useState(false);
  const [backCount, setBackCount] = React.useState(0);
  const [index, setIndex] = useState(1);

  async function playSound(soundFile) {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(soundFile);
    setSound(sound);
    setPlaying(true);
    console.log(`Playing Sound: ${soundFile}`);
    await sound.playAsync();
    const soundStatus = await sound.getStatusAsync();
    const duration = soundStatus.durationMillis; // Lấy độ dài thực tế của tệp âm thanh
    setTimeout(() => {
      setPlaying(false);
    }, duration);
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const deleteRecordingFile = async () => {
    try {
      const info = await FileSystem.getInfoAsync(recording.getURI());
      await FileSystem.deleteAsync(info.uri);
    } catch (error) {
      console.log("There was an error deleting recording file", error);
    }
  };

  const getTranscription = async () => {
    setIsFetching(true);
    try {
      const info = await FileSystem.getInfoAsync(recording.getURI());
      console.log(`FILE INFO: ${JSON.stringify(info)}`);
      const uri = info.uri;

      const base64content: string = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const body = {
        audio: { content: base64content },
        config: {
          enableAutomaticPunctuation: true,
          encoding: "LINEAR16",
          languageCode: "vi-VN",
          model: "default",
          sampleRateHertz: 44100,
        },
      };

      const transcriptResponse = await fetch(
        "https://speech.googleapis.com/v1p1beta1/speech:recognize?key=AIzaSyATOBs4KUVhKDnk56MxhgOJtN8_Pw1Z280",
        {
          method: "POST",
          body: JSON.stringify(body),
        }
      );
      const data = await transcriptResponse.json();
      console.log(data);

      console.log(data.results);
      const message =
        (data.results && data.results[0].alternatives[0].transcript) || "";
      console.log(message);
      var str = message;
      let lastDotIndex = str.lastIndexOf(".");
      if (lastDotIndex !== -1) {
        str = str.substring(0, lastDotIndex) + str.substring(lastDotIndex + 1);
      }
      console.log(str);
      if (index == 2) {
        if (str == "") {
          setIsFetching(false);
          playSound(require("../assets/sounds/CV/sound2.mp3"));
          setBackCount(0);
        } else {
          setFullname(str);
          setBackCount(1);
          setIsFetching(false);
          Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            playsInSilentModeIOS: false,
          });
          await playSound(require("../assets/sounds/CV/sound3.mp3"));
          setTimeout(() => {
            Speech.speak(message, { rate: 1.05 });
            setTimeout(() => {
              playSound(require("../assets/sounds/CV/sound4.mp3"));
            }, 1800);
          }, 1800);
        }
      } else if (index == 3) {
        if (str == "Nam" || str == "Nữ") {
          setGender(str);
          setBackCount(1);
          setIsFetching(false);
          Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            playsInSilentModeIOS: false,
          });
          playSound(require("../assets/sounds/CV/sound6.mp3"));
          setTimeout(() => {
            Speech.speak(message, { rate: 1.05 });
            setTimeout(() => {
              playSound(require("../assets/sounds/CV/sound7.mp3"));
            }, 1000);
          }, 1800);
        } else {
          setIsFetching(false);
          playSound(require("../assets/sounds/CV/sound5.mp3"));
          setBackCount(0);
        }
      } else if (index == 4) {
        if (str == "") {
          setIsFetching(false);
          playSound(require("../assets/sounds/CV/sound8.mp3"));
          setBackCount(0);
        } else {
          setPhonenum(str);
          setBackCount(1);
          setIsFetching(false);
          Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            playsInSilentModeIOS: false,
          });
          await playSound(require("../assets/sounds/CV/sound9.mp3"));
          setTimeout(() => {
            Speech.speak(message, { rate: 1.05 });
            setTimeout(() => {
              playSound(require("../assets/sounds/CV/sound10.mp3"));
            }, 3200);
          }, 1800);
        }
      } else if (index == 5) {
        if (str == "") {
          setIsFetching(false);
          playSound(require("../assets/sounds/CV/sound11.mp3"));
          setBackCount(0);
        } else {
          setAge(str);
          setBackCount(1);
          setIsFetching(false);
          Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            playsInSilentModeIOS: false,
          });
          await playSound(require("../assets/sounds/CV/sound12.mp3"));
          setTimeout(() => {
            Speech.speak(message, { rate: 1.05 });
            setTimeout(() => {
              playSound(require("../assets/sounds/CV/sound13.mp3"));
            }, 1800);
          }, 1800);
        }
      } else if (index == 6) {
        if (str == "") {
          setIsFetching(false);
          setIndex(index + 1);
          setBackCount(0);
        } else {
          setExperience(str);
          setBackCount(1);
          setIsFetching(false);
          Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            playsInSilentModeIOS: false,
          });
          await playSound(require("../assets/sounds/CV/sound15.mp3"));
          setTimeout(() => {
            Speech.speak(message, { rate: 1.05 });
            setTimeout(() => {
              playSound(require("../assets/sounds/CV/sound16.mp3"));
            }, 3000);
          }, 1800);
        }
      }
    } catch (error) {
      console.log("There was an error reading file", error);
      stopRecording();
      resetRecording();
    }
    setIsFetching(false);
  };

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      setIsRecording(true);

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(recordingOptions);
      await recording.startAsync();
      console.log("Start !!!");
      setRecording(recording);
    } catch (error) {
      console.log(error);
      stopRecording();
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    try {
      await recording.stopAndUnloadAsync();
    } catch (error) {}
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: false,
    });
  };

  const resetRecording = () => {
    deleteRecordingFile();
    setRecording(null);
  };

  const start = () => {
    console.log("start recording");
    startRecording();
  };

  const stop = () => {
    console.log("stop recording");
    stopRecording();
    getTranscription();
  };

  return (
    <TouchableOpacity
      style={styles.mainForm}
      onPressOut={() => {
        if (index != 1 && index != 7 && backCount == 0) {
          stop();
        }
        console.log("Thả");
      }}
      onLongPress={() => {
        if (index == 1 || index == 7) {
          sound.unloadAsync();
          setTimeout(() => {
            setBackCount(0);
          }, 500);
          navigation.goBack();
        } else {
          Speech.stop();
          sound.unloadAsync();
          Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          });
          start();
          setTimeout(() => {
            setBackCount(0);
          }, 500);
        }
      }}
      onPress={() => {
        if (!isRecording) {
          if (index == 1) {
            setBackCount(backCount + 1);
            if (backCount == 1) {
              sound.unloadAsync();
              playSound(require("../assets/sounds/CV/sound2.mp3"));
              setBackCount(0);
              setIndex(index + 1);
            } else {
              setTimeout(() => {
                setBackCount(0);
              }, 500);
              playSound(require("../assets/sounds/CV/sound1.mp3"));
            }
          } else if (index == 2) {
            setBackCount(backCount + 1);
            if (backCount == 2) {
              sound.unloadAsync();
              playSound(require("../assets/sounds/CV/sound5.mp3"));
              setBackCount(0);
              setIndex(index + 1);
            } else {
              setTimeout(() => {
                setBackCount(0);
              }, 500);
            }
          } else if (index == 3) {
            setBackCount(backCount + 1);
            if (backCount == 2) {
              sound.unloadAsync();
              playSound(require("../assets/sounds/CV/sound8.mp3"));
              setBackCount(0);
              setIndex(index + 1);
            } else {
              setTimeout(() => {
                setBackCount(0);
              }, 500);
            }
          } else if (index == 4) {
            setBackCount(backCount + 1);
            if (backCount == 2) {
              sound.unloadAsync();
              playSound(require("../assets/sounds/CV/sound11.mp3"));
              setBackCount(0);
              setIndex(index + 1);
            } else {
              setTimeout(() => {
                setBackCount(0);
              }, 500);
            }
          } else if (index == 5) {
            setBackCount(backCount + 1);
            if (backCount == 2) {
              sound.unloadAsync();
              playSound(require("../assets/sounds/CV/sound14.mp3"));
              setBackCount(0);
              setIndex(index + 1);
            } else {
              setTimeout(() => {
                setBackCount(0);
              }, 500);
            }
          } else if (index == 6) {
            setBackCount(backCount + 1);
            if (backCount == 2) {
              sound.unloadAsync();
              playSound(require("../assets/sounds/CV/sound17.mp3"));
              setBackCount(0);
              setIndex(index + 1);
            } else {
              setTimeout(() => {
                setBackCount(0);
              }, 500);
            }
          } else if (index == 7) {
            setBackCount(backCount + 1);
            if (backCount == 1) {
              console.log("Nhap dup");
              sound.unloadAsync();
              playSound(require("../assets/sounds/CV/sound18.mp3"));
              setBackCount(0);
              setTimeout(() => {
                navigation.navigate("S_CurriculumVitae_2");
              }, 1500);
              // setIndex(index + 1);
            } else {
              setTimeout(() => {
                setBackCount(0);
              }, 500);
              playSound(require("../assets/sounds/CV/sound17.mp3"));
            }
          }
          // else if (index == 8) {
          //   setBackCount(backCount + 1);
          //   if (backCount == 1) {
          //     console.log("Nhap dup");
          //     sound.unloadAsync();
          //     setBackCount(0);
          //     navigation.navigate("MarketingConsulting");
          //   } else {
          //     setTimeout(() => {
          //       setBackCount(0);
          //     }, 500);
          //     playSound(require("../assets/sounds/CV/sound18.mp3"));
          //   }
          // }
        }
      }}
    >
      <View style={styles.back}>
        <Image
          style={styles.backIcon}
          source={require("../assets/icons/back.png")}
          onLoad={() => playSound(require("../assets/sounds/CV/sound1.mp3"))}
        ></Image>
      </View>
      <Text style={styles.title}>Hồ sơ ứng tuyển</Text>
      <ScrollView>
        <View style={styles.formInput}>
          <Text style={styles.NameTitle}>HỌ TÊN</Text>
          <TextInput
            editable={false}
            style={styles.Content}
            placeholder="Họ và tên"
            onChangeText={(text) => {
              setFullname(text);
            }}
            value={fullname}
          ></TextInput>
        </View>
        <View style={styles.formInput}>
          <Text style={styles.NameTitle}>GIỚI TÍNH</Text>
          <View style={styles.InputGender}>
            <View
              style={[
                styles.OptionGender,
                gender == "Nam" ? styles.GenderActive : null,
              ]}
            >
              <Text style={styles.TextInputGender}>Nam</Text>
            </View>

            <View
              style={[
                styles.OptionGender,
                gender == "Nữ" ? styles.GenderActive : null,
              ]}
            >
              <Text style={styles.TextInputGender}>Nữ</Text>
            </View>
          </View>
        </View>
        {/* <View style={styles.formInput}>
                          <Text style={styles.NameTitle}>EMAIL</Text>
                          <TextInput style={styles.Content} placeholder="Email"></TextInput>
                      </View> */}
        <View style={styles.formInput}>
          <Text style={styles.NameTitle}>SỐ ĐIỆN THOẠI</Text>
          <TextInput
            editable={false}
            style={styles.Content}
            placeholder="Số điện thoại"
            onChangeText={(text) => {
              setPhonenum(text);
            }}
            value={phonenum}
          ></TextInput>
        </View>
        <View style={styles.formInput}>
          <Text style={styles.NameTitle}>SỐ TUỔI</Text>
          <TextInput
            editable={false}
            style={styles.Content}
            placeholder="Số tuổi"
            onChangeText={(text) => {
              setAge(text);
            }}
            value={age}
          ></TextInput>
          <View>
            {/* <View style={styles.buttonDate} onPress={showDatePicker}>
                                  <Text style={styles.textDate}>{selectedDate}</Text>
                                  <Image style={styles.dateIcon} source={require("../assets/icons/arrow-square-down.png")}></Image>
                              </View>
                              <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirm} onCancel={hideDatePicker} /> */}
          </View>
        </View>
        <View style={styles.formInputEx}>
          <Text style={styles.NameTitle}>KINH NGHIỆM</Text>
          <TextInput
            editable={false}
            multiline={true}
            numberOfLines={4}
            style={styles.ContentEx}
            placeholder="Kinh nghiệm (nếu có)"
            onChangeText={(text) => {
              setExperience(text);
            }}
            value={experience}
          ></TextInput>
        </View>
        <View style={styles.confirm} onPress={toggleModal}>
          <Text style={styles.TextConfirm}>Xác Nhận</Text>
        </View>
        <Modal isVisible={isModalVisible}>
          <View style={styles.popup}>
            <View>
              <Text style={styles.TextConfirm2}>
                Xác nhận gửi hồ sơ ứng tuyển?
              </Text>
            </View>
            <View style={styles.btnConfirm}>
              <View style={styles.cancle} onPress={toggleModal}>
                <Text style={styles.textcancle}>Hủy</Text>
              </View>
              <View style={styles.line2}></View>
              <View style={styles.send}>
                <Text style={styles.textsend}>Xác nhận</Text>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  back: {
    width: 36,
  },
  backIcon: {
    width: 36,
    height: 36,
    marginTop: 40,
  },
  title: {
    marginTop: -36,
    fontSize: 24,
    fontFamily: "LexendExa_400Regular",
    color: "#000000",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 24,
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

  formInput: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 80,
  },
  formInputEx: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 150,
  },
  NameTitle: {
    fontWeight: "500",
    fontSize: 20,
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
  ContentEx: {
    fontSize: 20,
    backgroundColor: "#D9D9D9",
    borderRadius: 12,
    height: 100,
    marginTop: 10,
    marginLeft: 14,
    marginRight: 14,
    paddingLeft: 14,
  },
  InputGender: {
    flexDirection: "row",
    marginLeft: 14,
    marginRight: 14,
    backgroundColor: "#D9D9D9",
    height: 40,
    marginTop: 20,
    borderRadius: 12,
  },
  OptionGender: {
    width: "50%",
    height: 40,

    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  GenderActive: {
    backgroundColor: "#FFBE18",
  },
  TextInputGender: {
    color: "white",
    fontSize: 20,
  },
  buttonDate: {
    height: 40,
    backgroundColor: "#D9D9D9",
    marginTop: 20,
    borderRadius: 12,
    marginLeft: 14,
    marginRight: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textDate: {
    fontSize: 20,
    marginLeft: 14,
  },
  dateIcon: {
    width: 34,
    height: 34,
    marginRight: 14,
  },
  confirm: {
    height: 65,
    backgroundColor: "#195ABB",
    marginBottom: 120,
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  TextConfirm: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  popup: {
    width: 350,
    height: 200,
    backgroundColor: "#ffffff",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 20,
    padding: 20,
    justifyContent: "center",
  },
  TextConfirm2: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
  btnConfirm: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    marginTop: 20,
    height: 50,
  },
  cancle: {
    width: "45%",
    borderWidth: 2,
    borderColor: "#1868DF",
    borderRadius: 12,
    justifyContent: "center",
  },
  textcancle: {
    textAlign: "center",
    color: "#1868DF",
    fontSize: 24,
    fontWeight: "bold",
  },
  send: {
    width: "45%",
    borderWidth: 2,
    borderColor: "#1868DF",
    backgroundColor: "#1868DF",
    borderRadius: 12,
    justifyContent: "center",
  },
  textsend: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
});
