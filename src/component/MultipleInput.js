import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TagsInput } from "react-native-element-textinput";

import COLOR from "../COLOR/COLOR";

const MultipleInput = ({
  value,
  setValue,
  placeholder,
  extraStyle,
  extraInputStyle,
}) => {
  return (
    <View style={[styles.inputContainer, extraStyle]}>
      <TagsInput
        data={value}
        style={[styles.input, extraInputStyle]}
        inputStyle={styles.inputStyle}
        tagsStyle={styles.tagsStyle}
        tagsTextStyle={styles.tagsTextStyle}
        placeholder={placeholder ? placeholder : "#Tags"}
        placeholderTextColor="gray"
        onChangeValue={(tags) => {
          setValue(tags);
        }}
      />
    </View>
  );
};

export default MultipleInput;

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    padding: 4,
  },
  input: {
    width: "100%",
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: COLOR.white,
    borderRadius: 10,
    fontSize: 17,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  inputStyle: {
    fontSize: 16,
    minWidth: 140,
  },
  tagsStyle: {
    borderWidth: 0,
    borderRadius: 16,
    padding: 8,
    backgroundColor: COLOR.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  tagsTextStyle: {
    fontSize: 16,
  },
});
