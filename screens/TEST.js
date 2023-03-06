import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { useSwipe } from "../hooks/useSwipe";
//const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6);

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

export default function ChoiceScreen({ navigation }) {
  const [recording, setRecording] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [loading, setLoading] = useState(false);
  const [sound, setSound] = React.useState();
  const [playing, setPlaying] = useState(false);
  const [backCount, setBackCount] = React.useState(0);
  const [index, setIndex] = useState(1);
  const [userMessage, setUserMessage] = useState("");
  const [allow, setAllow] = useState(true);

  const [repeat, setRepeat] = useState(false);

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/sound-test-1.mp3")
    );
    setSound(sound);
    setPlaying(true);
    console.log("Playing Sound");
    await sound.playAsync();
    setTimeout(() => {
      setPlaying(false);
    }, 10000);
  }

  async function playSound2() {
    console.log("Loading Sound 2");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/sound-test-2.mp3")
    );
    setSound(sound);
    setPlaying(true);
    console.log("Playing Sound 2");
    await sound.playAsync();
    setTimeout(() => {
      setPlaying(false);
    }, 5000);
  }

  async function playSound3() {
    console.log("Loading Sound 3");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/sound-test-3.mp3")
    );
    setSound(sound);
    setPlaying(true);
    console.log("Playing Sound 3");
    await sound.playAsync();
    setTimeout(() => {
      setPlaying(false);
    }, 7000);
  }

  async function playSound4() {
    console.log("Loading Sound 4");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/sound-test-4.mp3")
    );
    setSound(sound);
    setPlaying(true);
    console.log("Playing Sound 4");
    await sound.playAsync();
    setTimeout(() => {
      setPlaying(false);
    }, 5000);
  }
  async function playSound5() {
    console.log("Loading Sound 5");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/sound-test-5.mp3")
    );
    setSound(sound);
    setPlaying(true);
    console.log("Playing Sound 5");
    await sound.playAsync();
    setTimeout(() => {
      setPlaying(false);
    }, 7000);
  }
  async function playSound6() {
    console.log("Loading Sound 6");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/sound-test-6.mp3")
    );
    setSound(sound);
    setPlaying(true);
    console.log("Playing Sound 6");
    await sound.playAsync();
    setTimeout(() => {
      setPlaying(false);
    }, 2000);
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  //   function onSwipeLeft() {
  //     //navigation.goBack();
  //   }

  //   function onSwipeRight() {
  //     // console.log("SWIPE_RIGHT");
  //     navigation.goBack();
  //   }

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
      str = str.toLowerCase();
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
      //str = str.replace(/./g, "");
      str = str.replace(/đ/g, "d");
      // Some system encode vietnamese combining accent as individual utf-8 characters
      str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
      str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
      str = str.replace(/ /g, "");
      console.log(str);
      if (index == 2) {
        if (str == "") {
          setIsFetching(false);
          playSound2();
          setBackCount(0);
          console.log("Phát lại âm thanh 2");
          setRepeat(true);
          //return;
        } else {
          setUsername(str);
          setIndex(index + 1);
          setIsFetching(false);
          playSound3();
          console.log("Xác nhận tên đăng nhập");
          console.log(index);
        }
      }
      if (index == 3) {
        if (str == "") {
          setIsFetching(false);
          playSound3();
          setBackCount(0);
          console.log("Phát lại âm thanh 3");
          setRepeat(true);
          //return;
        } else {
          setUsername(str);
          setIsFetching(false);
          playSound3();
        }
      }
      if (index == 4) {
        if (str == "") {
          setIsFetching(false);
          playSound4();
          setBackCount(0);
          console.log("Phát lại âm thanh 4");
          setRepeat(true);
          //return;
        } else {
          setPassword(str);
          setIndex(index + 1);
          setIsFetching(false);
          playSound5();
          console.log("Xác nhận mật khẩu");
          console.log(index);
        }
      }
      if (index == 5) {
        if (str == "") {
          setIsFetching(false);
          playSound5();
          setBackCount(0);
          console.log("Phát lại âm thanh 5");
          setRepeat(true);
          //return;
        } else {
          setUsername(str);
          setIsFetching(false);
          playSound5();
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
    } catch (error) {
      // Do nothing -- we are already unloaded.
    }
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: false,
    });
    setAllow(false);
  };

  const resetRecording = () => {
    deleteRecordingFile();
    setRecording(null);
  };

  const start = () => {
    console.log("start recording");
    console.log(index);
    if (allow || index == 4) {
      startRecording();
    }
  };

  //   await Audio.setAudioModeAsync({
  //     allowsRecordingIOS: false,
  //   });

  const stop = () => {
    console.log("stop recording");

    stopRecording();
    if (allow || index == 4) {
      // stopRecording();
      getTranscription();
    }
  };

  return (
    <TouchableOpacity
      style={styles.mainForm}
      onPressIn={() => {
        if (index != 1) {
          console.log(allow);
          sound.unloadAsync();

          start();
        }
        // setTimeout(() => {
        //   setBackCount(0);
        // }, 500);
      }}
      onPressOut={() => {
        if (index != 1) {
          stop();
        }
      }}
      onLongPress={() => {
        if (index == 1) {
          sound.unloadAsync();
          setTimeout(() => {
            setBackCount(0);
          }, 500);
          // navigation.navigate("S_SignUp");
        } else if (index == 2 && repeat) {
          setTimeout(() => {
            sound.unloadAsync();
            Audio.setAudioModeAsync({
              allowsRecordingIOS: true,
              playsInSilentModeIOS: true,
            });

            setAllow(true);
            setBackCount(0);
            sound.unloadAsync();
            console.log("đọc lại tên đăng nhập");
            start();
          }, 500);
        } else if (index == 3 && repeat) {
          setTimeout(() => {
            sound.unloadAsync();
            Audio.setAudioModeAsync({
              allowsRecordingIOS: true,
              playsInSilentModeIOS: true,
            });
            setAllow(true);
            setBackCount(0);
            sound.unloadAsync();
            start();
          }, 500);
        } else if (index == 4 && repeat) {
          setTimeout(() => {
            sound.unloadAsync();
            Audio.setAudioModeAsync({
              allowsRecordingIOS: true,
              playsInSilentModeIOS: true,
            });

            setAllow(true);
            setBackCount(0);
            sound.unloadAsync();
            console.log("đọc lại mật khẩu");
            start();
          }, 500);
        }
      }}
      onPress={() => {
        if (!isRecording) {
          if (index == 1) {
            setBackCount(backCount + 1);
            if (backCount == 1) {
              console.log("Ready to sound 2");
              sound.unloadAsync();
              playSound2();
              setBackCount(0);
              setIndex(index + 1);
            } else {
              setTimeout(() => {
                setBackCount(0);
              }, 500);
              console.log(backCount);
              playSound();
            }
          } else if (index == 2) {
            setBackCount(backCount + 1);
            if (backCount == 1) {
              console.log("Ready to sound 3");
              sound.unloadAsync();
              //navigation.navigate("Welcome");
              playSound2();
            } else {
              setTimeout(() => {
                setBackCount(0);
              }, 500);
              console.log("bk2 " + backCount);
              playSound2();
            }
          } else if (index == 3) {
            setBackCount(backCount + 1);
            console.log(backCount);
            if (backCount == 1) {
              Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
              });
              setAllow(true);
              console.log("Ready to sound 4");
              sound.unloadAsync();
              //navigation.navigate("Welcome");
              playSound4();

              setIndex(index + 1);
            } else {
              setTimeout(() => {
                setBackCount(0);
              }, 500);
              console.log("bk3" + backCount);
              playSound3();
            }
          } else if (index == 4) {
            setBackCount(backCount + 1);
            if (backCount == 1) {
              console.log("Ready to sound 5");
              sound.unloadAsync();
              //navigation.navigate("Welcome");
              playSound4();
            } else {
              setTimeout(() => {
                setBackCount(0);
              }, 500);
              console.log("bk4 " + backCount);
              playSound4();
            }
          } else if (index == 5) {
            setBackCount(backCount + 1);
            console.log(backCount);
            if (backCount == 1) {
              console.log("Đăng nhập thành công");
              sound.unloadAsync();
              //navigation.navigate("Welcome");
              playSound6();
              navigation.navigate("HomeTabs");
            } else {
              setTimeout(() => {
                setBackCount(0);
              }, 500);
              console.log("bk5" + backCount);
              playSound5();
            }
          }
        }
      }}
    >
      <ScrollView //onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
      >
        <Image
          style={styles.logo}
          source={require("../assets/images/logo.png")}
        ></Image>
        <Image
          style={styles.image}
          source={require("../assets/images/sign-in.png")}
          onLoad={playSound}
        ></Image>
        <Text style={styles.title}>Đăng nhập</Text>

        <View style={styles.card}>
          <View style={styles.form}>
            <View style={styles.formControl}>
              <Image
                style={styles.icon}
                source={require("../assets/icons/user.png")}
              ></Image>
              <TextInput
                editable={false}
                style={styles.input}
                placeholder="Tên đăng nhập"
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                }}
              ></TextInput>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.form}>
            <View style={styles.formControl}>
              <Image
                style={styles.icon}
                source={require("../assets/icons/lock.png")}
              ></Image>
              <TextInput
                editable={false}
                style={styles.input2}
                placeholder="Mật khẩu"
                secureTextEntry={true}
                onChangeText={(text) => {
                  setPassword(text);
                }}
                value={password}
              ></TextInput>
            </View>
          </View>
        </View>

        <TouchableOpacity disabled style={styles.loginBtn}>
          <Text style={styles.loginText}>Đăng nhập</Text>
        </TouchableOpacity>
        {playing ? (
          <Image
            style={styles.sound}
            source={require("../assets/images/voice.gif")}
          ></Image>
        ) : (
          <Image
            style={styles.sound}
            source={require("../assets/images/voice-stop.png")}
          ></Image>
        )}
      </ScrollView>
    </TouchableOpacity>
  );
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
  icon: {
    width: 32,
    height: 32,
  },
  logo: {
    width: 60,
    height: 60,
    marginTop: 12,
    marginLeft: 20,
  },
  image: {
    width: 260,
    height: 180,
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  title: {
    marginLeft: "auto",
    marginRight: "auto",
    color: "#171586",
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 12,
  },
  card: {
    backgroundColor: "White",
    padding: 20,
    borderRadius: 10,
    marginBottom: 28,
    height: 36,
  },
  mainForm: {
    marginTop: 60,
  },
  formControl: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  input: {
    width: 304,
    height: 40,
    // color: "#6a4595",
    fontSize: 24,
    paddingHorizontal: 4,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  input2: {
    width: 304,
    height: 40,
    // color: "#6a4595",
    fontSize: 24,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  loginBtn: {
    width: "80%",
    height: 56,
    marginTop: 36,
    marginBottom: 32,
    backgroundColor: "#1868DF",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 16,
  },
  loginText: {
    fontSize: 24,
    color: "#ffffff",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 8,
    fontWeight: "600",
  },
  sound: {
    height: 60,
    width: 60,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "100%",
    marginTop: 32,
  },
});

//export default TestSTT;
