import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons as Icon } from "@expo/vector-icons";
import SigninScreen from "../../screens/Auth/SigninScreen";
import CreateAccountScreen from "../../screens/Auth/CreateAccountScreen";
import LandingScreen from "../../screens/LandingScreen";
import HomeScreen from "../../screens/HomeScreen";
import DetailsScreen from "../../screens/DetailsScreen";
import BookmarksScreen from "../../screens/BookmarksScreen";
import SoldBooksScreen from "../../screens/SoldBooksScreen";
import RequestedScreen from "../../screens/RequestedFeedScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import EditProfileScreen from "../../screens/EditProfileScreen";
import RequestedBooksScreen from "../../screens/RequestedBooksScreen";
import {
  horizontalAnimation,
  verticalAnimation,
} from "../../constants/animation";
import {
  BaseScreen as UploadBookBaseScreen,
  SecondaryScreen as UploadBookSecondaryScreen,
  FinalScreen as UploadBookFinalScreen,
  CameraScreen as UploadBookCameraScreen,
} from "../../screens/UploadABookScreen";

import {
  BaseScreen as RequestBookBaseScreen,
  SecondaryScreen as RequestBookSecondaryScreen,
  FinalScreen as RequestBookFinalScreen,
} from "../../screens/RequestABookScreen";
import BarCodeScannerScreen from "../../screens/BarCodeScannerScreen";

const AuthStack = createStackNavigator();
export const AuthStackScreen = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
    }}
  >
    <AuthStack.Screen
      name="LandingScreen"
      component={LandingScreen}
      options={{
        headerShown: false,
      }}
    />
    <AuthStack.Screen
      name="SignInScreen"
      component={SigninScreen}
      options={{ title: "Sign In" }}
    />
    <AuthStack.Screen
      name="CreateAccountScreen"
      component={CreateAccountScreen}
      options={{ title: "Create Account" }}
    />
  </AuthStack.Navigator>
);

const HomeStack = createStackNavigator();
export const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      ...verticalAnimation,
    }}
  >
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerShown: false,
      }}
    />

    <HomeStack.Screen
      name="Details"
      options={{
        headerShown: false,
      }}
      component={DetailsScreen}
    />
    <HomeStack.Screen
      name="Profile"
      options={{
        headerShown: false,
      }}
      component={ProfileScreen}
    />
  </HomeStack.Navigator>
);

const FeedStack = createStackNavigator();
export const FeedStackScreen = ({ navigation }) => (
  <FeedStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
    }}
  >
    <FeedStack.Screen
      name="Feed"
      component={RequestedScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="menu-outline"
            size={25}
            color="#000"
            backgroundColor="#fff"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
        headerShown: true,
      }}
    />
    <FeedStack.Screen
      name="Profile"
      options={{
        headerShown: false,
      }}
      component={ProfileScreen}
    />
    <FeedStack.Screen
      name="Details"
      options={{
        headerShown: false,
      }}
      component={DetailsScreen}
    />
  </FeedStack.Navigator>
);

const BookmarksStack = createStackNavigator();
export const BookmarksStackScreen = ({ navigation }) => (
  <BookmarksStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      ...verticalAnimation,
    }}
  >
    <BookmarksStack.Screen
      name="Bookmarks"
      options={{
        headerLeft: () => (
          <Icon.Button
            name="close"
            size={25}
            color="#000"
            backgroundColor="#fff"
            onPress={() => navigation.goBack()}
          ></Icon.Button>
        ),
        headerShown: true,
      }}
      component={BookmarksScreen}
    />
    <BookmarksStack.Screen
      name="Details"
      options={{
        headerShown: false,
      }}
      component={DetailsScreen}
    />
    <BookmarksStack.Screen
      name="Profile"
      options={{
        headerShown: false,
      }}
      component={ProfileScreen}
    />
  </BookmarksStack.Navigator>
);

const RequestedBooksStack = createStackNavigator();
export const RequestedBooksStackScreen = ({ navigation }) => (
  <RequestedBooksStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
    }}
  >
    <RequestedBooksStack.Screen
      name="RequestedBooks"
      options={{
        title: "Requested Books",
        headerLeft: () => (
          <Icon.Button
            name="close"
            size={25}
            color="#000"
            backgroundColor="#fff"
            onPress={() => navigation.goBack()}
          ></Icon.Button>
        ),
        headerShown: true,
      }}
      component={RequestedBooksScreen}
    />
  </RequestedBooksStack.Navigator>
);

const SoldBooksStack = createStackNavigator();
export const SoldBooksStackScreen = ({ navigation }) => (
  <SoldBooksStack.Navigator
    screenOptions={{
      ...verticalAnimation,
      headerBackTitleVisible: false,
    }}
  >
    <SoldBooksStack.Screen
      name="SoldBooks"
      options={{
        title: "Sold Books",
        headerLeft: () => (
          <Icon.Button
            name="close"
            size={25}
            color="#000"
            backgroundColor="#fff"
            onPress={() => navigation.goBack()}
          ></Icon.Button>
        ),
        headerShown: true,
      }}
      component={SoldBooksScreen}
    />
    <SoldBooksStack.Screen
      name="Details"
      options={{
        headerShown: false,
      }}
      component={DetailsScreen}
    />
    <SoldBooksStack.Screen
      name="Profile"
      options={{
        headerShown: false,
      }}
      component={ProfileScreen}
    />
  </SoldBooksStack.Navigator>
);

const ProfileStack = createStackNavigator();
export const ProfileStackScreen = ({ navigation }) => (
  <ProfileStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      ...horizontalAnimation,
    }}
  >
    <ProfileStack.Screen
      name="Profile"
      options={{
        headerShown: false,
      }}
      component={ProfileScreen}
    />
    <ProfileStack.Screen
      name="Details"
      options={{
        headerShown: false,
      }}
      component={DetailsScreen}
    />
    <ProfileStack.Screen
      name="Edit Profile"
      options={{
        headerShown: true,
      }}
      component={EditProfileScreen}
    />
  </ProfileStack.Navigator>
);

const UploadABookStack = createStackNavigator();
export const UploadABookStackScreen = ({ navigation }) => (
  <UploadABookStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      ...horizontalAnimation,
    }}
  >
    <UploadABookStack.Screen
      name="UploadBookBaseScreen"
      options={{
        title: "Upload A Book",
        headerShown: true,
        headerLeft: () => (
          <Icon.Button
            name="close"
            size={25}
            color="#000"
            backgroundColor="#fff"
            onPress={() => navigation.goBack()}
          ></Icon.Button>
        ),
      }}
      component={UploadBookBaseScreen}
    />
    <UploadABookStack.Screen
      name="UploadBookSecondaryScreen"
      options={{
        title: "Book Info",
        headerShown: true,
      }}
      component={UploadBookSecondaryScreen}
    />
    <UploadABookStack.Screen
      name="UploadBookFinalScreen"
      options={{
        title: "More Info",
        headerShown: true,
      }}
      component={UploadBookFinalScreen}
    />
    <UploadABookStack.Screen
      name="UploadBookCameraScreen"
      options={{
        title: "Finish",
        headerShown: true,
      }}
      component={UploadBookCameraScreen}
    />
  </UploadABookStack.Navigator>
);

const RequestABookStack = createStackNavigator();
export const RequestABookStackScreen = ({ navigation }) => (
  <RequestABookStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      ...horizontalAnimation,
    }}
  >
    <RequestABookStack.Screen
      name="RequestBookBaseScreen"
      options={{
        title: "Request A Book",
        headerShown: true,
        headerLeft: () => (
          <Icon.Button
            name="close"
            size={25}
            color="#000"
            backgroundColor="#fff"
            onPress={() => navigation.goBack()}
          ></Icon.Button>
        ),
      }}
      component={RequestBookBaseScreen}
    />
    <RequestABookStack.Screen
      name="RequestBookSecondaryScreen"
      options={{
        title: "Book Info",
        headerShown: true,
      }}
      component={RequestBookSecondaryScreen}
    />
    <RequestABookStack.Screen
      name="RequestBookFinalScreen"
      options={{
        title: "Finish",
        headerShown: true,
      }}
      component={RequestBookFinalScreen}
    />
  </RequestABookStack.Navigator>
);

const SellBookStack = createStackNavigator();
export const SellBookStackScreen = ({ navigation }) => (
  <SellBookStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      ...horizontalAnimation,
    }}
  >
    <SellBookStack.Screen
      name="BarCodeScannerScreen"
      options={{
        headerShown: false,
      }}
      component={BarCodeScannerScreen}
    />
    <SellBookStack.Screen
      name="UploadBookBaseScreen"
      options={{
        title: "Upload A Book",
        headerShown: true,
      }}
      component={UploadBookBaseScreen}
    />
    <SellBookStack.Screen
      name="UploadBookSecondaryScreen"
      options={{
        title: "Book Info",
        headerShown: true,
      }}
      component={UploadBookSecondaryScreen}
    />
    <SellBookStack.Screen
      name="UploadBookFinalScreen"
      options={{
        title: "More Info",
        headerShown: true,
      }}
      component={UploadBookFinalScreen}
    />
    <SellBookStack.Screen
      name="UploadBookCameraScreen"
      options={{
        title: "More Info",
        headerShown: true,
      }}
      component={UploadBookCameraScreen}
    />
  </SellBookStack.Navigator>
);
