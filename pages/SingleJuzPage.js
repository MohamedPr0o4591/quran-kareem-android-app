import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getJuz } from "../redux/action/AllActions";
import bgImg from "../assets/title-surah-bg.png";
import { juzData } from "../data";
import * as Font from "expo-font";

export default function SingleJuzPage({ navigation, route }) {
  const getJuzAyahs = useSelector((state) => state.GET_AYAHS_JUZ.ayahs);
  const dispatch = useDispatch();

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Amiri-Bold": require("../assets/fonts/Amiri/Amiri-Bold.ttf"),
      });

      setFontsLoaded(true);
    }

    dispatch(getJuz(route.params.juzNumber));
    loadFonts();
  }, [route.params.juzNumber]);

  if (!fontsLoaded || !getJuzAyahs) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>جاري التحميل ...</Text>
      </View>
    );
  }

  return (
    <View style={styles.pageContainer}>
      <View style={styles.navigationHeader}>
        {route.params.juzNumber !== 1 ? (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SingleJuz", {
                juzNumber:
                  juzData.find((juz) => juz.id === route.params.juzNumber).id -
                  1,
              })
            }
          >
            <Text style={styles.navigationText}>السابق</Text>
          </TouchableOpacity>
        ) : (
          <View></View>
        )}

        <Text style={styles.currentJuzText}>
          {juzData.find((juz) => juz.id === route.params.juzNumber).juz}
        </Text>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("SingleJuz", {
              juzNumber:
                juzData.find((juz) => juz.id === route.params.juzNumber).id + 1,
            })
          }
        >
          <Text style={styles.navigationText}>التالي</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.ayahsListContainer}>
          {getJuzAyahs?.ayahs?.map((ayah, index) => (
            <View key={index}>
              {ayah.surah.name !== getJuzAyahs.ayahs[index - 1]?.surah.name ? (
                <View style={styles.surahHeaderContainer}>
                  <Image source={bgImg} style={styles.surahHeaderImage} />
                  <Text style={styles.surahTitle}>{ayah.surah.name}</Text>
                </View>
              ) : null}

              <TouchableOpacity style={styles.ayahItemContainer}>
                <Text style={styles.ayahText}>{ayah.text}</Text>
                <View style={styles.ayahNumberWrapper}>
                  <Text style={styles.ayahNumberText}>
                    {ayah.numberInSurah}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: "#F4E3C1",
  },
  navigationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  navigationText: {
    fontFamily: "Amiri-Bold",
  },
  currentJuzText: {
    fontFamily: "Amiri-Bold",
    fontSize: 18,
    color: "#333",
  },
  surahHeaderContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  surahHeaderImage: {
    width: "100%",
    objectFit: "contain",
  },
  surahTitle: {
    position: "absolute",
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  ayahsListContainer: {
    marginTop: 20,
  },
  ayahItemContainer: {
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
  ayahText: {
    flex: 1,
    fontSize: 18,
    textAlign: "left",
    lineHeight: 50,
    fontFamily: "Amiri-Bold",
    color: "#333",
  },
  ayahNumberWrapper: {
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
  ayahNumberText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
});
