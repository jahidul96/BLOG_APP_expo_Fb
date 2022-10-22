import { onAuthStateChanged } from "firebase/auth";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import React, { useCallback, useEffect, useState } from "react";
import Context, { AuthContext } from "./context/Context";
import Home from "./src/screens/home/Home";
import Register from "./src/screens/auth/Register";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { auth } from "./firebase/firebase";
import Login from "./src/screens/auth/Login";
import ResetPassword from "./src/screens/auth/ResetPassword";
import BlogDetails from "./src/screens/blog/BlogDetails";
import Account from "./src/screens/account/Account";
import Profile from "./src/screens/profile/Profile";
import PostBlog from "./src/screens/blog/PostBlog";
import Favorites from "./src/screens/favorite/Favorites";
import FavoriteContext from "./context/FavoriteContext";
import SearchedBlog from "./src/screens/blog/SearchedBlog";

const Stack = createNativeStackNavigator();

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  const [authUser, setAuthUser] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);
  const [favoriteBlogs, setFavoriteBlogs] = useState(null);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
          "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
          "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        // console.log("user", user);
      } else {
        console.log("not logged in user");
      }
    });
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <Context.Provider value={{ loggedUser, setLoggedUser }}>
      <AuthContext.Provider value={{ authUser, setAuthUser }}>
        <FavoriteContext.Provider value={{ favoriteBlogs, setFavoriteBlogs }}>
          <NavigationContainer onLayout={onLayoutRootView}>
            {authUser ? (
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="BlogDetails" component={BlogDetails} />
                <Stack.Screen name="ResetPassword" component={ResetPassword} />
                <Stack.Screen name="Account" component={Account} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="PostBlog" component={PostBlog} />
                <Stack.Screen name="Favorites" component={Favorites} />
                <Stack.Screen name="SearchedBlog" component={SearchedBlog} />
              </Stack.Navigator>
            ) : (
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="ResetPassword" component={ResetPassword} />
              </Stack.Navigator>
            )}
          </NavigationContainer>
        </FavoriteContext.Provider>
      </AuthContext.Provider>
    </Context.Provider>
  );
};
export default App;
