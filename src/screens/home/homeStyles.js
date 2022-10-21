import { StyleSheet } from "react-native";
import { Height, Width } from "../../../utils/Dimensions";
import COLOR from "../../COLOR/COLOR";

export const homeStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  profileWrapper: {
    height: 65,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: COLOR.gray,
    borderBottomWidth: 1,
  },

  contentWrapper: {
    flex: 1,
  },
  extraLoadderStyle: {
    justifyContent: "center",
  },
});
