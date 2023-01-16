import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RecruitmentScreen from "../screens/RecruitmentScreen";
import PodcastScreen from "../screens/PodcastScreen";
import HelpScreen from "../screens/HelpScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { Image, StyleSheet, View } from "react-native";
import MyPodcastScreen from "../screens/MyPodcastScreen";
import FirstInfoScreen from "../screens/FirstInfoScreen";

const Stack = createStackNavigator();
function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FirstInfo"
        component={FirstInfoScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeTabs"
        component={MyTabs}
        options={{ headerShown: false }}
      />
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
      <RecruitmentStack.Screen
        name="Recruitment"
        component={RecruitmentScreen}
        options={{ headerShown: false }}
      />
    </RecruitmentStack.Navigator>
  );
}

const PodcastStack = createStackNavigator();
function PodcastStackNavigator() {
  return (
    <PodcastStack.Navigator>
      <PodcastStack.Screen
        name="Podcast"
        component={PodcastScreen}
        options={{ headerShown: false }}
      />
      <PodcastStack.Screen
        name="MyPodcast"
        component={MyPodcastScreen}
        options={{ headerShown: false }}
      />
    </PodcastStack.Navigator>
  );
}

const HelpStack = createStackNavigator();
function HelpStackNavigator() {
  return (
    <HelpStack.Navigator>
      <HelpStack.Screen
        name="Help"
        component={HelpScreen}
        options={{ headerShown: false }}
      />
    </HelpStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();
function SettingsStackNavigator() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
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
        name="RecruitmentStack"
        component={RecruitmentStackNavigator}
        options={{
          tabBarLabel: "Tuyển dụng",
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              {focused && (
                <Image
                  style={styles.tabIcon}
                  resizeMode="contain"
                  source={require("../assets/icons/recruitment-active.png")}
                ></Image>
              )}
              {!focused && (
                <Image
                  style={styles.tabIcon}
                  resizeMode="contain"
                  source={require("../assets/icons/recruitment.png")}
                ></Image>
              )}
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
              {focused && (
                <Image
                  style={styles.tabIcon}
                  resizeMode="contain"
                  source={require("../assets/icons/podcast-active.png")}
                ></Image>
              )}
              {!focused && (
                <Image
                  style={styles.tabIcon}
                  resizeMode="contain"
                  source={require("../assets/icons/podcast.png")}
                ></Image>
              )}
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
              {focused && (
                <Image
                  style={styles.tabIcon}
                  resizeMode="contain"
                  source={require("../assets/icons/help-active.png")}
                ></Image>
              )}
              {!focused && (
                <Image
                  style={styles.tabIcon}
                  resizeMode="contain"
                  source={require("../assets/icons/help.png")}
                ></Image>
              )}
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
              {focused && (
                <Image
                  style={styles.tabIcon}
                  resizeMode="contain"
                  source={require("../assets/icons/settings-active.png")}
                ></Image>
              )}
              {!focused && (
                <Image
                  style={styles.tabIcon}
                  resizeMode="contain"
                  source={require("../assets/icons/settings.png")}
                ></Image>
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainNavigator;

const styles = StyleSheet.create({
  tabIcon: {
    width: 40,
    height: 40,
  },
});
