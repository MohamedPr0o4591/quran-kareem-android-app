import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import { useDispatch, useSelector } from "react-redux";
import { getAllData } from "../redux/action/AllActions";
import { TouchableOpacity } from "react-native";

export default function SurahListPage({ navigation }) {
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const allData = useSelector((state) => state.GET_ALL_QURAN.quran);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fontLoad() {
      await Font.loadAsync({
        "ReemKuli-Medium": require("../assets/fonts/ReemKufi-Medium.ttf"),
      });

      setIsFontLoaded(true);
    }

    fontLoad();
    dispatch(getAllData());
  }, []);

  if (!isFontLoaded) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>السلام عليكم ورحمة الله وبركاته</Text>

      <Text style={styles.subHeader}>قائمة سور القرآن الكريم كاملاً</Text>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.tableHeader]}>م</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>العدد</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>عدد السور</Text>
          <Text
            style={[
              styles.tableCell,
              { fontFamily: "ReemKuli-Medium", color: "#3498db" },
            ]}
          >
            {allData.surahs.count.toLocaleString("ar-EG")}
          </Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>عدد الأيات</Text>
          <Text
            style={[
              styles.tableCell,
              { fontFamily: "ReemKuli-Medium", color: "#3498db" },
            ]}
          >
            {allData.ayahs.count.toLocaleString("ar-EG")}
          </Text>
        </View>
      </View>

      <View style={[styles.table, { marginTop: 20 }]}>
        <View style={styles.tableRow}>
          <Text
            style={[styles.tableCell, styles.tableHeader, styles.numberCell]}
          >
            م
          </Text>
          <Text style={[styles.tableCell, styles.tableHeader, styles.nameCell]}>
            اسم السورة
          </Text>
          <Text style={[styles.tableCell, styles.tableHeader, styles.typeCell]}>
            النوع
          </Text>
        </View>
        {allData.surahs.references.map((surah) => (
          <TouchableOpacity
            key={surah.number}
            style={styles.tableRow}
            onPress={() =>
              navigation.navigate("SingleSurah", { surahNumber: surah.number })
            }
          >
            <Text style={[styles.tableCell, styles.numberCell]}>
              {surah.number}
            </Text>
            <Text style={[styles.tableCell, styles.nameCell]}>
              {surah.name}
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.typeCell,
                {
                  color:
                    surah.revelationType === "Meccan" ? "#3498db" : "#2ecc71",
                },
              ]}
            >
              {surah.revelationType === "Meccan" ? "مكية" : "مدنية"}
            </Text>
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
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subHeader: {
    fontFamily: "ReemKuli-Medium",
    fontSize: 18,
    textAlign: "left",
    marginBottom: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },

  tableCell: {
    flex: 1,
    padding: 10,
    textAlign: "center",
  },
  tableHeader: {
    fontWeight: "bold",
    backgroundColor: "#F0E3C9",
  },
  numberCell: {
    fontFamily: "ReemKuli-Medium",
    flex: 0.2,
  },
  nameCell: {
    flex: 0.6,
    color: "#3498db",
  },
  typeCell: {
    flex: 0.2,
    fontFamily: "ReemKuli-Medium",
  },
});
