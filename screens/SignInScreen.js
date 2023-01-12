import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React, { Component } from "react";

export default class SignInScreen extends Component {
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
    marginBottom: 20,
  },
  btn: {
    width: 332,
    height: 80,
    backgroundColor: "#195ABB",
    marginTop: 20,
    marginBottom: 8,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 8,
  },
  opt: {
    fontSize: 24,
    color: "#ffffff",
    textAlign: "center",
    marginTop: 20,
  },
});
