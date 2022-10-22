import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { ButtonComp, Input } from "./Reuse/Reuse";
import COLOR from "../COLOR/COLOR";
import { useNavigation } from "@react-navigation/native";

const data = [
  "Sport",
  "News",
  "Entetainment",
  "Tech",
  "Pogramming",

  "Political",
  "Other's",
];

const SearchComp = () => {
  const [categorie, setCategorie] = useState("");
  const [selectedCategorie, setSelectedCategorie] = useState("");
  const navigation = useNavigation();

  const searchBtn = () => {
    if (!categorie) {
      return Alert.alert("MUST SEARCH BY A CATEGORIE!");
    }
    navigation.navigate("SearchedBlog", { value: categorie });
  };
  const SelectAndSearch = (val) => {
    if (!val) {
      return Alert.alert("MUST SELECT A CATEGORIE!");
    }
    navigation.navigate("SearchedBlog", { value: val });
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Search by categorie..."
          extraStyle={styles.extraInputStyle}
          setValue={setCategorie}
        />
        <ButtonComp
          text="Search"
          extraStyle={styles.extraBtnStyle}
          onPress={searchBtn}
        />
      </View>

      <View style={styles.tagMainContainer}>
        {data.map((tag, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tagContainer}
            onPress={() => SelectAndSearch(tag)}
          >
            <Text style={styles.tagText}>{tag}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default SearchComp;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  extraInputStyle: {
    width: "65%",
    height: 40,
    borderRadius: 8,
  },
  extraBtnStyle: {
    width: "30%",
    height: 40,
    borderRadius: 8,
  },
  tagMainContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  tagContainer: {
    backgroundColor: COLOR.gray,
    marginRight: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  tagText: {
    fontFamily: "Poppins-Regular",
  },
});
