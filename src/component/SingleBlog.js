import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import COLOR from "../COLOR/COLOR";
import ProfileComponent from "./ProfileComponent";
import Entypo from "react-native-vector-icons/Entypo";
import { viewCounter } from "../../firebase/fbFirestore/fbFirestore";

export const SingleBlog = ({ blog }) => {
  const [show, setShow] = useState(false);
  const navigation = useNavigation();

  const { id, value } = blog;

  const addtoFavorite = () => {
    setShow(false);
  };

  const _seeBlogDetails = () => {
    let clickVal = value?.click + 1;
    viewCounter(clickVal, id)
      .then(() => {
        navigation.navigate("BlogDetails", { id, value });
      })
      .catch((err) => {
        Alert.alert("SOMETHING WENT WRONG!");
      });
  };

  const seeProfile = () => {
    // navigation.navigate("Profile");
  };
  return (
    <View
      style={{
        marginBottom: 15,
      }}
    >
      <View style={styles.profileContainer}>
        <ProfileComponent onPress={seeProfile} userData={value?.postedBy} />
        <TouchableOpacity onPress={() => setShow(!show)}>
          <Entypo name="dots-three-vertical" size={20} />
        </TouchableOpacity>
        {show ? (
          <View style={styles.popupContainer}>
            <TouchableOpacity style={styles.popupBtn} onPress={addtoFavorite}>
              <Text style={styles.readmoreText}> Add To Favorite</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
      <TouchableOpacity activeOpacity={0.8}>
        <Image source={{ uri: value?.featuredImg }} style={styles.imgStyle} />
        <View style={styles.horizontalPadding}>
          <Text style={styles.blogText}>{value?.description}</Text>
          <TouchableOpacity
            style={styles.readmoreBtn}
            onPress={_seeBlogDetails}
          >
            <Text style={styles.readmoreText}>Read more</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  imgStyle: {
    width: "100%",
    height: 150,
  },
  profileContainer: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  blogText: {
    fontFamily: "Poppins-Regular",
    letterSpacing: 0.7,
    marginVertical: 5,
    lineHeight: 26,
  },
  horizontalPadding: {
    paddingHorizontal: 10,
  },
  readmoreBtn: {},
  readmoreText: {
    fontFamily: "Poppins-Bold",
  },
  popupContainer: {
    position: "absolute",
    top: 20,
    right: 30,
    width: 160,
    height: 50,
    backgroundColor: COLOR.lightGray,
    elevation: 2,
    zIndex: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  popupBtn: {},
});
