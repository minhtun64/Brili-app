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

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        //tabBarShowLabel: false,
        tabBarLabelStyle: [
          {
            fontSize: 12,
            marginBottom: 4,
          },
        ],

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
            height: 70,
            ...styles.shadow,
          },
          null,
        ],
      }}
    >
      <Tab.Screen
        name="Tuyển dụng"
        component={RecruitmentScreen}
        options={{
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
        name="Podcast"
        component={PodcastScreen}
        options={{
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
        name="Trợ giúp"
        component={HelpScreen}
        options={{
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
        name="Cài đặt"
        component={SettingsScreen}
        options={{
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

export default MainNavigator;

const styles = StyleSheet.create({
  tabIcon: {
    width: 40,
    height: 40,
  },
});
