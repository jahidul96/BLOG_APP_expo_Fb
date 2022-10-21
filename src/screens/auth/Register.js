import {
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
  StatusBar,
} from "react-native";
import React, { useContext, useState } from "react";
import { authStyles } from "./authStyles";
import {
  ButtonComp,
  Input,
  LinkTextComp,
  LoadingComp,
} from "../../component/Reuse/Reuse";
import Picker from "../../component/Picker";
import { fbUserRegister } from "../../../firebase/fbAuth/fbAuth";
import { addUserToFB } from "../../../firebase/fbFirestore/fbFirestore";
import { AuthContext } from "../../../context/Context";
import COLOR from "../../COLOR/COLOR";

const img =
  "https://cdn2.iconfinder.com/data/icons/aami-web-internet/64/aami4-02-512.png";

const data = [
  "Sport",
  "News",
  "Entetainment",
  "Pogramming",
  "Tech",
  "Political",
  "Other's",
];

const Register = ({ navigation }) => {
  const [toggle, setToggle] = useState(false);
  const [categorie, setCategorie] = useState("");
  const [pick, setPick] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const fileds = [username, email, password];

  const nextFunc = () => {
    const required = fileds.every(Boolean);
    if (!required) {
      return Alert.alert("FILL ALL THE FIELD");
    }
    setToggle(true);
  };

  const selectCategories = (value) => {
    setCategorie(value);
    setPick(!pick);
  };

  const submit = () => {
    const allField = [...fileds, categorie];
    const required = allField.every(Boolean);
    if (!required) {
      return Alert.alert("FILL ALL THE FIELD");
    }
    setLoading(true);

    let userInfo = {
      email,
      username,
      categorie,
      profileImg: "",
    };

    fbUserRegister(email, password)
      .then((info) => {
        const { uid } = info.user;
        userInfo.uid = uid;
        addUserToFB(userInfo, uid)
          .then(() => {
            setAuthUser(info);
            setLoading(false);
            navigation.navigate("Home");
          })
          .catch((err) => {
            throw err;
          });
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
      {toggle ? (
        <>
          {loading && (
            <LoadingComp
              text="SINGINGIN..."
              loadercolor={COLOR.lightBlue}
              textColor={COLOR.lightBlue}
              extraLoadderStyle={authStyles.extraLoadderStyle}
            />
          )}
          <View>
            <View>
              <Text style={authStyles.labelText}>
                Select which categories content you like to see most of the
                time!
              </Text>
              <Picker
                data={data}
                categorie={categorie}
                onPress={selectCategories}
                pick={pick}
                setPick={setPick}
              />
            </View>

            <View style={{ marginTop: 15 }}>
              {loading ? null : (
                <ButtonComp
                  text="SUBMIT"
                  extraStyle={{ borderRadius: 10 }}
                  onPress={submit}
                />
              )}
              <LinkTextComp
                linkText="Back"
                pageNavigation={() => setToggle(!toggle)}
              />
            </View>
          </View>
        </>
      ) : (
        <>
          <View style={authStyles.imgContainer}>
            <Image source={{ uri: img }} style={authStyles.imgStyle} />
          </View>
          <Input placeholder="Username" setValue={setUsername} />
          <Input placeholder="Email" setValue={setEmail} />
          <Input
            placeholder="Password"
            setValue={setPassword}
            secureTextEntry
          />
          <ButtonComp text="NEXT" onPress={nextFunc} />
          <LinkTextComp
            text="Have An Account ?"
            linkText="LOGIN"
            pageNavigation={() => navigation.navigate("Login")}
          />
        </>
      )}
    </View>
  );
};

export default Register;
