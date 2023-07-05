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
import * as LocalAuthentication from "expo-local-authentication";
import { SafeAreaView } from "react-native-safe-area-context";

import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";

export default function S_SignIn2Screen({ navigation }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sound, setSound] = React.useState();
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    checkBiometricCompatibility();
  }, []);

  const checkBiometricCompatibility = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) {
      console.log("Thiết bị không hỗ trợ tính năng vân tay");
    }
  };

  const handleAuthentication = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Vui lòng xác thực để đăng nhập",
      fallbackLabel: "Đăng nhập bằng mật khẩu",
      disableDeviceFallback: true,
      cancelLabel: "Hủy bỏ",
    });

    console.log(result);
    if (result.success) {
      setAuthenticated(true);
      // Xác thực thành công, thực hiện đăng nhập hoặc mở màn hình chính ứng dụng
    } else {
      console.log("Không thành công");
    }
  };

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

  return (
    <TouchableOpacity
      onPress={() => {
        playSound(require("../assets/sounds/sound11.mp3"));
        handleAuthentication();
      }}
      style={styles.mainForm}
    >
      <View>
        <Image
          style={styles.logo}
          source={require("../assets/images/logo.png")}
        ></Image>
        <Image
          style={styles.image}
          source={require("../assets/images/sign-in.png")}
          onLoad={() => {
            playSound(require("../assets/sounds/sound11.mp3"));
            handleAuthentication();
          }}
        ></Image>
        <Text style={styles.title}>Đăng nhập</Text>
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
      </View>
      {authenticated && (
        <View>
          <Text style={styles.title1}>Đăng nhập thành công</Text>
          <Image
            style={styles.sound}
            source={require("../assets/icons/success.png")}
            onLoad={() => {
              playSound(require("../assets/sounds/sound10.mp3"));
              navigation.navigate("HomeTabs");
            }}
          ></Image>
          {/* Hiển thị giao diện đăng nhập thành công */}
        </View>
      )}
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
  title1: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
