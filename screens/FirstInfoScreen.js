import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { Component, useEffect, useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useIsFocused } from "@react-navigation/native";

const DismissKeyboardHOC = (Comp) => {
  return ({ children, ...props }) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Comp {...props}>{children}</Comp>
    </TouchableWithoutFeedback>
  );
};
const DismissKeyboardView = DismissKeyboardHOC(View);

export default function SignInScreen({ navigation }) {
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [language, setLanguage] = useState(0);
  const [lastnameErrorMessage, setLastnameErrorMessage] = useState("");
  const [firstnameErrorMessage, setFirstnameErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const languages = ["Tiếng Việt", "Tiếng Anh", "Tiếng Trung", "Tiếng Nhật"];

  const isFocused = useIsFocused();
  useEffect(() => {
    isFocused;
  }, [isFocused]);

  formValidation = async () => {
    setLoading(true);
    let errorFlag = false;

    // input validation
    if (lastname.length == 0) {
      errorFlag = true;
      setLastnameErrorMessage("Bắt buộc nhập họ.");
    }

    if (firstname.length == 0) {
      errorFlag = true;
      setFirstnameErrorMessage("Bắt buộc nhập tên.");
    }

    if (errorFlag) {
      // console.log("errorFlag");
    } else {
      setLoading(false);
      navigation.navigate("HomeTabs");
    }
  };
  return (
    <DismissKeyboardView>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
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
            autoFocus
            onChangeText={(text) => {
              setLastnameErrorMessage("");
              setLastname(text);
            }}
          ></TextInput>
        </View>
        {lastnameErrorMessage.length > 0 && (
          <Text style={styles.textDanger}>{lastnameErrorMessage}</Text>
        )}
        <View style={styles.line}></View>
        <View style={styles.row}>
          <Text style={styles.prop}>Tên</Text>
          <TextInput
            style={styles.input}
            value={firstname}
            placeholder="ABC"
            onChangeText={(text) => {
              setFirstnameErrorMessage("");
              setFirstname(text);
            }}
          ></TextInput>
        </View>
        {firstnameErrorMessage.length > 0 && (
          <Text style={styles.textDanger}>{firstnameErrorMessage}</Text>
        )}
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
              // console.log(selectedItem, index);
              setLanguage(index);
            }}
            defaultValueByIndex={0}
            buttonStyle={styles.dropdownBtn}
            buttonTextStyle={styles.dropdownText}
            rowTextStyle={styles.dropdownText}
            dropdownStyle={styles.dropdown}
            selectedRowStyle={styles.dropdownSelectedRow}
            selectedRowTextStyle={styles.dropdownSelectedText}
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
      <TouchableOpacity style={styles.saveBtn} onPress={() => formValidation()}>
        <Text style={styles.saveText}>Lưu thông tin</Text>
      </TouchableOpacity>
    </DismissKeyboardView>
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
    borderRadius: 8,
  },
  dropdownBtn: {
    width: 152,
    marginTop: -10,
    height: 40,
    borderRadius: 8,
  },
  dropdownText: {
    fontWeight: "600",
  },
  dropdownSelectedRow: {
    backgroundColor: "#1868DF",
  },
  dropdownSelectedText: {
    color: "#ffffff",
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
  textDanger: {
    color: "#dc3545",
    marginLeft: 144,
    marginRight: 12,
  },
});
