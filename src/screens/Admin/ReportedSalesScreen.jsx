import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { FlatList, SafeAreaView, RefreshControl } from "react-native";
import EmptyListPlaceholder from "../../components/EmptyListPlaceholder";
import Loader from "../../components/Loader";
import ScreenContainer from "../../components/ScreenContainer";
import axios from "../../utils/axios";
import { AdminListCard } from "../../components/AdminCard";
import {
  connectActionSheet,
  useActionSheet,
} from "@expo/react-native-action-sheet";

const ReportedSalesScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { showActionSheetWithOptions } = useActionSheet();

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchReportedBooks();
    setRefreshing(false);
  };

  const fetchReportedBooks = async () => {
    try {
      const { data } = await axios.get("/admin/sales/reports");
      setBooks(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onOpenActionSheet = (id) => {
    showActionSheetWithOptions(
      {
        options: ["Delete Report", "Delete Book", "Cancel"],
        cancelButtonIndex: 2,
        destructiveButtonIndex: 1,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          deleteReport(id);
        }
        if (buttonIndex === 1) {
          deleteItem(id);
        }
      }
    );
  };

  const deleteReport = async (id) => {
    try {
      await axios.delete("/requests/" + id);
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete("/admin/sales/" + id);
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      fetchReportedBooks();
      return () => {
        isActive = false;
      };
    }, [])
  );

  if (!loading && books.length === 0) {
    return (
      <EmptyListPlaceholder>
        There aren't any reported books in this platform yet!
      </EmptyListPlaceholder>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenContainer>
        <Loader loading={loading} />
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          keyExtractor={({ _id }) => _id}
          data={books}
          renderItem={({ item }) => (
            <AdminListCard
              navigation={navigation}
              handleBookDeletion={onOpenActionSheet}
              item={item}
            />
          )}
        />
      </ScreenContainer>
    </SafeAreaView>
  );
};

export default ReportedSalesScreen;
