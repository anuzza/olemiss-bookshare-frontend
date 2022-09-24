import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons as Icon } from "@expo/vector-icons";
import {
  FeedStackScreen,
  HomeStackScreen,
  SellBookStackScreen,
} from "../RootStackScreen/StackScreens";
import {
  AdminFeedStackScreen,
  AdminHomeStackScreen,
  AdminUserStackScreen,
} from "../RootStackScreen/AdminScreens";

const Tab = createBottomTabNavigator();

const MainTabScreen = ({ user }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#000",
        },
      }}
      initialRouteName="Home"
      shifting={false}
    >
      {user && !user.isAdmin ? (
        <>
          <Tab.Screen
            name="HomeTab"
            component={HomeStackScreen}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color }) => (
                <Icon name="ios-home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="SellTab"
            component={SellBookStackScreen}
            options={{
              tabBarLabel: "Sell",
              tabBarIcon: ({ color }) => (
                <Icon name="ios-camera" color={color} size={26} />
              ),
            }}
          />

          <Tab.Screen
            name="FeedTab"
            component={FeedStackScreen}
            options={{
              tabBarLabel: "Request",
              tabBarIcon: ({ color }) => (
                <Icon name="ios-pricetag" color={color} size={26} />
              ),
            }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name="HomeTab"
            component={AdminHomeStackScreen}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color }) => (
                <Icon name="ios-home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="AdminUsersTab"
            component={AdminUserStackScreen}
            options={{
              tabBarLabel: "Users",
              tabBarIcon: ({ color }) => (
                <Icon name="ios-camera" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="AdminFeedTab"
            component={AdminFeedStackScreen}
            options={{
              tabBarLabel: "Requests",
              tabBarIcon: ({ color }) => (
                <Icon name="ios-pricetag" color={color} size={26} />
              ),
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};
export default MainTabScreen;
