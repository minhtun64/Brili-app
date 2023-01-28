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

export default function CurriculumVitae({ navigation }) {
    return (
        <View>
            <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                <Image style={styles.backIcon} source={require("../assets/icons/back.png")}></Image>
            </TouchableOpacity>
            <Text style={styles.title}>Hồ sơ ứng tuyển</Text>
            <Text style={styles.NameTitle}>Họ tên</Text>
            <TextInput placeholder="Võ Thanh Phương"></TextInput>
        </View>
    );
}

const styles = StyleSheet.create({
    back: {
        width: 36,
    },
    backIcon: {
        width: 36,
        height: 36,
        marginTop: 52,
    },
    title: {
        marginTop: -36,
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
});
