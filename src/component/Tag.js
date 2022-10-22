import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import COLOR from "../COLOR/COLOR";

export const Tag = ({ tags, onPress }) => (
  <View style={styles.tagContainer}>
    {tags.map((tag, i) => (
      <TouchableOpacity
        key={i}
        style={styles.tagItem}
        onPress={() => onPress(tag)}
      >
        <Text style={[styles.tabitemText, styles.tagText]}>{tag}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  tagItem: {
    backgroundColor: COLOR.lightGray,
    marginRight: 8,
    paddingHorizontal: 8,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  tagText: { color: COLOR.darkGray, marginTop: 4, fontSize: 12 },
  tabitemText: {
    marginBottom: 5,
    fontFamily: "Poppins-Regular",
  },
});
