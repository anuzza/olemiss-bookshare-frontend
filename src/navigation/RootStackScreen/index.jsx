import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { verticalAnimation } from "../../constants/animation";
import Drawer from "../DrawerScreen";
import {
  AuthStackScreen,
  BookmarksStackScreen,
  ProfileStackScreen,
  RequestABookStackScreen,
  RequestedBooksStackScreen,
  SellBookStackScreen,
  SoldBooksStackScreen,
  UploadABookStackScreen,
} from "./StackScreens";

import {
  AdminReportedRequestsStackScreen,
  AdminReportedSalesStackScreen,
  AdminReportedUsersStackScreen,
} from "./AdminScreens";

const RootStack = createStackNavigator();

const RootStackScreen = ({ userToken, user }) => (
  <RootStack.Navigator
    screenOptions={{
      headerShown: false,
      ...verticalAnimation,
    }}
  >
    {userToken ? (
      <>
        <RootStack.Screen
          name="App"
          options={{
            animationEnabled: false,
            headerShown: false,
          }}
        >
          {(props) => <Drawer user={user} {...props} />}
        </RootStack.Screen>

        {user && !user.isAdmin ? (
          <>
            <RootStack.Screen
              name="ProfileScreen"
              component={ProfileStackScreen}
            />
            <RootStack.Screen
              name="BookmarksScreen"
              component={BookmarksStackScreen}
            />
            <RootStack.Screen
              name="SoldBooksScreen"
              component={SoldBooksStackScreen}
            />
            <RootStack.Screen
              name="RequestedBooksScreen"
              component={RequestedBooksStackScreen}
            />
            <RootStack.Screen
              name="UploadBookScreen"
              component={UploadABookStackScreen}
            />
            <RootStack.Screen
              name="SellBookScreen"
              component={SellBookStackScreen}
            />
            <RootStack.Screen
              name="RequestBookScreen"
              component={RequestABookStackScreen}
            />
          </>
        ) : (
          <>
            <RootStack.Screen
              name="ReportedUsersScreen"
              component={AdminReportedUsersStackScreen}
            />
            <RootStack.Screen
              name="ReportedSalesScreen"
              component={AdminReportedSalesStackScreen}
            />
            <RootStack.Screen
              name="ReportedRequestsScreen"
              component={AdminReportedRequestsStackScreen}
            />
          </>
        )}
      </>
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false,
        }}
      />
    )}
  </RootStack.Navigator>
);

export default RootStackScreen;
