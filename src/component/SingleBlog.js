import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import COLOR from "../COLOR/COLOR";
import ProfileComponent from "./ProfileComponent";
import Entypo from "react-native-vector-icons/Entypo";
import {
  deleteFavoriteBlog,
  FavoriteBlog,
  viewCounter,
} from "../../firebase/fbFirestore/fbFirestore";
import { Timestamp } from "firebase/firestore";
import FavoriteContext from "../../context/FavoriteContext";
import Context from "../../context/Context";

export const SingleBlog = ({ blog, favorite, onPress }) => {
  const navigation = useNavigation();
  const { favoriteBlogs } = useContext(FavoriteContext);
  const { id, value } = blog;
  const { loggedUser } = useContext(Context);
  const { postedBy } = value;

  const isAlreadyFavorite = favoriteBlogs.filter(
    (favBlog) => favBlog.value.postId == id
  );

  const favData = {
    postId: id,
    postedBy: value.postedBy,
    description: value.description,
    featuredImg: value.featuredImg,
    tags: value.tags,
    createdAt: Timestamp.fromDate(new Date()),
  };

  const addtoFavorite = () => {
    if (isAlreadyFavorite.length > 0) {
      deleteFavoriteBlog(isAlreadyFavorite[0].id)
        .then(() => {
          Alert.alert("REMOVED FROM FAVORITE'S!");
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      FavoriteBlog(favData);
      Alert.alert("ADDED TO FAVORITE'S");
    }
  };

  const _seeBlogDetails = () => {
    let clickVal = blog?.value?.click + 1;
    viewCounter(clickVal, id)
      .then(() => {
        navigation.navigate("BlogDetails", { id, value });
      })
      .catch((err) => {
        Alert.alert("SOMETHING WENT WRONG!");
      });
  };

  const _seeMyFavBlogDetails = () => {
    const { postId } = blog.value;
    navigation.navigate("BlogDetails", { id: postId, value });
  };

  const seeProfile = () => {
    navigation.navigate("Profile", { user: postedBy });
  };
  return (
    <View
      style={{
        marginBottom: 15,
      }}
    >
      <View style={styles.profileContainer}>
        <ProfileComponent onPress={seeProfile} userData={value?.postedBy} />

        {favorite ? (
          <TouchableOpacity
            style={styles.popupBtn}
            onPress={() => onPress(blog)}
          >
            <Entypo name="circle-with-minus" size={28} color={COLOR.red} />
          </TouchableOpacity>
        ) : (
          <>
            {value?.postedBy?.uid == loggedUser.uid ? null : (
              <TouchableOpacity style={styles.popupBtn} onPress={addtoFavorite}>
                <Entypo
                  name={
                    isAlreadyFavorite.length > 0
                      ? "circle-with-minus"
                      : "circle-with-plus"
                  }
                  size={28}
                  color={
                    isAlreadyFavorite.length > 0 ? COLOR.red : COLOR.lightBlue
                  }
                />
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
      <View>
        <Image source={{ uri: value?.featuredImg }} style={styles.imgStyle} />
        <View style={styles.horizontalPadding}>
          <Text style={styles.blogText}>
            {value?.description.length > 150
              ? value.description.slice(0, 100) + "..."
              : value.description}
          </Text>
          {favorite ? (
            <TouchableOpacity
              style={styles.readmoreBtn}
              onPress={_seeMyFavBlogDetails}
            >
              <Text style={styles.readmoreText}>Read more</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.readmoreBtn}
              onPress={_seeBlogDetails}
            >
              <Text style={styles.readmoreText}>Read more</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
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
    borderBottomColor: COLOR.lightBlue,
    borderBottomWidth: 1,
    alignSelf: "flex-start",
  },
});
