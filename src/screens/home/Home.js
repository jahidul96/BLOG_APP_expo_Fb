import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../../../firebase/firebase";
import { SafeAreaView } from "react-native-safe-area-context";
import { homeStyles } from "./homeStyles";
import Tab from "../../component/Tab";
import COLOR from "../../COLOR/COLOR";
import ProfileComponent from "../../component/ProfileComponent";
import Feather from "react-native-vector-icons/Feather";
import {
  getAllBlogs,
  getCurrentUser,
} from "../../../firebase/fbFirestore/fbFirestore";
import Context from "../../../context/Context";
import { LoadingComp } from "../../component/Reuse/Reuse";

const Home = ({ navigation }) => {
  const { loggedUser, setLoggedUser } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [allBlogs, setAllBlogs] = useState([]);

  const goToAccount = () => {
    navigation.navigate("Account");
  };

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setLoggedUser(user);
        getAllBlogs(setAllBlogs);
        setLoading(false);
        // console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <SafeAreaView style={homeStyles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLOR.lightBlue} />
      {loading ? (
        <LoadingComp
          text="LOADING..."
          loadercolor={COLOR.lightBlue}
          extraLoadderStyle={homeStyles.extraLoadderStyle}
        />
      ) : (
        <>
          <View style={homeStyles.profileWrapper}>
            <ProfileComponent onPress={goToAccount} userData={loggedUser} />
            <TouchableOpacity>
              <Feather name="bell" size={22} />
            </TouchableOpacity>
          </View>
          <View style={homeStyles.contentWrapper}>
            <Tab allBlogs={allBlogs} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  btn: {
    marginTop: 50,
    marginLeft: 20,
  },
});
