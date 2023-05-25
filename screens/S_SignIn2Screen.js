import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { SafeAreaView } from "react-native-safe-area-context";

export default function S_SignIn2Screen({ navigation }) {
  const [authenticated, setAuthenticated] = useState(false);

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

  return (
    <SafeAreaView style={styles.container}>
      {authenticated ? (
        <View>
          <Text style={styles.title}>Đăng nhập thành công</Text>
          {/* Hiển thị giao diện đăng nhập thành công */}
        </View>
      ) : (
        <TouchableOpacity onPress={handleAuthentication} style={styles.button}>
          <Text style={styles.buttonText}>Đăng nhập bằng vân tay</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
