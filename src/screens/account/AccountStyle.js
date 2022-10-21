import { StyleSheet } from "react-native";
import COLOR from "../../COLOR/COLOR";

export const accountStyles = StyleSheet.create({
  contentWrapper: {
    paddingHorizontal: 20,
  },
  profileImageWrapper: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 25,
    borderBottomColor: COLOR.lightGray,
    borderBottomWidth: 1,
  },
  profileContainer: {
    paddingTop: 15,
  },
  name: {
    fontSize: 17,
    fontFamily: "Poppins-Regular",
    letterSpacing: 1,
  },
  email: {
    marginTop: 3,
    letterSpacing: 1,
    color: COLOR.darkGray,
  },
  text: {
    fontFamily: "Poppins-Regular",
    fontSize: 17,
    marginBottom: 7,
  },
  imgStyle: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginBottom: 10,
    marginTop: 10,
  },
  btnContainer: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    borderBottomColor: COLOR.lightGray,
    borderBottomWidth: 1,
  },

  imageModel: {
    position: "absolute",
    top: "40%",
    left: "10%",
    width: "80%",
    zIndex: 15,
    backgroundColor: COLOR.white,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 200,
  },
  selectedImgStyle: {
    width: 70,
    height: 70,
    borderRadius: 100,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: COLOR.lightBlue,
  },
});
