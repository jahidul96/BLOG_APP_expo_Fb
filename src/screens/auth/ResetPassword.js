import {
  Alert,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Fontisto from "react-native-vector-icons/Fontisto";
import { authStyles } from "./authStyles";
import {
  ButtonComp,
  Input,
  LinkTextComp,
  LoadingComp,
} from "../../component/Reuse/Reuse";
import COLOR from "../../COLOR/COLOR";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase/firebase";

const img =
  "https://cdn2.iconfinder.com/data/icons/aami-web-internet/64/aami4-02-512.png";

const ResetPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const resetPassword = () => {
    setLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setLoading(false);
        Alert.alert("CHECK YOUR MAIL BOX! TO RESET PASSWORD!");
        navigation.goBack();
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert("SOMETHING WENT WRONG!");
        navigation.goBack();
        // ..
      });
  };
  return (
    <View style={authStyles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLOR.orangeRed} />
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Fontisto name="arrow-left-l" size={24} />
      </TouchableOpacity>
      {loading && (
        <LoadingComp
          text="RESETING PASSWORD..."
          loadercolor={COLOR.lightBlue}
          textColor={COLOR.lightBlue}
          extraLoadderStyle={authStyles.extraLoadderStyle}
        />
      )}
      <View style={authStyles.imgContainer}>
        <Image source={{ uri: img }} style={authStyles.imgStyle} />
      </View>
      <Input placeholder="Email" setValue={setEmail} />
      {loading ? null : (
        <ButtonComp text="RESET_PASSWORD" onPress={resetPassword} />
      )}
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  backBtn: {
    position: "absolute",
    top: 30,
    left: 20,
    width: 80,
    height: 33,
    backgroundColor: COLOR.white,
    borderRadius: 10,
    justifyContent: "center",
    paddingLeft: 15,
  },
  backText: {
    fontFamily: "Poppins-Regular",
  },
});
