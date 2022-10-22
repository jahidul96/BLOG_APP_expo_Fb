import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import COLOR from "../../COLOR/COLOR";
import {
  AppBar,
  ButtonComp,
  Input,
  LoadingComp,
} from "../../component/Reuse/Reuse";
import Context from "../../../context/Context";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Picker from "../../component/Picker";
import MultipleInput from "../../component/MultipleInput";
import { Height, Width } from "../../../utils/Dimensions";
import { SingleBlog } from "../../component/SingleBlog";
import ProfileComponent from "../../component/ProfileComponent";
import Entypo from "react-native-vector-icons/Entypo";
import * as ImagePicker from "expo-image-picker";
import { Tag } from "../../component/Tag";
import { Timestamp } from "firebase/firestore";
import {
  addBlogToFB,
  uploadFileToStorage,
} from "../../../firebase/fbFirestore/fbFirestore";
import { auth } from "../../../firebase/firebase";

const data = [
  "Sport",
  "News",
  "Entetainment",
  "Pogramming",
  "Tech",
  "Political",
  "Other's",
];

const PostBlog = () => {
  const [tags, setTags] = useState([]);
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const { loggedUser } = useContext(Context);
  const navigation = useNavigation();
  const [uploading, setUploading] = useState(false);
  const [type, setType] = useState("");
  const [categorie, setCategorie] = useState("");
  const [pick, setPick] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const uid = auth.currentUser.uid;

  const _pickDocument = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const fields = [desc, image, categorie];
  const required = fields.every(Boolean);

  const seePreview = () => {
    if (!required) {
      return Alert.alert("ALL FIELD REQUIRED!");
    }
    if (tags.length == 0) {
      return Alert.alert("AT LEAST ONE TAG REQUIRED!");
    }
    if (tags.length > 3) {
      return Alert.alert("MAXIMUM THREE TAGS!");
    }
    setModalVisible(!modalVisible);
  };

  const submitBlog = () => {
    if (!required) {
      return Alert.alert("ALL FIELD REQUIRED!");
    }
    if (tags.length == 0) {
      return Alert.alert("AT LEAST ONE TAG REQUIRED!");
    }
    if (tags.length > 3) {
      return Alert.alert("MAXIMUM THREE TAGS!");
    }
    if (desc.length < 200) {
      return Alert.alert(
        "BLOG DETAIL'S NEED TO BE AT LEAST 200 CHARACTER LONG!"
      );
    }
    setUploading(true);

    let blog = {
      description: desc,
      categorie,
      tags,
      click: 0,
      likes: [],
      comments: [],
      postedBy: loggedUser,
      createdAt: Timestamp.fromDate(new Date()),
      myId: uid,
    };

    uploadFileToStorage(image)
      .then((url) => {
        blog.featuredImg = url;
        addBlogToFB(blog)
          .then(() => {
            setUploading(true);
            navigation.navigate("Home");
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        setUploading(false);
        Alert.alert("SOMETHING WENT WRONG!");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const selectCategories = (value) => {
    setCategorie(value);
    setPick(!pick);
  };
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <PreviewPostComp
          desc={desc}
          tags={tags}
          image={image}
          categorie={categorie}
          loggedUser={loggedUser}
          onPress={submitBlog}
        />
      </Modal>
      {uploading && (
        <LoadingComp
          loadercolor={COLOR.red}
          textColor={COLOR.red}
          text="POSTING..."
        />
      )}
      <StatusBar barStyle="light-content" backgroundColor={COLOR.lightBlue} />
      <View style={styles.paddingHorizontal}>
        <AppBar navigation={navigation} />
      </View>

      <ScrollView style={styles.contentContainer}>
        <TouchableOpacity
          style={styles.uploadContainer}
          onPress={_pickDocument}
        >
          {image ? (
            <Image source={{ uri: image }} style={styles.pickedImgStyle} />
          ) : (
            <>
              <FontAwesome
                name="cloud-upload"
                size={30}
                color={COLOR.lightBlue}
              />
              <Text style={styles.addText}>Add a Featured Image</Text>
            </>
          )}
        </TouchableOpacity>
        <Picker
          data={data}
          categorie={categorie}
          onPress={selectCategories}
          pick={pick}
          setPick={setPick}
          extraStyle={styles.extraStyle}
        />
        <Input
          multiline={true}
          placeholder="Description"
          setValue={setDesc}
          numberOfLines={10}
          extraStyle={styles.inputExtraStyle}
        />
        <MultipleInput value={tags} setValue={setTags} />

        <View style={styles.btnWrapper}>
          <ButtonComp
            text="PREVIEW"
            extraStyle={styles.btnExtraStyle}
            onPress={seePreview}
          />
          <ButtonComp
            text="POST"
            extraStyle={styles.btnExtraStyle}
            onPress={submitBlog}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default PostBlog;

const PreviewPostComp = ({ desc, tags, image, loggedUser, onPress }) => {
  return (
    <View style={styles.modelContainer}>
      <View style={styles.modelContentWrapper}>
        <ScrollView>
          <View style={styles.profileContainer}>
            <ProfileComponent userData={loggedUser} />
            <Entypo name="dots-three-vertical" size={20} />
          </View>
          <Image source={{ uri: image }} style={styles.imgStyle} />

          <View
            style={{
              paddingHorizontal: 15,
              paddingBottom: 15,
            }}
          >
            <View
              style={{
                marginTop: 10,
              }}
            >
              <Tag tags={tags} />
            </View>
            <Text style={styles.blogText}>{desc}</Text>
          </View>
        </ScrollView>
        <View style={styles.modelpostBtnWrapper}>
          <ButtonComp
            text="POST"
            extraStyle={styles.btnExtraStyle}
            onPress={onPress}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  paddingHorizontal: {
    paddingHorizontal: 15,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  uploadContainer: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  pickedImgStyle: {
    width: 200,
    height: 100,
    borderWidth: 2,
    borderColor: COLOR.lightBlue,
  },
  addText: {
    marginTop: 7,
    fontFamily: "Poppins-Regular",
    fontSize: 15,
  },
  extraStyle: {
    top: 30,
  },
  inputExtraStyle: {
    height: 180,
    paddingVertical: 10,
    textAlignVertical: "top",
    marginTop: 20,
    borderRadius: 10,
  },
  btnWrapper: {
    marginVertical: 15,
  },
  btnExtraStyle: {
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: COLOR.lightBlue,
  },
  modelContainer: {
    width: Width,
    height: Height,
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  modelContentWrapper: {
    height: Height / 1.2,
    backgroundColor: COLOR.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingVertical: 20,
  },

  modelpostBtnWrapper: {
    paddingHorizontal: 15,
    height: 80,
    justifyContent: "center",
  },
  profileContainer: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
  },

  imgStyle: {
    width: "100%",
    height: 180,
  },
  blogText: {
    fontFamily: "Poppins-Regular",
    letterSpacing: 0.7,
    marginVertical: 5,
    lineHeight: 26,
  },
});
