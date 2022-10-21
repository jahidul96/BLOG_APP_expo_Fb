import { StyleSheet } from "react-native";
import COLOR from "../../COLOR/COLOR";

export const authStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLOR.orangeRed,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  imgContainer: {
    width: "100%",
    height: 100,
    alignItems: "center",
    marginBottom: 25,
  },
  imgStyle: {
    width: 120,
    height: "100%",
  },
  labelText: {
    color: COLOR.white,
    fontFamily: "Poppins-Light",
    marginLeft: 4,
    fontSize: 12,
  },
  extraLoadderStyle: {
    justifyContent: "flex-end",
    paddingBottom: 130,
  },
});
