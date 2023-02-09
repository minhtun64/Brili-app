import { Text, StyleSheet, View, Image, ImageBackground, TouchableOpacity, TextInput, ScrollView, Dimensions, TouchableWithoutFeedback, Keyboard } from "react-native";
import React, { Component, useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
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

export default function MyPodcastScreen({ navigation }) {
    const [search, setSearch] = useState("");

    const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6);

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

                <View style={styles.searchBox}>
                    <Image style={styles.searchIcon} source={require("../assets/icons/search.png")}></Image>
                    <TextInput style={styles.input} placeholder="Tìm kiếm" returnKeyType="search" value={search} onChangeText={(text) => setSearch(text)}></TextInput>
                </View>

                <ScrollView onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
                    <View>
                        <Text style={styles.jobName}>Nhân viên tư vấn gói chăm sóc sức khỏe</Text>
                        <Text style={styles.companayName}>ManpowerGroupVietNam</Text>
                        <View style={styles.containerImg}>
                            <TouchableOpacity style={styles.arrowLeft}>
                                <Image style={styles.arrowLeftIcon} source={require("../assets/icons/arrow-left.png")}></Image>
                            </TouchableOpacity>
                            <Image style={styles.jobImg} source={require("../assets/images/job1.png")}></Image>
                            <TouchableOpacity style={styles.arrowRight}>
                                <Image style={styles.arrowRightIcon} source={require("../assets/icons/arrow-right.png")}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.audioInfoContainer}>
                            <Image style={styles.audioInfo} source={require("../assets/icons/audio-job.png")}></Image>
                        </View>
                        <View style={styles.detailJob}>
                            <Image style={styles.iconDetail} source={require("../assets/icons/user-square.png")}></Image>
                            <Text style={styles.textIcon}>Số lượng: </Text>
                            <Text style={styles.textDes}>3 nhân viên nữ, 1 nhân viên nam</Text>
                        </View>
                        <View style={styles.detailJob}>
                            <Image style={styles.iconDetail} source={require("../assets/icons/dollar-square.png")}></Image>
                            <Text style={styles.textIcon}>Mức lương: </Text>
                            <Text style={styles.textDes}>4 - 7 triệu</Text>
                        </View>
                        <View style={styles.detailJob}>
                            <Image style={styles.iconDetail} source={require("../assets/icons/location.png")}></Image>
                            <Text style={styles.textIcon}>Địa chỉ: </Text>
                            <Text style={styles.textDes}>26 Đường Hoàng Cầm, Phường Bình An, Thành phố Dĩ An, tỉnh Bình Dương</Text>
                        </View>
                        <View style={styles.detailJob}>
                            <Image style={styles.iconDetail} source={require("../assets/icons/calendar.png")}></Image>
                            <Text style={styles.textIcon}>Ngày đăng: </Text>
                            <Text style={styles.textDes}>2/6/2023</Text>
                        </View>
                        <View style={styles.detailJob}>
                            <Image style={styles.iconDetail} source={require("../assets/icons/calendar.png")}></Image>
                            <Text style={styles.textIcon}>Mô tả công việc: </Text>
                        </View>
                        <Text style={styles.textDes2}>
                            - Môi trường làm việc quốc tế, chuyên nghiệp, sạch sẽ, lành mạnh, văn minh, nói không với tệ nạn xã hội. Đối tượng khách hàng là khách du lịch quốc tế và Việt Nam có mức
                            thu nhập khá.
                        </Text>
                        <View style={styles.detailJob}>
                            <Image style={styles.iconDetail} source={require("../assets/icons/calendar.png")}></Image>
                            <Text style={styles.textIcon}>Yêu cầu: </Text>
                        </View>
                        <Text style={styles.textDes2}>- Có tay nghề massage, ưu tiên những bạn có kinh nghiệm và có sẵn chứng chỉ massage. Nếu chưa biết nghề sẽ được đào tạo thêm.</Text>
                        <View style={styles.detailJob}>
                            <Image style={styles.iconDetail} source={require("../assets/icons/calendar.png")}></Image>
                            <Text style={styles.textIcon}>Liên hệ: </Text>
                            <Text style={[styles.textDes, { color: "red" }]}>069 797 3232 {"\n"}056 780 6910</Text>
                        </View>
                        <TouchableOpacity style={styles.confirm} onPress={() => navigation.navigate("CurriculumVitae")}>
                            <Text style={styles.TextConfirm}>Ứng tuyển công việc</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 200 }}></View>
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
        marginTop: 48,
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
});
