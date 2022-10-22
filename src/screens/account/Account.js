import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AppBar,
  ButtonComp,
  LoadingComp,
  NormalBtn,
} from "../../component/Reuse/Reuse";
import { accountStyles } from "./AccountStyle";
import Feather from "react-native-vector-icons/Feather";
import { doc, deleteDoc } from "firebase/firestore";
import { deleteUser, signOut } from "firebase/auth";

import * as ImagePicker from "expo-image-picker";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Context, { AuthContext } from "../../../context/Context";
import { auth, storage } from "../../../firebase/firebase";
import COLOR from "../../COLOR/COLOR";
import {
  addProfilePic,
  getCurrentUser,
  uploadFileToStorage,
} from "../../../firebase/fbFirestore/fbFirestore";

const img = "http://cdn.onlinewebfonts.com/svg/img_550782.png";

const Account = ({ navigation }) => {
  const { loggedUser, setLoggedUser } = useContext(Context);
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { setAuthUser } = useContext(AuthContext);

  const logout = () => {
    setUploading(true);
    signOut(auth).then(() => {
      setAuthUser(null);
      setUploading(false);
      navigation.navigate("Register");
    });
  };

  const _pickDocument = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setShow(true);
    }
  };

  const uploadProfilePic = async () => {
    setUploading(true);

    uploadFileToStorage(image).then((url) => {
      addProfilePic(url)
        .then(() => {
          setUploading(false);
          Alert.alert("profile pic added succesfully");
          setShow(false);
          getCurrentUser().then((user) => {
            setLoggedUser(user);
          });
        })
        .catch((err) => {
          setUploading(false);
          Alert.alert("something went wrong");
        });
    });
  };

  // console.log("loggedUser", loggedUser);

  const deleteAccount = () => {
    // setUploading(true);
    // const collectionname = "Users";
    // deleteFromFb(auth.currentUser.uid, collectionname)
    //   .then((res) => {
    //     deleteUser(auth.currentUser)
    //       .then(() => {
    //         setUploading(false);
    //         console.log("user deleted");
    //         setAuthUser(null);
    //         navigation.navigate("Register");
    //       })
    //       .catch((error) => {
    //         setUploading(false);
    //         Alert.alert("something went wrong!");
    //       });
    //   })
    //   .catch((err) => {
    //     setUploading(false);
    //     Alert.alert("something went wrong!");
    //   });
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLOR.white, flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor={COLOR.lightBlue} />
      {uploading && <LoadingComp loadercolor={COLOR.red} />}
      <View style={{ paddingHorizontal: 20 }}>
        <AppBar text="Account" navigation={navigation} />
      </View>
      <ScrollView style={accountStyles.contentWrapper}>
        <View style={accountStyles.profileContainer}>
          <View style={accountStyles.profileImageWrapper}>
            <Image
              source={{
                uri: loggedUser?.profileImg ? loggedUser?.profileImg : img,
              }}
              style={accountStyles.imgStyle}
            />
            <Text style={accountStyles.name}>
              {loggedUser ? loggedUser?.username : "Username"}
            </Text>
            <Text style={accountStyles.email}>
              {loggedUser ? loggedUser?.email : "user@gmail.com"}
            </Text>
          </View>
        </View>
        {show && image ? (
          <ImageModel
            image={image}
            uploadProfilePic={uploadProfilePic}
            onPress={_pickDocument}
          />
        ) : null}
        <AccountBtnComp
          text="Upload A Profile Picture"
          icon={
            <Feather name="chevron-right" size={22} color={COLOR.lightBlue} />
          }
          onPress={_pickDocument}
        />
        <AccountBtnComp
          text="Profile"
          icon={
            <Feather name="chevron-right" size={22} color={COLOR.lightBlue} />
          }
          onPress={() => navigation.navigate("Profile", { user: loggedUser })}
        />
        <AccountBtnComp
          text="Post a Blog"
          icon={
            <Feather name="chevron-right" size={22} color={COLOR.lightBlue} />
          }
          onPress={() => navigation.navigate("PostBlog")}
        />
        <AccountBtnComp
          text="Favorites"
          icon={
            <Feather name="chevron-right" size={22} color={COLOR.lightBlue} />
          }
          onPress={() => navigation.navigate("Favorites")}
        />
        <AccountBtnComp
          text="Password & Security"
          icon={
            <Feather name="chevron-right" size={22} color={COLOR.lightBlue} />
          }
          onPress={() => navigation.navigate("ResetPassword")}
        />
        <View style={{ marginTop: 15 }}>
          <NormalBtn text="Delete My Account" onPress={deleteAccount} />
          <NormalBtn text="Log Out" onPress={logout} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const AccountBtnComp = ({ text, icon, onPress }) => (
  <TouchableOpacity style={accountStyles.btnContainer}>
    <NormalBtn text={text} onPress={onPress} />
    {icon}
  </TouchableOpacity>
);

const ImageModel = ({ image, uploadProfilePic, onPress }) => (
  <View style={accountStyles.imageModel}>
    {image ? (
      <TouchableOpacity onPress={onPress}>
        <Image source={{ uri: image }} style={accountStyles.selectedImgStyle} />
      </TouchableOpacity>
    ) : null}
    <ButtonComp
      text="Upload"
      extraStyle={{ width: "50%", borderRadius: 5, height: 35 }}
      extraTextStyle={{ fontSize: 14 }}
      onPress={uploadProfilePic}
    />
  </View>
);

export default Account;
