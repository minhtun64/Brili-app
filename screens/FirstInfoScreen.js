import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { Component, useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function SignInScreen({ navigation }) {
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [selected, setSelected] = useState(undefined);
  //   const data = [
  //     { label: "Tiếng Việt", value: "1" },
  //     { label: "Tiếng Anh", value: "2" },
  //     { label: "Tiếng Trung", value: "3" },
  //     { label: "Tiếng Nhật", value: "4" },
  //     { label: "Tiếng Hàn", value: "5" },
  //   ];

  const languages = ["Tiếng Việt", "Tiếng Anh", "Tiếng Trung", "Tiếng Hàn"];

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

      <Text style={styles.title}>Thông tin cá nhân</Text>

      <View style={styles.form}>
        <View style={styles.row}>
          <Text style={styles.prop}>Họ</Text>
          <TextInput
            style={styles.input}
            value={lastname}
            placeholder="ABC"
            onChangeText={(text) => setLastname(text)}
          ></TextInput>
        </View>
        <View style={styles.line}></View>
        <View style={styles.row}>
          <Text style={styles.prop}>Tên</Text>
          <TextInput
            style={styles.input}
            value={firstname}
            placeholder="ABC"
            onChangeText={(text) => setFirstname(text)}
          ></TextInput>
        </View>
        <View style={styles.line}></View>
        <View style={styles.row}>
          <Text style={styles.prop}>Ngôn ngữ chính</Text>
          <SelectDropdown
            data={languages}
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
              console.log(selectedItem, index);
            }}
            defaultValueByIndex={0}
            buttonStyle={styles.dropdown}
            buttonTextStyle={styles.dropdownText}
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
      </View>
      <TouchableOpacity
        style={styles.saveBtn}
        onPress={() => navigation.navigate("HomeTabs")}
      >
        <Text style={styles.saveText}>Lưu thông tin</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  backIcon: {
    width: 40,
    height: 40,
    marginTop: 48,
  },
  logo: {
    width: 48,
    height: 48,
    marginTop: 12,
    marginLeft: 20,
  },
  title: {
    marginLeft: "auto",
    marginRight: "auto",
    color: "#171586",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 32,
  },
  form: {
    padding: 20,
    backgroundColor: "#D8D8D8",
    margin: 40,
    marginTop: 80,
    borderRadius: 12,
  },
  row: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "black",
  },
  prop: {
    fontSize: 18,
  },
  input: {
    width: 150,
    fontSize: 20,
    fontWeight: "bold",
  },
  line: {
    marginTop: 8,
    marginBottom: 32,
    width: 300,
    height: 1,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#777D84",
  },
  dropdown: {
    width: 152,
    marginTop: -10,
    height: 40,
    borderRadius: 8,
  },
  dropdownText: {
    fontWeight: "600",
  },
  saveBtn: {
    width: 320,
    height: 52,
    marginTop: 180,
    backgroundColor: "#1868DF",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 12,
  },
  saveText: {
    fontSize: 20,
    color: "#ffffff",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 12,
    fontWeight: "600",
  },
});
