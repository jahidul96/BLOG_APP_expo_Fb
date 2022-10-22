import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import COLOR from "../../COLOR/COLOR";
import {
  getBlogWriterProfile,
  NotifyChange,
} from "../../../firebase/fbFirestore/fbFirestore";
import { auth } from "../../../firebase/firebase";
import { AppBar, LoadingComp } from "../../component/Reuse/Reuse";

const Notification = ({ navigation }) => {
  const [myblogerProfile, setmyBlogerProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    NotifyChange(auth.currentUser.uid, false);
    getBlogWriterProfile(auth.currentUser.uid, setmyBlogerProfile);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  //   console.log("myblogerProfile", myblogerProfile);
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLOR.lightBlue} />
      {loading ? (
        <LoadingComp loadercolor={COLOR.lightBlue} />
      ) : (
        <>
          <View
            style={{
              paddingHorizontal: 15,
            }}
          >
            <AppBar navigation={navigation} text="Notifications" />
          </View>
          <ScrollView style={styles.contentWrapper}>
            {myblogerProfile?.notifications?.length > 0 ? (
              myblogerProfile.notifications
                .reverse()
                .map((notifyObj, index) => (
                  <View style={styles.NotificationView} key={index}>
                    <Text style={styles.name}>{notifyObj.username}</Text>
                    {notifyObj.type == "like" ? (
                      <Text style={[styles.text, { color: COLOR.orangeRed }]}>
                        {" "}
                        liked your post
                      </Text>
                    ) : notifyObj.type == "follow" ? (
                      <Text style={styles.text}> has followed you</Text>
                    ) : (
                      <Text style={[styles.text, { color: COLOR.purple }]}>
                        {" "}
                        commented on your blog
                      </Text>
                    )}
                  </View>
                ))
            ) : (
              <Text style={styles.emptyText}>No Notification</Text>
            )}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  contentWrapper: {
    paddingVertical: 10,
  },
  NotificationView: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: COLOR.lightGray,
    marginBottom: 10,
  },
  name: {
    fontFamily: "Poppins-Bold",
    color: COLOR.lightBlue,
    fontSize: 16,
  },
  text: {
    fontFamily: "Poppins-Regular",
  },
  emptyText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
  },
});
