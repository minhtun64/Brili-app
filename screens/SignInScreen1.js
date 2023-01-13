import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { Component } from "react";

export default class SignInScreen extends Component {
  state = {
    username: "",
    password: "",
    isPasswordSecure: true,
  };

  usernameChangeHandler = (text) => {
    this.setState({ ...this.state, username: text });
  };

  passwordChangeHandler = (text) => {
    this.setState({ ...this.state, password: text });
  };

  showPassword = () => {
    this.setState({ ...this.state, isPasswordSecure: false });
  };

  hidePassword = () => {
    this.setState({ ...this.state, isPasswordSecure: true });
  };

  render() {
    const { navigation } = this.props;
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
                onChangeText={this.usernameChangeHandler}
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
                secureTextEntry={this.isPasswordSecure}
                placeholder="Mật khẩu"
                onChangeText={this.passwordChangeHandler}
                // right={
                //   <TextInput.Icon
                //     name={() => (
                //       <MaterialCommunityIcons
                //         name={this.isPasswordSecure ? "eye-off" : "eye"}
                //         size={28}
                //         color={COLORS.black}
                //       />
                //     )} // where <Icon /> is any component from vector-icons or anything else
                //     onPress={() => {
                //       this.isPasswordSecure
                //         ? this.showPassword
                //         : this.hidePassword;
                //     }}
                //   />
                // }

                // fontFamily={FONTS.ROBOTO_REGULAR}
                // fontSize={Theme.FONT_18PX}
                // selectionColor={COLORS.orange}
                // underlineColor={COLORS.orange}
                // label={StringsConstants.Password}
                // value={password}
                // underlineColorAndroid="transparent"
                // theme={{
                //   colors: {
                //     text: COLORS.black,
                //     primary: COLORS.orange,
                //     placeholder: COLORS.black,
                //   },
                // }}
              ></TextInput>
            </View>
          </View>
        </View>

        <TouchableOpacity>
          <Text style={styles.forgotPassLabel}>Quên mật khẩu?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Đăng nhập</Text>
        </TouchableOpacity>
        <Text style={styles.lineText}>Hoặc tiếp tục với</Text>
        <View style={styles.formControl1}>
          <View style={styles.line}></View>
          <View style={styles.line}></View>
        </View>

        <View style={styles.formControl2}>
          <TouchableOpacity>
            <Image source={require("../assets/images/google-logo.png")}></Image>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require("../assets/images/apple-logo.png")}></Image>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require("../assets/images/facebook-logo.png")}
            ></Image>
          </TouchableOpacity>
        </View>

        <View style={styles.formControl3}>
          <Text style={styles.ask}>Chưa có tài khoản?</Text>
          <TouchableOpacity>
            <Text style={styles.signUp}> Đăng ký ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backIcon: {
    height: 16,
    marginTop: 32,
  },
  logo: {
    width: 48,
    height: 48,
    marginTop: 12,
    marginLeft: 20,
  },
  image: {
    width: 200,
    height: 150,
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
    marginBottom: 20,
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
    marginTop: 10,
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
    marginTop: 80,
    //alignItems: "center",
  },
  signUp: {
    color: "#1868DF",
  },
});
