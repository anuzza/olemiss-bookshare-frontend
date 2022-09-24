import React, { useState } from "react";
import { FlatList, SafeAreaView, RefreshControl } from "react-native";
import EmptyListPlaceholder from "../../components/EmptyListPlaceholder";
import ScreenContainer from "../../components/ScreenContainer";
import { useFocusEffect } from "@react-navigation/native";
import axios from "../../utils/axios";
import Loader from "../../components/Loader";
import AdminCard from "../../components/AdminCard";

const FeedScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchBooks();
    setRefreshing(false);
  };

  const fetchBooks = async () => {
    try {
      const { data } = await axios.get("/admin/requests");
      setBooks(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleBookDeletion = async (id) => {
    try {
      await axios.delete("/admin/requests/" + id);
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      fetchBooks();
      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenContainer>
        <Loader loading={loading} />
        {!loading && books.length === 0 ? (
          <EmptyListPlaceholder>
            Currently, there aren't any requested books in the platform
          </EmptyListPlaceholder>
        ) : (
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            keyExtractor={({ _id }) => _id}
            data={books}
            renderItem={({ item }) => {
              return (
                <AdminCard
                  handleBookDeletion={handleBookDeletion}
                  navigation={navigation}
                  item={item}
                  feed
                />
              );
            }}
          />
        )}
      </ScreenContainer>
    </SafeAreaView>
  );
};

export default FeedScreen;
