import { StyleSheet } from "react-native";
import { Height, Width } from "../../../utils/Dimensions";
import COLOR from "../../COLOR/COLOR";

export const reuseStyles = StyleSheet.create({
  loadingContainer: {
    position: "absolute",
    width: Width,
    height: Height,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 999,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    width: "100%",
    height: 50,
    backgroundColor: COLOR.yellow,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  btnText: {
    color: COLOR.white,
    fontFamily: "Poppins-Bold",
    fontSize: 16,
  },

  inputStyle: {
    width: "100%",
    height: 50,
    borderRadius: 20,
    fontSize: 15,
    paddingHorizontal: 10,
    backgroundColor: COLOR.white,
    marginBottom: 10,
    fontFamily: "Poppins-Regular",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  linkTextWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  text: {
    fontFamily: "Poppins-Regular",
    color: COLOR.white,
    fontSize: 15,
  },
  linkText: {
    marginLeft: 10,
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: COLOR.white,
    letterSpacing: 1,
    borderBottomColor: COLOR.white,
    borderBottomWidth: 1,
    height: 25,
    marginTop: -2,
  },

  AppBarStyle: {
    height: 50,
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  AppBarText: {
    marginLeft: 25,
    fontFamily: "Poppins-Regular",
    fontSize: 18,
  },
  NormalBtn: {
    marginBottom: 10,
  },
  NormalBtnText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: COLOR.lightBlue,
  },

  HomeSearchProfileContainer: {
    width: "100%",
    backgroundColor: COLOR.gray,
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
