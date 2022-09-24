import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { ListCard } from "../../components/Card";
import EmptyListPlaceholder from "../../components/EmptyListPlaceholder";
import Loader from "../../components/Loader";
import ScreenContainer from "../../components/ScreenContainer";
import axios from "../../utils/axios";

const SoldBooksScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchSoldBooks();
    setRefreshing(false);
  };

  const fetchSoldBooks = async () => {
    try {
      const { data } = await axios.get("/users/me/sale");
      setBooks(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleBookAlteration = async (id) => {
    try {
      await axios.post("/sales/markSold/" + id);
      const changedBooks = [...books];
      const index = changedBooks.findIndex((book) => book._id === id);
      changedBooks[index].active = false;
      setBooks(changedBooks);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookUpdation = (item) => {
    navigation.replace("UploadBookScreen", {
      screen: "UploadBookBaseScreen",
      params: {
        bookState: {
          id: item._id,
          condition: item.condition,
          amount: item.amount.toString(),
          course_name: item.course_name,
          course_code: item.course_code,
          pictures: item.pictures,
          ...item.book,
        },
      },
    });
  };

  const handleBookDeletion = async (id) => {
    try {
      await axios.delete("/sales/" + id);
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      fetchSoldBooks();
      return () => {
        isActive = false;
      };
    }, [])
  );

  if (!loading && books.length === 0) {
    return (
      <EmptyListPlaceholder>
        You haven't sold any books in the past yet
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
          renderItem={({ item }) =>
            item.active ? (
              <TouchableOpacity
                onPress={() => navigation.push("Details", { id: item._id })}
                activeOpacity={1}
                underlayColor="#eee"
              >
                <ListCard
                  handleBookAlteration={handleBookAlteration}
                  handleBookDeletion={handleBookDeletion}
                  handleBookUpdation={handleBookUpdation}
                  item={item}
                />
              </TouchableOpacity>
            ) : (
              <ListCard
                handleBookAlteration={handleBookAlteration}
                handleBookDeletion={handleBookDeletion}
                handleBookUpdation={handleBookUpdation}
                item={item}
              />
            )
          }
        />
      </ScreenContainer>
    </SafeAreaView>
  );
};

export default SoldBooksScreen;
