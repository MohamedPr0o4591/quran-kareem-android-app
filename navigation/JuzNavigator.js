import { createStackNavigator } from "@react-navigation/stack";
import React, { Component } from "react";
import JuzPage from "../pages/JuzPage";
import SingleJuzPage from "../pages/SingleJuzPage";

const Stack = createStackNavigator();

export default function JuzNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Juz"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Juz" component={JuzPage} />

      <Stack.Screen name="SingleJuz" component={SingleJuzPage} />
    </Stack.Navigator>
  );
}
