import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import COLOR from "../COLOR/COLOR";
import { Width } from "../../utils/Dimensions";
import { SingleBlog } from "./SingleBlog";

const tabName = [
  {
    id: 1,
    title: "All",
  },
  {
    id: 2,
    title: "For you",
  },
  {
    id: 3,
    title: "By Tags",
  },
];

const Tab = ({ allBlogs }) => {
  const [tabTitle, setTabTitle] = useState(tabName[0].title);

  const selectTab = (item) => {
    setTabTitle(item.title);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabName.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.7}
            style={[
              styles.itemStyle,
              item.title == tabTitle && styles.activeStyle,
            ]}
            onPress={() => selectTab(item)}
          >
            <Text
              style={[
                styles.itemText,
                item.title == tabTitle && { color: COLOR.lightBlue },
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.contentWrapper}>
          {tabTitle == "All" ? (
            <View>
              {allBlogs.length > 0 ? (
                <>
                  {allBlogs.map((blog) => (
                    <SingleBlog key={blog.id} blog={blog} />
                  ))}
                </>
              ) : (
                <EmptyTimeline title="No Blog" />
              )}
            </View>
          ) : tabTitle == "For you" ? (
            <View>
              <Text>For you</Text>
            </View>
          ) : (
            <View>
              <Text>Other</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default Tab;

const EmptyTimeline = ({ title }) => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    width: Width,
    flexDirection: "row",
  },
  itemStyle: {
    width: Width / 3,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
  },
  borderRightStyle: {
    borderRightColor: "#bbb",
    borderRightWidth: 1,
  },
  activeStyle: {
    width: Width / 3,
    height: 53,
    borderBottomColor: COLOR.lightBlue,
    borderBottomWidth: 3,
  },
  contentWrapper: {
    // paddingVertical: 20,
    paddingBottom: 20,
    paddingTop: 10,
  },
  invitedTExt: {
    fontFamily: "Poppins-Regular",
    fontSize: 15,
    letterSpacing: 1,
    borderBottomColor: COLOR.gray,
    borderBottomWidth: 1,
    marginBottom: 12,
    paddingBottom: 5,
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  emptyText: { fontFamily: "Poppins-Regular", fontSize: 17 },

  horizontalPadding: {
    paddingHorizontal: 10,
  },
});
