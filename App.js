import { StatusBar } from "expo-status-bar";
import { I18nManager, StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./redux/store/Store";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
import { useEffect } from "react";
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    activateKeepAwakeAsync();

    return (_) => deactivateKeepAwake();
  }, []);

  return (
    <Provider store={store}>
      <StatusBar hidden={true} />

      <NavigationContainer theme={myTheme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Tabs" component={Tabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const myTheme = {
  dark: false,
  colors: {
    background: "#F4E3C1",
  },
};
