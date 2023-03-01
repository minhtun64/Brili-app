import {
    Text,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
} from "react-native";
import React from "react";
import Modal from "react-native-modal";
import * as WebBrowser from 'expo-web-browser';

export default function LinktoSpotify({ navigation }) {
    handlePressButtonAsync = () => {
        WebBrowser.openBrowserAsync('https://open.spotify.com/playlist/37i9dQZF1DX4g8Gs5nUhpp?si=DoxI1lkSQxuZlnHgqaIeqg');
    };

    return(
        <Modal isVisible={true}>
            <View style={styles.popup}>
                <View>
                    <Image
                        style={styles.icon}
                        source={require("../assets/icons/spotify-logo.png")}
                    ></Image>
                    <Text style={styles.TextConfirm2}>Nghe podcast trên Spotify?</Text>
                </View>
                <View style={styles.btnConfirm}>
                    <TouchableOpacity style={styles.cancle} onPress={() => navigation.navigate("ListenToPodcast")}>
                        <Text style={styles.textcancle}>Hủy</Text>
                    </TouchableOpacity>
                    <View style={styles.line2}></View>
                    <TouchableOpacity style={styles.send} onPress={handlePressButtonAsync}>
                        <Text style={styles.textsend}>Xác nhận</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
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
    icon: {
        width: 120,
        height: 36,
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 12,
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