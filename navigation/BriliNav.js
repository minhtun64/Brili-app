import { createStackNavigator } from "@react-navigation/stack";
import ChoiceScreen from "../screens/ChoiceScreen";
import SignInScreen from "../screens/SignInScreen";
import S_SignInScreen from "../screens/S_SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RecruitmentScreen from "../screens/RecruitmentScreen";
import CurriculumVitae from "../screens/CurriculumVitae";
import MarketingConsulting from "../screens/MarketingConsulting";
import PodcastScreen from "../screens/PodcastScreen";
import HelpScreen from "../screens/HelpScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { Image, StyleSheet, View } from "react-native";
import MyPodcastScreen from "../screens/MyPodcastScreen";
import FirstInfoScreen from "../screens/FirstInfoScreen";
import UploadPodcastScreen from "../screens/UploadPodcastScreen";
import MyPodcastScreen1 from "../screens/MyPodcastScreen1";
import S_WelcomeScreen from "../screens/S_WelcomeScreen";
import HelpSearch1Screen from "../screens/HelpSearch1Screen";
import HelpSearch2Screen from "../screens/HelpSearch2Screen";
import PodcastTopicScreen from "../screens/PodcastTopicScreen";
import ListenPodcastScreen from "../screens/ListenPodcastScreen";

import SignIn_Volunteer from "../screens/SignIn_Volunteer";
import Recruitment_Volunteer from "../screens/Recruitment_Volunteer";
import Confirm_Volunteer from "../screens/Confirm_Volunteer";
import UploadJob from "../screens/UploadJob";
import RecruitmentScreen_V from "../screens/RecruitmentScreen_V";
import PodcastScreen_V from "../screens/PodcastScreen_V";
import HelpScreenV from "../screens/HelpScreenV";
const Stack = createStackNavigator();
function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Choice" component={ChoiceScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="S_Welcome" component={S_WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
            <Stack.Screen name="S_SignIn" component={S_SignInScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
            <Stack.Screen name="FirstInfo" component={FirstInfoScreen} options={{ headerShown: false }} />
            <Stack.Screen name="HomeTabs" component={MyTabs} options={{ headerShown: false }} />
            <Stack.Screen name="HomeTabsVolunteer" component={MyTabsVolunteer} options={{ headerShown: false }} />
            <Stack.Screen name="HelpSearch1" component={HelpSearch1Screen} options={{ headerShown: false }} />
            <Stack.Screen name="HelpSearch2" component={HelpSearch2Screen} options={{ headerShown: false }} />

            {/* NTD và NTV */}
            <Stack.Screen name="SignInVolunteer" component={SignIn_Volunteer} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <StackNavigator></StackNavigator>
        </NavigationContainer>
    );
};

const RecruitmentStack = createStackNavigator();
function RecruitmentStackNavigator() {
    return (
        <RecruitmentStack.Navigator>
            <RecruitmentStack.Screen name="Recruitment" component={RecruitmentScreen} options={{ headerShown: false }} />
            <RecruitmentStack.Screen name="RecruitmentVolunteer" component={Recruitment_Volunteer} options={{ headerShown: false }} />
            <RecruitmentStack.Screen name="CurriculumVitae" component={CurriculumVitae} options={{ headerShown: false }} />
            <RecruitmentStack.Screen name="MarketingConsulting" component={MarketingConsulting} options={{ headerShown: false }} />
        </RecruitmentStack.Navigator>
    );
}

const PodcastStack = createStackNavigator();
function PodcastStackNavigator() {
    return (
        <PodcastStack.Navigator>
            <PodcastStack.Screen name="Podcast" component={PodcastScreen} options={{ headerShown: false }} />
            <PodcastStack.Screen name="MyPodcast" component={MyPodcastScreen} options={{ headerShown: false }} />
            <PodcastStack.Screen name="UploadPodcast" component={UploadPodcastScreen} options={{ headerShown: false }} />
            <PodcastStack.Screen name="MyPodcast1" component={MyPodcastScreen1} options={{ headerShown: false }} />
            <PodcastStack.Screen name="PodcastTopic" component={PodcastTopicScreen} options={{ headerShown: false }} />
            <PodcastStack.Screen name="ListenPodcast" component={ListenPodcastScreen} options={{ headerShown: false }} />
        </PodcastStack.Navigator>
    );
}

const HelpStack = createStackNavigator();
function HelpStackNavigator() {
    return (
        <HelpStack.Navigator>
            <HelpStack.Screen name="Help" component={HelpScreen} options={{ headerShown: false }} />
        </HelpStack.Navigator>
    );
}

const SettingsStack = createStackNavigator();
function SettingsStackNavigator() {
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
        </SettingsStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();
function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                //tabBarShowLabel: false,
                tabBarLabelStyle: [
                    {
                        fontSize: 12,
                        // marginBottom: 6,
                    },
                ],
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarStyle: [
                    {
                        display: "flex",
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        elevation: 0,
                        backgroundColor: "#ffffff",
                        borderRadius: 0,
                        height: 80,
                        ...styles.shadow,
                    },
                    null,
                ],
            }}
        >
            <Tab.Screen
                name="RecruitmentStack"
                component={RecruitmentStackNavigator}
                options={{
                    tabBarLabel: "Tuyển dụng",
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            {focused && <Image style={styles.tabIcon} resizeMode="contain" source={require("../assets/icons/recruitment-active.png")}></Image>}
                            {!focused && <Image style={styles.tabIcon} resizeMode="contain" source={require("../assets/icons/recruitment.png")}></Image>}
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="PodcastStack"
                component={PodcastStackNavigator}
                options={{
                    tabBarLabel: "Podcast",
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            {focused && <Image style={styles.tabIcon} resizeMode="contain" source={require("../assets/icons/podcast-active.png")}></Image>}
                            {!focused && <Image style={styles.tabIcon} resizeMode="contain" source={require("../assets/icons/podcast.png")}></Image>}
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="HelpStack"
                component={HelpStackNavigator}
                options={{
                    tabBarLabel: "Trợ giúp",
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            {focused && <Image style={styles.tabIcon} resizeMode="contain" source={require("../assets/icons/help-active.png")}></Image>}
                            {!focused && <Image style={styles.tabIcon} resizeMode="contain" source={require("../assets/icons/help.png")}></Image>}
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="SettingsStack"
                component={SettingsStackNavigator}
                options={{
                    tabBarLabel: "Cài đặt",
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            {focused && <Image style={styles.tabIcon} resizeMode="contain" source={require("../assets/icons/settings-active.png")}></Image>}
                            {!focused && <Image style={styles.tabIcon} resizeMode="contain" source={require("../assets/icons/settings.png")}></Image>}
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

{
    /* NTD và NTV */
}
const RecruitmentStack_V = createStackNavigator();
function RecruitmentStackNavigator_V() {
    return (
        <RecruitmentStack_V.Navigator>
            <RecruitmentStack_V.Screen name="RecruitmentVolunteer" component={Recruitment_Volunteer} options={{ headerShown: false }} />
            <RecruitmentStack_V.Screen name="UploadJob" component={UploadJob} options={{ headerShown: false }} />
            <RecruitmentStack_V.Screen name="ConfirmVolunteer" component={Confirm_Volunteer} options={{ headerShown: false }} />
            <RecruitmentStack_V.Screen name="RecruitmentScreenV" component={RecruitmentScreen_V} options={{ headerShown: false }} />
        </RecruitmentStack_V.Navigator>
    );
}

const SettingsStack_V = createStackNavigator();
function SettingsStackNavigator_V() {
    return (
        <SettingsStack_V.Navigator>
            <SettingsStack_V.Screen name="ConfirmVolunteer" component={Confirm_Volunteer} options={{ headerShown: false }} />
        </SettingsStack_V.Navigator>
    );
}

const PodcastStack_V = createStackNavigator();
function PodcastStackNavigator_V() {
    return (
        <PodcastStack_V.Navigator>
            <PodcastStack_V.Screen name="PodcastV" component={PodcastScreen_V} options={{ headerShown: false }} />
            <PodcastStack_V.Screen name="Podcast" component={PodcastScreen} options={{ headerShown: false }} />
            <PodcastStack_V.Screen name="MyPodcast" component={MyPodcastScreen} options={{ headerShown: false }} />
            <PodcastStack_V.Screen name="UploadPodcast" component={UploadPodcastScreen} options={{ headerShown: false }} />
            <PodcastStack_V.Screen name="MyPodcast1" component={MyPodcastScreen1} options={{ headerShown: false }} />
            <PodcastStack_V.Screen name="PodcastTopic" component={PodcastTopicScreen} options={{ headerShown: false }} />
            <PodcastStack_V.Screen name="ListenPodcast" component={ListenPodcastScreen} options={{ headerShown: false }} />
        </PodcastStack_V.Navigator>
    );
}

const HelpStack_V = createStackNavigator();
function HelpStackNavigator_V() {
    return (
        <HelpStack_V.Navigator>
            <HelpStack_V.Screen name="HelpV" component={HelpScreenV} options={{ headerShown: false }} />
        </HelpStack_V.Navigator>
    );
}
function MyTabsVolunteer() {
    return (
        <Tab.Navigator
            screenOptions={{
                //tabBarShowLabel: false,
                tabBarLabelStyle: [
                    {
                        fontSize: 12,
                        // marginBottom: 4,
                    },
                ],
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarStyle: [
                    {
                        display: "flex",
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        elevation: 0,
                        backgroundColor: "#ffffff",
                        borderRadius: 0,
                        height: 100,
                        ...styles.shadow,
                    },
                    null,
                ],
            }}
        >
            <Tab.Screen
                name="RecruitmentStack_V"
                component={RecruitmentStackNavigator_V}
                options={{
                    tabBarLabel: "Tuyển dụng",
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            {focused && <Image style={styles.tabIcon} resizeMode="contain" source={require("../assets/icons/recruitment-active.png")}></Image>}
                            {!focused && <Image style={styles.tabIcon} resizeMode="contain" source={require("../assets/icons/recruitment.png")}></Image>}
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="PodcastStack_V"
                component={PodcastStackNavigator_V}
                options={{
                    tabBarLabel: "Podcast",
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            {focused && <Image style={styles.tabIcon} resizeMode="contain" source={require("../assets/icons/podcast-active.png")}></Image>}
                            {!focused && <Image style={styles.tabIcon} resizeMode="contain" source={require("../assets/icons/podcast.png")}></Image>}
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="HelpStack_V"
                component={HelpStackNavigator_V}
                options={{
                    tabBarLabel: "Trợ giúp",
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            {focused && <Image style={styles.tabIcon} resizeMode="contain" source={require("../assets/icons/help-active.png")}></Image>}
                            {!focused && <Image style={styles.tabIcon} resizeMode="contain" source={require("../assets/icons/help.png")}></Image>}
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="SettingsStack_V"
                component={SettingsStackNavigator_V}
                options={{
                    tabBarLabel: "Cài đặt",
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            {focused && <Image style={styles.tabIcon} resizeMode="contain" source={require("../assets/icons/settings-active.png")}></Image>}
                            {!focused && <Image style={styles.tabIcon} resizeMode="contain" source={require("../assets/icons/settings.png")}></Image>}
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
{
    /* NTD và NTV */
}

export default MainNavigator;

const styles = StyleSheet.create({
    tabIcon: {
        width: 40,
        height: 40,
    },
});
