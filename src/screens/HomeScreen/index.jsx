import React, { useState } from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import Card from "../../components/Card";
import EmptyListPlaceholder from "../../components/EmptyListPlaceholder";
import FloatingButton from "../../components/FloatingButton";
import SearchBarHeader from "../../components/SearchBarHeader";
import { useFocusEffect } from "@react-navigation/native";
import axios from "../../utils/axios";
import Loader from "../../components/Loader";

const HomeScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchBooks();
    setRefreshing(false);
  };

  const fetchBooks = async () => {
    try {
      const { data } = await axios.get("/sales");
      setBooks(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
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

  const handleSearch = (text) => {
    setText(text);
  };

  const filteredBooks = books.filter(
    (book) =>
      book.book.title.toLowerCase().includes(text.toLowerCase()) ||
      book.course_name.toLowerCase().includes(text.toLowerCase()) ||
      book.course_code.toLowerCase().includes(text.toLowerCase()) ||
      book.book.isbn.toLowerCase().includes(text.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <SearchBarHeader navigation={navigation} handleSearch={handleSearch} />
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
            data={filteredBooks}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.push("Details", { id: item._id })}
                  activeOpacity={1}
                  underlayColor="#eee"
                >
                  <Card navigation={navigation} item={item} />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          bottom: 15,
          right: 10,
        }}
      >
        <FloatingButton
          onPress={() => navigation.push("UploadBookScreen")}
          color="#fafafa"
          backgroundColor="#3c91e6"
          iconName="add"
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
