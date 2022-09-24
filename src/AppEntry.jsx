import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStackScreen from "../src/navigation/RootStackScreen";
import { loadUser } from "./redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { CustomDefaultTheme } from "../src/themes/colors";
import Loader from "./components/Loader";

const AppEntry = () => {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    dispatch(loadUser());
  }, []);
  if (isLoading) {
    return <Loader loading={isLoading} />;
  }

  return (
    <NavigationContainer theme={CustomDefaultTheme}>
      <RootStackScreen user={user} userToken={userToken} />
    </NavigationContainer>
  );
};

export default AppEntry;
