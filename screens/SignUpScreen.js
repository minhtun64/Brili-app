import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
// import { CheckBox } from "react-native-elements";
// import CheckBox from "@react-native-community/checkbox";
// import { Checkbox } from "react-native-paper";
import Checkbox from "expo-checkbox";

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isSelected, setSelection] = useState(false);
  //const [isPasswordSecure, setIsPasswordSecure] = useState(true);

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
        source={require("../assets/images/sign-up.png")}
      ></Image>
      <Text style={styles.title}>Đăng ký</Text>

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
              style={styles.input}
              //  secureTextEntry={isPasswordSecure}
              placeholder="Mật khẩu"
              onChangeText={(text) => setPassword(text)}
              value={password}
            ></TextInput>
            {/* <TouchableOpacity
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
            </TouchableOpacity> */}
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
              style={styles.input}
              // secureTextEntry={isPasswordSecure}
              placeholder="Xác nhận mật khẩu"
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
            ></TextInput>
            {/* <TouchableOpacity
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
            </TouchableOpacity> */}
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.form}>
          <View style={styles.formControl}>
            <Image
              style={styles.icon}
              source={require("../assets/icons/email.png")}
            ></Image>
            <TextInput
              style={styles.input}
              placeholder="Địa chỉ email"
              onChangeText={(text) => setEmail(text)}
              value={email}
            ></TextInput>
          </View>
        </View>
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox
          disable={false}
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Đồng ý với chính sách của Brili?</Text>
      </View>
      {isSelected && (
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={styles.loginText}>Đăng ký</Text>
        </TouchableOpacity>
      )}
      {!isSelected && (
        <TouchableOpacity style={styles.loginBtnOff}>
          <Text style={styles.loginText}>Đăng ký</Text>
        </TouchableOpacity>
      )}

      <View style={styles.formControl3}>
        <Text style={styles.ask}>Đã có tài khoản?</Text>
        <TouchableOpacity>
          <Text
            style={styles.signIn}
            onPress={() => navigation.navigate("SignIn")}
          >
            {" "}
            Đăng nhập
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
    marginTop: 32,
  },
  eyeIcon: {
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
    color: "#6a4595",
    fontSize: 16,
    paddingHorizontal: 4,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },

  input2: {
    width: 232,
    height: 32,
    color: "#6a4595",
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
    marginTop: 12,
    marginBottom: 16,
    backgroundColor: "#1868DF",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 12,
  },
  loginBtnOff: {
    width: 200,
    height: 52,
    marginTop: 12,
    marginBottom: 16,
    backgroundColor: "#A4A6A9",
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
    marginTop: 20,
  },
  formControl2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  formControl3: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 32,
    //alignItems: "center",
  },
  signIn: {
    color: "#1868DF",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginLeft: 32,
    marginTop: 32,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});
