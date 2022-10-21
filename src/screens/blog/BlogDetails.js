import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Height, Width } from "../../../utils/Dimensions";
import COLOR from "../../COLOR/COLOR";
import ProfileComponent from "../../component/ProfileComponent";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  AppBar,
  ButtonComp,
  Input,
  LoadingComp,
} from "../../component/Reuse/Reuse";
import {
  commentPost,
  getSingleBlog,
  likePost,
} from "../../../firebase/fbFirestore/fbFirestore";
import Context from "../../../context/Context";
import { Timestamp } from "firebase/firestore";
import { Tag } from "../../component/Tag";

const BlogDetails = ({ navigation, route }) => {
  const { id, value } = route.params;
  const [blog, setSingleBlog] = useState({});
  const [loadding, setLoading] = useState(true);
  const { loggedUser } = useContext(Context);
  const [comment, setComment] = useState();
  const [allComments, setAllComments] = useState(value.comments);
  const scrollViewRef = useRef();

  const isLiked = blog?.likes?.filter((s) => s.likedBy == loggedUser?.email);

  // console.log("value", value);

  useEffect(() => {
    getSingleBlog(setSingleBlog, id);
    setLoading(false);
  }, []);

  const _likePost = (data) => {
    if (isLiked.length == 0) {
      let val = [
        ...data.likes,
        {
          likedBy: loggedUser.email,
        },
      ];
      likePost(val, id);
    } else {
      let val = data.likes.filter((st) => st.likedBy != loggedUser.email);
      likePost(val, id);
    }
  };

  const _commentOnPost = () => {
    if (!comment) {
      return Alert.alert("WRITE A COMMENT!");
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

  // console.log("blog", blog);

  const seeProfile = () => {
    navigation.navigate("Profile");
  };
  return (
    <View style={styles.root}>
      {loadding && <LoadingComp loadercolor={COLOR.lightBlue} />}
      <ImageBackground
        source={{ uri: blog?.featuredImg }}
        style={styles.imgStyle}
        blurRadius={2}
      >
        <View style={styles.topContainer}>
          <AppBar color={COLOR.white} navigation={navigation} />
          <TouchableOpacity onPress={() => _likePost(blog)}>
            <Fontisto
              name="heart"
              size={20}
              color={isLiked?.length == 0 ? COLOR.white : COLOR.red}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.profileContainer}>
          <ProfileComponent
            extraColorStyle={styles.extraColorStyle}
            onPress={seeProfile}
            userData={blog?.postedBy}
          />
          <TouchableOpacity>
            <Fontisto name="favorite" size={22} color={COLOR.lightBlue} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      {/* likes comment and share */}
      <View style={styles.countMainContainer}>
        <CountComp text={blog?.likes?.length} name="heart" />
        <CountComp text={blog?.comments?.length} name="message" />
        <CountComp text={blog?.click} name="eye" />
      </View>
      <View
        style={{
          paddingHorizontal: 15,
        }}
      >
        <Tag tags={blog?.tags} />
      </View>

      <ScrollView style={styles.bottomContentWrapper}>
        <View style={styles.descContainer}>
          <View
            style={{
              paddingHorizontal: 15,
            }}
          >
            <Text style={styles.descText}>{blog?.description}</Text>
          </View>
        </View>

        {/* comment comp */}

        <View style={styles.commentContainer}>
          {blog?.comments?.length > 0 ? (
            blog?.comments.map((commentValue, index) => (
              <Comments key={index} commentData={commentValue} />
            ))
          ) : (
            <View>
              <Text style={styles.noCommentText}>No comment Till now...</Text>
            </View>
          )}
        </View>
        <View style={styles.commentWriteWrapper} behavior="height">
          <Input
            placeholder="your comment"
            extraStyle={styles.extraInputStyle}
            multiline
            setValue={setComment}
            value={comment}
          />
          <ButtonComp
            text="Add"
            extraStyle={styles.extraButtonStyle}
            onPress={_commentOnPost}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default BlogDetails;

const CountComp = ({ text, name }) => (
  <View style={styles.countSingleContainer}>
    <Entypo name={name} size={16} style={{ marginRight: 5 }} />
    <Text style={styles.likesText}>{text}</Text>
  </View>
);

const Comments = ({ commentData }) => (
  <View style={styles.singleComment}>
    <Ionicons name="person-circle-sharp" size={28} />
    <View style={{ flex: 1 }}>
      <View style={styles.commenterNameContainer}>
        <Text style={styles.name}>{commentData?.commentedBy}</Text>
        <Text style={styles.commentText}>{commentData?.comment} </Text>
      </View>
      <Text style={styles.time}>
        {commentData?.postedAt.toDate().toLocaleDateString()}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  root: {
    backgroundColor: COLOR.white,
    flex: 1,
  },

  imgStyle: {
    width: Width,
    height: Height / 4,
    justifyContent: "space-between",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  profileContainer: {
    width: Width,
    height: 60,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  extraColorStyle: {
    color: COLOR.white,
    elevation: 100,
  },
  bottomContentWrapper: {
    flex: 1,
  },
  countMainContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    marginVertical: 8,
  },
  countSingleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  likesText: {
    fontFamily: "Poppins-Bold",
  },
  descContainer: {
    width: Width,
    paddingBottom: 20,
    borderBottomColor: COLOR.gray,
    borderBottomWidth: 1,
  },
  descText: {
    fontFamily: "Poppins-Light",
    fontSize: 16,
    letterSpacing: 1,
    lineHeight: 30,
  },
  commentContainer: {
    width: Width,
    paddingHorizontal: 15,
    marginTop: 20,
  },
  commentWriteWrapper: {
    height: 80,
    alignItems: "center",
    backgroundColor: COLOR.lightGray,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  extraInputStyle: {
    width: "70%",
    height: 55,
    borderRadius: 10,
  },
  extraButtonStyle: {
    width: "25%",
    height: 40,
    borderRadius: 10,
    backgroundColor: COLOR.lightBlue,
  },
  singleComment: {
    flexDirection: "row",
    marginBottom: 8,
  },
  commenterNameContainer: {
    marginLeft: 5,
    backgroundColor: COLOR.gray,
    flex: 1,
    padding: 7,
    borderRadius: 5,
  },
  name: {
    fontFamily: "Poppins-Bold",
    fontSize: 12,
    marginBottom: 2,
  },
  commentText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
  },
  noCommentText: {
    fontFamily: "Poppins-Regular",
    borderBottomColor: COLOR.gray,
    width: "60%",
    color: COLOR.darkGray,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  time: {
    marginTop: 5,
    fontSize: 12,
    color: COLOR.darkGray,
  },
});