import { Text, StyleSheet, View, Image, ImageBackground, TouchableOpacity, TextInput, ScrollView, Dimensions, TouchableWithoutFeedback, Keyboard } from "react-native";
import React, { Component, useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import Modal from "react-native-modal";
import {
    useFonts,
    LexendExa_100Thin,
    LexendExa_200ExtraLight,
    LexendExa_300Light,
    LexendExa_400Regular,
    LexendExa_500Medium,
    LexendExa_600SemiBold,
    LexendExa_700Bold,
    LexendExa_800ExtraBold,
    LexendExa_900Black,
} from "@expo-google-fonts/lexend-exa";
import { useSwipe } from "../hooks/useSwipe";

const DismissKeyboardHOC = (Comp) => {
    return ({ children, ...props }) => (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <Comp {...props}>{children}</Comp>
        </TouchableWithoutFeedback>
    );
};


const DismissKeyboardView = DismissKeyboardHOC(View);

export default function UploadJob({ navigation }) {
    const [search, setSearch] = useState("");
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisible2, setModalVisible2] = useState(false);
    const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6);
    const toggleModal = () => {
     setModalVisible(!isModalVisible);
 };

 const toggleModal2 = () => {
     setModalVisible2(!isModalVisible2);
 };
    function onSwipeLeft() {
        //navigation.goBack();
    }

    function onSwipeRight() {
        // console.log("SWIPE_RIGHT");
        navigation.goBack();
    }

    let [fontsLoaded] = useFonts({
        LexendExa_100Thin,
        LexendExa_200ExtraLight,
        LexendExa_300Light,
        LexendExa_400Regular,
        LexendExa_500Medium,
        LexendExa_600SemiBold,
        LexendExa_700Bold,
        LexendExa_800ExtraBold,
        LexendExa_900Black,
    });
    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    }, []);

    if (!fontsLoaded) {
        return null;
    } else {
        return (
            <View>
                <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                    <Image style={styles.backIcon} source={require("../assets/icons/back.png")}></Image>
                </TouchableOpacity>
                <Text style={styles.title}>Tiếp thị</Text>
                <View style={styles.line}></View>

                {/* <View style={styles.searchBox}>
                    <Image style={styles.searchIcon} source={require("../assets/icons/search.png")}></Image>
                    <TextInput style={styles.input} placeholder="Tìm kiếm" returnKeyType="search" value={search} onChangeText={(text) => setSearch(text)}></TextInput>
                </View> */}

                <ScrollView onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
                    <View>
                        <View style={styles.formInput}>
                        <Text style={styles.NameTitle}>TÊN CÔNG VIỆC</Text>
                        <TextInput style={styles.Content} placeholder="Tên công việc"></TextInput>
                    </View>
                    <View style={styles.formInput}>
                        <Text style={styles.NameTitle}>SỐ LƯỢNG</Text>
                        <TextInput style={styles.Content} placeholder="Số lượng nhân viên"></TextInput>
                    </View>
                    <View style={[styles.formInput, styles.bigtext]}>
                        <Text style={styles.NameTitle}>ĐỊA CHỈ</Text>
                        <TextInput multiline={true} numberOfLines={4} style={styles.ContentEx} placeholder="Nơi làm việc"></TextInput>
                    </View>
                    <View style={[styles.formInput, styles.bigtext]}>
                        <Text style={styles.NameTitle}>MÔ TẢ</Text>
                        <TextInput multiline={true} numberOfLines={4} style={styles.ContentEx} placeholder="Mô tả công việc"></TextInput>
                    </View>
                    <View style={[styles.formInput, styles.bigtext]}>
                        <Text style={styles.NameTitle}>YÊU CẦU</Text>
                        <TextInput multiline={true} numberOfLines={4} style={styles.ContentEx} placeholder="Yêu cầu"></TextInput>
                    </View>
                    <View style={styles.formInput}>
                        <Text style={styles.NameTitle}>LIÊN HỆ</Text>
                        <TextInput style={styles.Content} placeholder="Liên hệ"></TextInput>
                    </View>
                    </View>
                  
                    <TouchableOpacity style={styles.confirm} onPress={toggleModal}>
                        <Text style={styles.TextConfirm}>Đăng Tuyển</Text>
                    </TouchableOpacity>
                    <View style={{ height: 100 }}></View>
                    <Modal isVisible={isModalVisible}>
                        <View style={styles.popup}>
                            <View>
                                <Text style={styles.TextConfirm2}>Xác nhận đăng tuyển công việc?</Text>
                            </View>
                            <View style={styles.btnConfirm}>
                                <TouchableOpacity style={styles.cancle} onPress={toggleModal}>
                                    <Text style={styles.textcancle}>Hủy</Text>
                                </TouchableOpacity>
                                <View style={styles.line2}></View>
                                <TouchableOpacity style={styles.send}>
                                    <Text style={styles.textsend}>Xác nhận</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    back: {
        width: 40,
    },
    backIcon: {
        width: 40,
        height: 40,
        marginTop: 20,
    },
    title: {
        marginTop: -28,
        fontSize: 24,
        //fontWeight: "bold",
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
    searchBox: {
        margin: 20,
        height: 40,
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "flex-start",
        backgroundColor: "#E7E3E3",
    },
    searchIcon: {
        width: 24,
        height: 24,
        marginTop: 8,
        marginLeft: 8,
        marginRight: 12,
    },
    input: {
        width: "100%",
    },
    label: {
        marginLeft: 16,
        marginRight: 16,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    allText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    sort: {
        padding: 4,
        width: 60,
        backgroundColor: "#777D84",
        borderRadius: 8,
    },
    sortText: {
        color: "#ffffff",
        marginLeft: "auto",
        marginRight: "auto",
    },
    emptyText: {
        color: "#777D84",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 120,
    },
    add: {
        position: "absolute",
        bottom: "30%",
        right: 20,
    },
    addImage: {
        width: 60,
        height: 60,
    },
    jobName: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
    },
    companayName: {
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center",
        color: "#777D84",
    },
    jobImg: {
        width: 300,
        height: 200,

        marginTop: 20,
    },
    containerImg: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignContent: "center",
        alignItems: "center",
    },
    arrowLeftIcon: {
        width: 40,
        height: 40,
    },
    arrowRightIcon: {
        width: 40,
        height: 40,
    },
    audioInfo: {
        width: 320,
        height: 16,
    },
    audioInfoContainer: {
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    detailJob: {
        flexDirection: "row",
        //    alignItems: "center",
        justifyContent: "flex-start",
        marginLeft: 15,
        marginRight: 15,
        marginTop: 30,
    },
    iconDetail: {
        width: 30,
        height: 30,
    },
    textIcon: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10,
        width: 150,
    },
    textDes: {
        fontSize: 18,
        width: 200,
    },
    textDes2: {
        fontSize: 18,
        marginLeft: 70,
        marginRight: 15,
    },
    confirm: {
        height: 65,
        backgroundColor: "#195ABB",
        marginBottom: 120,
        marginTop: 40,
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
    formInput: {
     marginLeft: 30,
     marginRight: 30,
     marginTop: 20,
     height: 80,
 },NameTitle: {
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
 bigtext:{
     marginBottom:60
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
});
