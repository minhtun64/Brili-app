import { Text, Keyboard, StyleSheet, View, TouchableWithoutFeedback, Image, TouchableOpacity, TextInput, ScrollView, Dimensions, KeyboardAvoidingView } from "react-native";
import React, { Component, useCallback, useEffect, useState } from "react";
import { useSwipe } from "../hooks/useSwipe";
import Modal from "react-native-modal";
 import DocumentPicker from 'react-native-document-picker';
//import * as DocumentPicker from 'expo-document-picker';
import { Button } from "react-native-elements";
const MALE = "MALE";
const FE_MALE = "FE_MALE";
export default function CurriculumVitae({ navigation }) {
    const [gender, setgender] = useState(MALE);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisible2, setModalVisible2] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const toggleModal2 = () => {
        setModalVisible2(!isModalVisible2);
    };
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState("Chọn ngày sinh");
    const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6);
    const DismissKeyboardHOC = (Comp) => {
        return ({ children, ...props }) => (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <Comp {...props}>{children}</Comp>
            </TouchableWithoutFeedback>
        );
    };
    const DismissKeyboardView = DismissKeyboardHOC(View);
    function onSwipeLeft() {
        //navigation.goBack();
    }

    function onSwipeRight() {
        // console.log("SWIPE_RIGHT");
        navigation.goBack();
    }
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        const dt = new Date(date);
        const x = dt.toISOString().split("T");
        const x1 = x[0].split("-");
        setSelectedDate(x1[2] + "/" + x1[1] + "/" + x1[0]);
        hideDatePicker();
    };

    const handleDocumentSelection = useCallback(async () => {
        try {
          const response = await DocumentPicker.pick({
            presentationStyle: 'fullScreen',
          });
          setFileResponse(response);
        } catch (err) {
          console.warn(err);
        }
      }, []);
      const pickDocument = async () => {
	    let result = await DocumentPicker.getDocumentAsync({});
		  alert(result.uri);
      console.log(result);
	}
  
    //     const pickDocument = async () => {
    //       let result = await DocumentPicker.getDocumentAsync({type: "*/*",
    //       multiple: true,
    //       copyToCacheDirectory: true});
    //       console.log(result.uri);
    //       console.log(result);
    // }


    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container} enabled keyboardVerticalOffset={Platform.select({ ios: 20, android: 20 })}>
            <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                <Image style={styles.backIcon} source={require("../assets/icons/back.png")}></Image>
            </TouchableOpacity>
            <Text style={styles.title}>Xác thực doanh nghiệp</Text>
            <ScrollView onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
                <DismissKeyboardView>
                    <View style={styles.formInput}>
                        <Text style={styles.NameTitle}>TÊN DOANH NGHIỆP</Text>
                        <TextInput style={styles.Content} placeholder="Tên doanh nghiệp"></TextInput>
                    </View>
                    {/* <View style={styles.formInput}>
                        <Text style={styles.NameTitle}>GIỚI TÍNH</Text>
                        <View style={styles.InputGender}>
                            <TouchableOpacity onPress={() => setgender(MALE)} style={[styles.OptionGender, gender == MALE ? styles.GenderActive : null]}>
                                <Text style={styles.TextInputGender}>Nam</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setgender(FE_MALE)} style={[styles.OptionGender, gender == FE_MALE ? styles.GenderActive : null]}>
                                <Text style={styles.TextInputGender}>Nữ</Text>
                            </TouchableOpacity>
                        </View>
                    </View> */}
                    <View style={styles.formInput}>
                        <Text style={styles.NameTitle}>EMAIL</Text>
                        <TextInput style={styles.Content} placeholder="Email"></TextInput>
                    </View>
                    <View style={styles.formInput}>
                        <Text style={styles.NameTitle}>SỐ ĐIỆN THOẠI</Text>
                        <TextInput style={styles.Content} placeholder="Số điện thoại"></TextInput>
                    </View>
                    {/* <View style={styles.formInput}>
                        <Text style={styles.NameTitle}>NGÀY SINH</Text>
                        <View>
                            <TouchableOpacity style={styles.buttonDate} onPress={showDatePicker}>
                                <Text style={styles.textDate}>{selectedDate}</Text>
                                <Image style={styles.dateIcon} source={require("../assets/icons/arrow-square-down.png")}></Image>
                            </TouchableOpacity>
                            <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirm} onCancel={hideDatePicker} />
                        </View>
                    </View> */}
                    {/* <View style={styles.formInputEx}>
                        <Text style={styles.NameTitle}></Text>
                        <Button style={styles.btn_input} title="Chọn ảnh" onPress={handleDocumentSelection}></Button>
                    </View> */}
                    <View style={styles.formInput}>
                        <Text style={styles.NameTitle}>GIẤY PHÉP KINH DOANH</Text>
                        <View>
                            <TouchableOpacity style={styles.buttonDate}>
                               <Text style={styles.placeholder}>Mặt trước</Text>
                                <Image style={styles.dateIcon} source={require("../assets/icons/arrow-square-down.png")}></Image>
                            </TouchableOpacity>
                            
                        </View>
                        <View>
                            <TouchableOpacity style={styles.buttonDate}>
                               <Text style={styles.placeholder}>Mặt sau</Text>
                                <Image style={styles.dateIcon} source={require("../assets/icons/arrow-square-down.png")}></Image>
                            </TouchableOpacity>                            
                        </View>
                    </View>
                    <TouchableOpacity style={styles.confirm} onPress={toggleModal}>
                        <Text style={styles.TextConfirm}>Xác Thực</Text>
                    </TouchableOpacity>
                    <Modal isVisible={isModalVisible}>
                        <View style={styles.popup}>
                            <View>
                                <Text style={styles.TextConfirm2}>Bạn chắc chắn với thông tin doanh nghiệp?</Text>
                            </View>
                            <View style={styles.btnConfirm}>
                                <TouchableOpacity style={styles.cancle} onPress={toggleModal}>
                                    <Text style={styles.textcancle}>Hủy</Text>
                                </TouchableOpacity>
                                <View style={styles.line2}></View>
                                <TouchableOpacity style={styles.send} onPress={() => navigation.navigate("RecruitmentScreenV")}>
                                    <Text style={styles.textsend}>Gửi</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </DismissKeyboardView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    back: {
        width: 36,
    },
    backIcon: {
        width: 36,
        height: 36,
        marginTop: 40,
    },
    title: {
        marginTop: -36,
        fontSize: 24,
        fontFamily: "LexendExa_400Regular",
        color: "#000000",
        marginLeft: "auto",
        marginRight: "auto",
        letterSpacing: -2,
    },
    line: {
        width: 280,
        height: 1,
        backgroundColor: "#000000",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 4,
    },

    formInput: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 80,
    },
    formInputEx: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 150,
    },
    NameTitle: {
        fontWeight: "500",
        fontSize: 20,
    },
    Content: {
        fontSize: 20,
        backgroundColor: "#D9D9D9",
        borderRadius: 12,
        height: 40,
        marginTop: 10,
        marginLeft: 14,
        marginRight: 14,
        paddingLeft: 14,
    },
    ContentEx: {
        fontSize: 20,
        backgroundColor: "#D9D9D9",
        borderRadius: 12,
        height: 100,
        marginTop: 10,
        marginLeft: 14,
        marginRight: 14,
        paddingLeft: 14,
    },
    InputGender: {
        flexDirection: "row",
        marginLeft: 14,
        marginRight: 14,
        backgroundColor: "#D9D9D9",
        height: 40,
        marginTop: 20,
        borderRadius: 12,
    },
    OptionGender: {
        width: "50%",
        height: 40,

        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    GenderActive: {
        backgroundColor: "#FFBE18",
    },
    TextInputGender: {
        color: "white",
        fontSize: 20,
    },
    buttonDate: {
        height: 40,
        backgroundColor: "#D9D9D9",
        marginTop: 20,
        borderRadius: 12,
        marginLeft: 14,
        marginRight: 14,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textDate: {
        fontSize: 20,
        marginLeft: 14,
    },
    dateIcon: {
        width: 34,
        height: 34,
        marginRight: 14,
    },
    confirm: {
        height: 65,
        backgroundColor: "#195ABB",
        marginBottom: 120,
        marginTop: 120,
        marginLeft: 40,
        marginRight: 40,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    TextConfirm: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    popup: {
        width: 350,
        height: 200,
        backgroundColor: "#ffffff",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 20,
        padding: 20,
        justifyContent: "center",
    },
    TextConfirm2: {
        fontSize: 24,
        textAlign: "center",
        fontWeight: "bold",
    },
    btnConfirm: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-evenly",
        marginTop: 20,
        height: 50,
    },
    cancle: {
        width: "45%",
        borderWidth: 2,
        borderColor: "#1868DF",
        borderRadius: 12,
        justifyContent: "center",
    },
    textcancle: {
        textAlign: "center",
        color: "#1868DF",
        fontSize: 24,
        fontWeight: "bold",
    },
    send: {
        width: "45%",
        borderWidth: 2,
        borderColor: "#1868DF",
        backgroundColor: "#1868DF",
        borderRadius: 12,
        justifyContent: "center",
    },
    textsend: {
        textAlign: "center",
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: "bold",
    },
    placeholder:{
        fontSize:20,
        marginLeft:12,
        color:"#777D84"
    }
});
