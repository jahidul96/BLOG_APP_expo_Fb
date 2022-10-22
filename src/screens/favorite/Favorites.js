import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import COLOR from "../../COLOR/COLOR";
import { AppBar, LoadingComp } from "../../component/Reuse/Reuse";
import { useNavigation } from "@react-navigation/native";
import {
  deleteFavoriteBlog,
  getMYFavoritesBlog,
} from "../../../firebase/fbFirestore/fbFirestore";
import { SingleBlog } from "../../component/SingleBlog";
import FavoriteContext from "../../../context/FavoriteContext";

const Favorites = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const { favoriteBlogs } = useContext(FavoriteContext);

  //   console.log("favoriteBlogs", favoriteBlogs);

  const removeFromFavorite = (data) => {
    // console.log("data is a single val", data);

    deleteFavoriteBlog(data.id)
      .then(() => {
        Alert.alert("REMOVED FROM FAVORITE'S!");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  //   console.log("favoriteBlog", favoriteBlogs);
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLOR.lightBlue} />
      {loading ? (
        <LoadingComp loadercolor={COLOR.lightBlue} />
      ) : (
        <>
          <View style={styles.paddingHorizontal}>
            <AppBar text="Favorite" navigation={navigation} />
          </View>

          <ScrollView
            style={{
              flex: 1,
            }}
          >
            {favoriteBlogs.length > 0 ? (
              favoriteBlogs.map((blog, i) => (
                <SingleBlog
                  blog={blog}
                  key={i}
                  favorite={true}
                  onPress={removeFromFavorite}
                />
              ))
            ) : (
              <View style={styles.emptyView}>
                <Text>NO FAVORITE TILL NOW</Text>
              </View>
            )}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  paddingHorizontal: {
    paddingHorizontal: 15,
  },
  emptyView: {
    marginTop: 30,
    alignItems: "center",
  },
});
