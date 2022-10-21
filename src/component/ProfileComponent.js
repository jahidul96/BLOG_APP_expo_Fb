import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import COLOR from "../COLOR/COLOR";

const img = "http://cdn.onlinewebfonts.com/svg/img_550782.png";

const ProfileComponent = ({ extraColorStyle, onPress, userData }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image
        source={{ uri: userData?.profileImg ? userData?.profileImg : img }}
        style={styles.imgStyle}
      />
      <View style={styles.rightContainer}>
        <Text style={[styles.name, extraColorStyle]}>
          {userData?.username ? userData?.username : "UserName"}
        </Text>
        <Text style={[styles.profession, extraColorStyle]}>
          {userData?.categorie ? userData.categorie : "Reader"}
        </Text>
      </View>
    </Pressable>
  );
};

export default ProfileComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 60,
  },
  imgStyle: {
    width: 35,
    height: 35,
    borderRadius: 100 / 2,
    borderWidth: 2,
    borderColor: COLOR.lightBlue,
  },
  rightContainer: {
    marginLeft: 10,
  },
  name: {
    fontFamily: "Poppins-Bold",
    fontSize: 13,
  },
  profession: {
    fontSize: 12,
    fontFamily: "Poppins-Light",
    marginTop: -4,
  },
});
