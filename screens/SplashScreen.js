import { Text, StyleSheet, View, Image } from "react-native";
import React, { Component } from "react";

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { navigation } = this.props;
    setTimeout(() => {
      navigation.navigate("Welcome");
    }, 2500);
  }

  render() {
    return (
      <View>
        <Image
          style={styles.logo}
          source={require("../assets/images/full-logo.png")}
        ></Image>
        <Text style={styles.slogan}>MANG ÁNH SÁNG ĐẾN VỚI CỘNG ĐỒNG</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 200,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 200,
  },
  slogan: {
    marginLeft: "auto",
    marginRight: "auto",
    color: "#03A2FE",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 200,
  },
});
