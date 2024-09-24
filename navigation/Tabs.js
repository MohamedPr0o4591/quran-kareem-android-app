import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";
import HomeNavigation from "./HomeNavigation";
import Icon from "react-native-vector-icons/FontAwesome6";
import JuzNavigator from "./JuzNavigator";
import * as Font from "expo-font";
import { useNavigation } from "@react-navigation/native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";

const Tab = createBottomTabNavigator();

const AnimatedTabLabel = ({ focused, children }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: focused ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.Text
      style={[
        styles.tabBarLabel,
        {
          opacity: fadeAnim,
          color: focused ? "#D4aF37" : "#fff",
        },
      ]}
    >
      {children}
    </Animated.Text>
  );
};

export default function Tabs() {
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const navigation = useNavigation();

  const onGestureEvent = (e) => {
    const { translationX } = e.nativeEvent;

    if (translationX > 50) {
      navigation.navigate("Juz-Navigator");
    } else navigation.navigate("Home-Navigator");
  };

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "ReemKufi-Medium": require("../assets/fonts/ReemKufi-Medium.ttf"),
      });

      setIsFontLoaded(true);
    }

    loadFonts();
  }, []);

  if (!isFontLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>جاري التحميل ...</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        activeOffsetX={[-20, 20]}
      >
        <View style={{ flex: 1 }}>
          <Tab.Navigator
            initialRouteName="Home-Navigator"
            screenOptions={{
              tabBarStyle: {
                backgroundColor: "#4A3B32",
                width: 90 + "%",
                borderRadius: 15,
                marginVertical: 10,
                height: 60,
                margin: "auto",
              },
              tabBarHideOnKeyboard: true,
              tabBarAnimation: "fade",
            }}
          >
            <Tab.Screen
              name="Home-Navigator"
              component={HomeNavigation}
              options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => {
                  return (
                    <Image
                      source={require("../assets/logo/quran.png")}
                      style={[
                        styles.tabIcon,
                        {
                          tintColor: focused ? "#D4AF37" : "#fff",
                        },
                      ]}
                    />
                  );
                },
                tabBarLabel: ({ focused }) => {
                  return focused ? (
                    <AnimatedTabLabel focused={focused}>
                      القرآن
                    </AnimatedTabLabel>
                  ) : null;
                },
              }}
            />

            <Tab.Screen
              name="Juz-Navigator"
              component={JuzNavigator}
              options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => {
                  return (
                    <Image
                      source={require("../assets/logo/juz.png")}
                      style={[
                        styles.tabIcon,
                        {
                          tintColor: focused ? "#D4AF37" : "#fff",
                        },
                      ]}
                    />
                  );
                },
                tabBarLabel: ({ focused }) => {
                  return focused ? (
                    <AnimatedTabLabel focused={focused}>الجزء</AnimatedTabLabel>
                  ) : null;
                },
              }}
            />
          </Tab.Navigator>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  tabBarLabel: {
    fontFamily: "ReemKufi-Medium",
    fontSize: 14,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  tabIcon: {
    width: 35,
    height: 35,
  },
});
