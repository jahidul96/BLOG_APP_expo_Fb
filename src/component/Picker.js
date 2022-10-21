import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import COLOR from "../COLOR/COLOR";

const Picker = ({ data, onPress, categorie, pick, setPick, extraStyle }) => {
  //   console.log("data ==============>>>>>", data);

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          setPick(!pick);
        }}
      >
        <Text style={styles.groupname}>
          {categorie ? categorie : "select categories"}
        </Text>
        <AntDesign name="caretdown" />
      </TouchableOpacity>
      {pick ? (
        <View style={[styles.listWrapper, extraStyle]}>
          <View>
            {data.map((value, i) => (
              <TouchableOpacity key={i} onPress={() => onPress(value)}>
                <Text style={styles.text}>{value}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default Picker;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLOR.white,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  listWrapper: {
    position: "absolute",
    top: -100,
    left: 0,
    width: "100%",
    backgroundColor: COLOR.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 10,
    padding: 15,
    zIndex: 999,
  },
  groupname: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
  },
  text: {
    marginBottom: 10,
    fontFamily: "Poppins-Regular",
    fontSize: 16,
  },
  closeIcon: {
    position: "absolute",
    top: 0,
    right: 5,
  },
});
