import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import SurahListPage from "../pages/SurahListPage";
import SingleSurah from "../pages/SingleSurah";

const Stack = createStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="SurahList"
    >
      <Stack.Screen name="SurahList" component={SurahListPage} />

      <Stack.Screen name="SingleSurah" component={SingleSurah} />
    </Stack.Navigator>
  );
}
