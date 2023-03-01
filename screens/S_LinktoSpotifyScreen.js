import {
    Text,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
} from "react-native";
import React from 'react';
import Modal from "react-native-modal";
import * as WebBrowser from 'expo-web-browser';
import { Audio } from "expo-av";

export default function S_LinktoSpotify({ navigation }) {
    const [sound, setSound] = React.useState();
    const [backCount, setBackCount] = React.useState(0);
    const [playing, setPlaying] = React.useState(false);

    async function playSound() {
        console.log("Loading Sound");
        const { sound } = await Audio.Sound.createAsync(
        require("../assets/podcasts/ask-to-link-to-spotify.mp3")
        );
        setSound(sound);
        setPlaying(true);
        console.log("Playing Sound");
        await sound.playAsync();
        setTimeout(() => {
        setPlaying(false);
        }, 7000);
    }

    React.useEffect(() => {
        return sound
        ? () => {
            console.log("Unloading Sound");
            sound.unloadAsync();
            }
        : undefined;
    }, [sound]);

    const handlePressButtonAsync = () => {
        WebBrowser.openBrowserAsync('https://open.spotify.com/playlist/0naHKAskYM3F1AbDwrqmw6?si=40bdf328c2b2480f');
    };

    return(        
        <TouchableOpacity
            onLongPress={() => {
                sound.unloadAsync();
                setTimeout(() => {
                setBackCount(0);
                }, 500);
                navigation.navigate("ListenToPodcast");
            }}
            onPress={() => {
                setBackCount(backCount + 1);
                if (backCount == 1) {
                    sound.unloadAsync();
                    handlePressButtonAsync();
                } 
                else {
                    setTimeout(() => {
                    setBackCount(0);
                    }, 500);
                    console.log(backCount);
                    playSound();
                }
            }}
        >
            <View style={styles.container}>            
                <View style={styles.popup}>
                    <View>
                        <Image
                            style={styles.logo}
                            source={require("../assets/icons/spotify-logo.png")}
                            onLoad={playSound}
                        ></Image>
                        <Text style={styles.TextConfirm2}>Nghe podcast trên Spotify?</Text>
                    </View>
                    <View style={styles.btnConfirm}>
                        <TouchableOpacity style={styles.cancle}>
                            <Text style={styles.textcancle}>Hủy</Text>
                        </TouchableOpacity>
                        <View style={styles.line2}></View>
                        <TouchableOpacity style={styles.send}>
                            <Text style={styles.textsend}>Xác nhận</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {playing ? (
                    <Image
                    style={styles.icon}
                    source={require("../assets/images/voice.gif")}
                    ></Image>
                ) : (
                    <Image
                    style={styles.icon}
                    source={require("../assets/images/voice-stop.png")}
                    ></Image>
                )}                    
            </View>                     
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#DCDCDC",
        height: "100%",
    },
    popup: {
        width: 350,
        height: 200,
        backgroundColor: "#ffffff",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 240,
        borderRadius: 20,
        padding: 20,
        justifyContent: "center",
    },
    logo: {
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
    icon: {
        height: 60,
        width: 60,
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "100%",
        marginTop: 480,
        marginTop: 32,
    },
});