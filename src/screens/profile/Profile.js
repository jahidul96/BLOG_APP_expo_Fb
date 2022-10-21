import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Height, Width } from "../../../utils/Dimensions";
import COLOR from "../../COLOR/COLOR";
import Context from "../../../context/Context";
import { AppBar } from "../../component/Reuse/Reuse";

const img = "http://cdn.onlinewebfonts.com/svg/img_550782.png";

const Profile = ({ navigation }) => {
  const { loggedUser } = useContext(Context);
  const post = [1, 2, 3];

  return (
    <View style={styles.root}>
      <View style={{ paddingHorizontal: 15 }}>
        <AppBar navigation={navigation} />
      </View>
      <ScrollView
        contentContainerStyle={styles.mainwrapper}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileImageWrapper}>
          <Image
            source={{
              uri: loggedUser?.profileImg ? loggedUser?.profileImg : img,
            }}
            style={styles.imgStyle}
          />
          <Text style={styles.name}>
            {loggedUser ? loggedUser?.username : "Username"}
          </Text>
          <Text style={styles.email}>
            {loggedUser ? loggedUser?.email : "user@gmail.com"}
          </Text>
        </View>
        <View style={styles.postContainer}>
          <Counter text="Follow" btn />
          <Counter total={20} text="Post's" />
          <Counter total={2000} text="Follower's" />
        </View>
        <Text style={styles.postText}>All POSTS</Text>
        {/* {post.map((d, i) => (
          <Blog key={i} />
        ))} */}
      </ScrollView>
    </View>
  );
};

const Counter = ({ total, text, btn }) => (
  <>
    {btn ? (
      <TouchableOpacity
        style={[styles.counterWrapper, { backgroundColor: COLOR.lightBlue }]}
      >
        <Text style={[styles.text, { color: COLOR.white }]}>{text}</Text>
      </TouchableOpacity>
    ) : (
      <View style={styles.counterWrapper}>
        <Text style={styles.total}>{total}</Text>
        <Text style={[styles.text]}>{text}</Text>
      </View>
    )}
  </>
);

export default Profile;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  mainwrapper: {
    paddingVertical: 15,
  },
  profileImageWrapper: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 15,
    borderBottomColor: COLOR.lightGray,
    borderBottomWidth: 1,
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
  postContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    marginTop: 15,
  },
  counterWrapper: {
    width: Width / 3.5,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLOR.lightGray,
    elevation: 2,
    borderRadius: 5,
    marginRight: 5,
  },
  total: {
    fontFamily: "Poppins-Regular",
    marginBottom: -3,
  },
  text: {
    fontFamily: "Poppins-Bold",
  },
  postText: {
    marginTop: 25,
    marginBottom: 5,
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Poppins-Bold",
  },
  mypostContainer: {
    marginTop: 10,
    backgroundColor: COLOR.white,
    elevation: 2,
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  postContentWrapper: {
    marginVertical: 12,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    alignSelf: "flex-end",
    width: "50%",
    marginVertical: 5,
  },
  flexStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconStyle: {
    marginRight: 7,
  },
});
