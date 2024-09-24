import React, { Component, useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { juzData } from "../data";
import * as Font from "expo-font";
import { TouchableOpacity } from "react-native";

export default function JuzPage({ navigation }) {
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        "ReemKufi-Bold": require("../assets/fonts/ReemKufi-Bold.ttf"),
      });

      setIsFontLoaded(true);
    }

    loadFont();
  }, []);

  if (!isFontLoaded) {
    return null;
  }

  return (
    <FlatList
      data={juzData}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.juzItem}
          onPress={(_) =>
            navigation.navigate("SingleJuz", { juzNumber: item.id })
          }
        >
          <Text style={styles.juzText}>{item.juz}</Text>

          <Text style={styles.positionText}>{item.id}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
      numColumns={3}
      columnWrapperStyle={styles.row}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 15,
  },
  juzItem: {
    position: "relative",
    width: "30%",
    aspectRatio: 1,
    padding: 10,
    backgroundColor: "#F4E3C1",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  positionText: {
    position: "absolute",
    top: 0,
    right: 10,
    fontSize: 40,
    color: "#3498db",
    fontFamily: "ReemKufi-Bold",
    opacity: 0.2,
  },
  juzText: {
    fontSize: 18,
    color: "#3498db",
    fontFamily: "ReemKufi-Bold",
  },
});
