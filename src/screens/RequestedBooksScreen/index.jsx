import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { FlatList, SafeAreaView, RefreshControl } from "react-native";
import { ListCard } from "../../components/Card";
import EmptyListPlaceholder from "../../components/EmptyListPlaceholder";
import Loader from "../../components/Loader";
import ScreenContainer from "../../components/ScreenContainer";
import axios from "../../utils/axios";

const RequestedBooksScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchRequestedBooks();
    setRefreshing(false);
  };

  const fetchRequestedBooks = async () => {
    try {
      const { data } = await axios.get("/users/me/requests");
      setBooks(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleBookAlteration = async (id) => {
    try {
      await axios.post("/requests/markFound/" + id);
      const changedBooks = [...books];
      const index = changedBooks.findIndex((book) => book._id === id);
      changedBooks[index].active = false;
      setBooks(changedBooks);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleBookDeletion = async (id) => {
    try {
      await axios.delete("/requests/" + id);
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleBookUpdation = (item) => {
    navigation.replace("RequestBookScreen", {
      screen: "RequestBookBaseScreen",
      params: {
        bookState: {
          id: item._id,
          course_name: item.course_name,
          course_code: item.course_code,
          ...item.book,
        },
      },
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      fetchRequestedBooks();
      return () => {
        isActive = false;
      };
    }, [])
  );

  if (!loading && books.length === 0) {
    return (
      <EmptyListPlaceholder>
        You haven't requested any books in the past yet
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
          data={books.sort((a, b) => b.active - a.active)}
          renderItem={({ item }) => (
            <ListCard
              handleBookAlteration={handleBookAlteration}
              handleBookDeletion={handleBookDeletion}
              handleBookUpdation={handleBookUpdation}
              requests
              item={item}
            />
          )}
        />
      </ScreenContainer>
    </SafeAreaView>
  );
};

export default RequestedBooksScreen;
