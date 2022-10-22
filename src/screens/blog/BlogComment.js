import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppBar, ButtonComp, Input } from "../../component/Reuse/Reuse";

import Ionicons from "react-native-vector-icons/Ionicons";
import { Timestamp } from "firebase/firestore";
import COLOR from "../../COLOR/COLOR";
import Context from "../../../context/Context";
import {
  commentPost,
  getBlogWriterProfile,
  getSingleBlog,
} from "../../../firebase/fbFirestore/fbFirestore";

const BlogComment = ({ navigation, route }) => {
  const { existsComments, id } = route.params;
  const [allComments, setAllComments] = useState(existsComments);
  const [blog, setSingleBlog] = useState({});
  const [comment, setComment] = useState("");
  const { loggedUser } = useContext(Context);
  const { comments } = blog;
  const scrollViewRef = useRef();
  const [blogerProfile, setBlogerProfile] = useState({});

  const _commentOnPost = (data) => {
    if (!comment) {
      return Alert.alert("write a comment");
    }
    let val = [
      ...allComments,
      {
        postedAt: Timestamp.fromDate(new Date()),
        comment,
        commentedBy: loggedUser.username,
      },
    ];
    setAllComments(val);
    commentPost(val, id);
    setComment("");
  };

  useEffect(() => {
    getSingleBlog(setSingleBlog, id);
    getBlogWriterProfile(loggedUser.uid, setBlogerProfile);
  }, []);

  // console.log('blogerProfile', blogerProfile)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor={COLOR.darkGray} />
      <View style={styles.topBarWrapper}>
        <AppBar navigation={navigation} text="PostComment" />
      </View>
      <ScrollView
        style={styles.container}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
      >
        {comments?.length == 0 ? (
          <View style={styles.loadingContainer}>
            <Text style={{ fontSize: 18 }}>No comment till now.</Text>
          </View>
        ) : (
          <View style={{ paddingVertical: 20 }}>
            {comments?.map((comment, i) => (
              <UserComment key={i} data={comment} />
            ))}
          </View>
        )}
      </ScrollView>
      <View style={styles.addcommentContainer}>
        <Input
          placeholder="comment"
          extraStyle={styles.InputExtraStyle}
          multiline={true}
          setValue={setComment}
          value={comment}
        />
        <ButtonComp
          text="Add"
          extraTextStyle={styles.ButtonTextExtraStyle}
          extraStyle={styles.ButtonExtraStyle}
          onPress={_commentOnPost}
        />
      </View>
    </SafeAreaView>
  );
};

const UserComment = ({ data }) => (
  <View style={styles.commentWrapper}>
    <View style={styles.iconWrapper}>
      <Ionicons name="person-outline" size={25} />
    </View>
    <View style={{ flex: 1, marginLeft: 15 }}>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{data.commentedBy}</Text>
        <Text>{data.comment}</Text>
      </View>
      <Text style={styles.time}>
        {data.postedAt.toDate().toLocaleDateString()}
      </Text>
    </View>
  </View>
);

export default BlogComment;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: COLOR.white,
  },
  topBarWrapper: {
    backgroundColor: COLOR.white,
    paddingHorizontal: 15,
  },
  loadingContainer: {
    marginTop: 100,
    alignItems: "center",
  },
  commentWrapper: {
    flexDirection: "row",
    marginBottom: 15,
  },
  iconWrapper: {
    marginTop: 3,
    borderColor: COLOR.lightBlue,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 100,
  },
  nameContainer: {
    flex: 1,
    backgroundColor: COLOR.gray,
    padding: 10,
    borderRadius: 10,
  },
  name: {
    color: "#000",
    fontFamily: "Poppins-Bold",
  },
  time: {
    marginTop: 5,
    color: COLOR.darkGray,
  },

  addcommentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: COLOR.lightGray,
    paddingHorizontal: 15,
  },
  InputExtraStyle: {
    width: "65%",
    elevation: 1,
    height: 40,
    borderRadius: 10,
    fontSize: 13,
  },
  ButtonExtraStyle: {
    width: "30%",
    height: 40,
    backgroundColor: COLOR.lightBlue,
    marginTop: -10,
    borderRadius: 10,
  },
  ButtonTextExtraStyle: {
    color: COLOR.white,
    fontSize: 13,
  },
});
