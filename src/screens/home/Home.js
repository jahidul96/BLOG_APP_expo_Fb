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
  getBlogWriterProfile,
  getCurrentUser,
  getMyCategorieBlogs,
  getMYFavoritesBlog,
} from "../../../firebase/fbFirestore/fbFirestore";
import Context from "../../../context/Context";
import { LoadingComp } from "../../component/Reuse/Reuse";
import FavoriteContext from "../../../context/FavoriteContext";

const Home = ({ navigation }) => {
  const { loggedUser, setLoggedUser } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [allBlogs, setAllBlogs] = useState([]);
  const [myCategorieBlogs, setMyCategorieBlogs] = useState([]);
  const { setFavoriteBlogs } = useContext(FavoriteContext);
  const [myblogerProfile, setmyBlogerProfile] = useState({});

  const goToAccount = () => {
    navigation.navigate("Account");
  };
  const goToNotification = () => {
    navigation.navigate("Notification");
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getCurrentUser()
        .then((user) => {
          setLoggedUser(user);
          getAllBlogs(setAllBlogs);
          getMyCategorieBlogs(setMyCategorieBlogs, user.categorie);
          getMYFavoritesBlog(setFavoriteBlogs);
          getBlogWriterProfile(user.uid, setmyBlogerProfile);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    return unsubscribe;
  }, []);

  // console.log("myCategorieBlogs", myCategorieBlogs);

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
            <TouchableOpacity onPress={goToNotification}>
              <Feather name="bell" size={22} />
              {myblogerProfile?.newNotification == true && (
                <View style={styles.notifyView}></View>
              )}
            </TouchableOpacity>
          </View>
          <View style={homeStyles.contentWrapper}>
            <Tab allBlogs={allBlogs} myCategorieBlogs={myCategorieBlogs} />
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
  notifyView: {
    position: "absolute",
    top: -2,
    right: 0,
    width: 10,
    height: 10,
    backgroundColor: COLOR.red,
    borderRadius: 100,
  },
});
