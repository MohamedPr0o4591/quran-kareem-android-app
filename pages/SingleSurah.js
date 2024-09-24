import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getSurah } from "../redux/action/AllActions";
import bgImg from "../assets/title-surah-bg.png";
import * as Font from "expo-font";
import { TouchableOpacity } from "react-native";

export default function SingleSurah() {
  const route = useRoute();
  const { surahNumber } = route.params;

  const surahInfo = useSelector((state) => state.GET_SURAH.surah);
  const dispatch = useDispatch();

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Amiri-Bold": require("../assets/fonts/Amiri/Amiri-Bold.ttf"),
      });

      setFontsLoaded(true);
    }

    loadFonts();
    dispatch(getSurah(surahNumber));
  }, []);

  if (!fontsLoaded || !surahInfo) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>جاري التحميل ...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={bgImg} style={styles.image} />
        <Text style={styles.surahName}>{surahInfo?.name}</Text>
      </View>

      <View style={styles.ayahsContainer}>
        {surahInfo?.ayahs?.map((ayah, index) => (
          <TouchableOpacity key={index} style={styles.ayahContainer}>
            <Text style={styles.ayah}>{ayah.text}</Text>
            <View style={styles.ayahNumberContainer}>
              <Text style={styles.ayahNumber}>{ayah.numberInSurah}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: "#F4E3C1",
  },
  imageContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    objectFit: "contain",
  },
  surahName: {
    position: "absolute",
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  ayahsContainer: {
    marginTop: 20,
  },
  ayahContainer: {
    width: "95%",
    margin: "auto",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#F4E3C1",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  ayah: {
    flex: 1,
    fontSize: 18,
    textAlign: "left",
    lineHeight: 50,
    fontFamily: "Amiri-Bold",
    color: "#333",
  },
  ayahNumberContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: "brown",
  },
  ayahNumber: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
});
