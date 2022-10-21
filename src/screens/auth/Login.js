import { Alert, Image, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { authStyles } from "./authStyles";
import { AuthContext } from "../../../context/Context";
import {
  ButtonComp,
  Input,
  LinkTextComp,
  LoadingComp,
} from "../../component/Reuse/Reuse";
import COLOR from "../../COLOR/COLOR";
import { signinWithFb } from "../../../firebase/fbAuth/fbAuth";

const img =
  "https://cdn2.iconfinder.com/data/icons/aami-web-internet/64/aami4-02-512.png";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const login = () => {
    const fileds = [email, password];
    const required = fileds.every(Boolean);
    if (!required) {
      return Alert.alert("FILL ALL THE FIELD");
    }
    setLoading(true);

    signinWithFb(email, password)
      .then(() => {
        setLoading(false);
        navigation.navigate("Home");
      })
      .catch((err) => {
        Alert.alert("SOMETHING WENT WRONG!");
        setLoading(false);
        console.log(err.message);
      });
  };
  return (
    <View style={authStyles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLOR.orangeRed} />
      {loading && (
        <LoadingComp
          text="LOGINGIN..."
          loadercolor={COLOR.lightBlue}
          textColor={COLOR.lightBlue}
          extraLoadderStyle={authStyles.extraLoadderStyle}
        />
      )}
      <View style={authStyles.imgContainer}>
        <Image source={{ uri: img }} style={authStyles.imgStyle} />
      </View>
      <Input placeholder="Email" setValue={setEmail} />
      <Input placeholder="Password" setValue={setPassword} secureTextEntry />
      {loading ? null : <ButtonComp text="LOGIN" onPress={login} />}
      <LinkTextComp
        text="Forgot Password ?"
        pageNavigation={() => navigation.navigate("ResetPassword")}
        textClick
      />
      <LinkTextComp
        text="Don't Have An Account ?"
        linkText="SIGNIN"
        pageNavigation={() => navigation.navigate("Register")}
        extraStyle={{ marginTop: 15 }}
      />
    </View>
  );
};

export default Login;
