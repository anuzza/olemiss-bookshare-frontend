import React, { useState } from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import EmptyListPlaceholder from "../../components/EmptyListPlaceholder";
import { useFocusEffect } from "@react-navigation/native";
import axios from "../../utils/axios";
import Loader from "../../components/Loader";
import AdminCard from "../../components/AdminCard";

const HomeScreen = ({ navigation }) => {
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
      const { data } = await axios.get("/admin/sales");
      setBooks(data);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
      setLoading(false);
    }
  };

  const handleBookDeletion = async (id) => {
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

      fetchBooks();
      return () => {
        isActive = false;
      };
    }, [])
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Loader loading={loading} />
      {!loading && books.length === 0 ? (
        <EmptyListPlaceholder>
          Currently, there aren't any books for sale in the platform
        </EmptyListPlaceholder>
      ) : (
        <View style={{ flex: 1, backgroundColor: "#fafafa" }}>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            keyExtractor={({ _id }) => _id}
            data={books}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.push("Details", { id: item._id })}
                  activeOpacity={1}
                  underlayColor="#eee"
                >
                  <AdminCard
                    handleBookDeletion={handleBookDeletion}
                    navigation={navigation}
                    item={item}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
