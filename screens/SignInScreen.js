import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";

export default function SignInScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={styles.backIcon}
          source={require("../assets/icons/back.png")}
        ></Image>
      </TouchableOpacity>

      <Image
        style={styles.logo}
        source={require("../assets/images/logo.png")}
      ></Image>
      <Image
        style={styles.image}
        source={require("../assets/images/sign-in.png")}
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
              style={styles.input}
              placeholder="Tên đăng nhập"
              value={username}
              onChangeText={(text) => setUsername(text)}
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
              style={styles.input2}
              secureTextEntry={isPasswordSecure}
              placeholder="Mật khẩu"
              onChangeText={(text) => setPassword(text)}
              value={password}
            ></TextInput>
            <TouchableOpacity
              onPress={() => {
                isPasswordSecure
                  ? setIsPasswordSecure(false)
                  : setIsPasswordSecure(true);
              }}
            >
              {isPasswordSecure && (
                <Image
                  style={styles.eyeIcon}
                  source={require("../assets/icons/eye-off.png")}
                ></Image>
              )}
              {!isPasswordSecure && (
                <Image
                  style={styles.eyeIcon}
                  source={require("../assets/icons/eye-on.png")}
                ></Image>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity>
        <Text style={styles.forgotPassLabel}>Quên mật khẩu?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginBtn}
        // onPress={() => navigation.navigate("HomeTabs")}
        onPress={() => navigation.navigate("FirstInfo")}
      >
        <Text style={styles.loginText}>Đăng nhập</Text>
      </TouchableOpacity>
      <Text style={styles.lineText}>Hoặc tiếp tục với</Text>
      <View style={styles.formControl1}>
        <View style={styles.line}></View>
        <View style={styles.line}></View>
      </View>

      <View style={styles.formControl2}>
        <TouchableOpacity>
          <Image
            style={styles.signInLogo}
            source={require("../assets/images/google-logo.png")}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.signInLogo}
            source={require("../assets/images/apple-logo.png")}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.signInLogo}
            source={require("../assets/images/facebook-logo.png")}
          ></Image>
        </TouchableOpacity>
      </View>

      <View style={styles.formControl3}>
        <Text style={styles.ask}>Chưa có tài khoản?</Text>
        <TouchableOpacity>
          <Text
            style={styles.signUp}
            onPress={() => navigation.navigate("SignUp")}
          >
            {" "}
            Đăng ký ngay
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backIcon: {
    width: 40,
    height: 40,
    marginTop: 48,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    marginTop: 8,
  },
  icon: {
    width: 32,
    height: 32,
  },
  logo: {
    width: 48,
    height: 48,
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
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
  },
  card: {
    backgroundColor: "White",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  form: {},
  formControl: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  input: {
    width: 280,
    height: 32,
    // color: "#6a4595",
    fontSize: 16,
    paddingHorizontal: 4,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },

  input2: {
    width: 232,
    height: 32,
    // color: "#6a4595",
    fontSize: 16,
    paddingHorizontal: 4,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },

  forgotPassLabel: {
    fontSize: 12,
    color: "#1868DF",
    textAlign: "right",
    marginTop: 8,
    marginRight: 32,
  },
  loginBtn: {
    width: 200,
    height: 52,
    marginTop: 16,
    marginBottom: 32,
    backgroundColor: "#1868DF",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 12,
  },
  loginText: {
    fontSize: 20,
    color: "#ffffff",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 12,
    fontWeight: "600",
  },
  formControl1: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: -8,
  },
  line: {
    width: 60,
    height: 1,
    backgroundColor: "#777D84",
  },
  lineText: {
    fontSize: 12,
    color: "#777D84",
    textAlign: "center",
    marginTop: 32,
  },
  signInLogo: {
    width: 78,
    height: 56,
  },
  formControl2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 40,
  },
  formControl3: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 120,
    //alignItems: "center",
  },
  signUp: {
    color: "#1868DF",
  },
});
