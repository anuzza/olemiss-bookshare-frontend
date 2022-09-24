import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Alert,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import FloatingButton from "../../components/FloatingButton";
import HorizontalLine from "../../components/HorizontalLine";
import { Ionicons } from "@expo/vector-icons";
import { sendEmail, sendSMS } from "../../utils/contact";
import { useFocusEffect } from "@react-navigation/native";
import axios from "../../utils/axios";
import Loader from "../../components/Loader";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../../redux/actions/auth";
import { Caption } from "react-native-paper";
import { openTwoButtonAlert } from "../../utils/alert";

const height = Dimensions.get("window").height;

const DetailsScreen = ({ navigation, route }) => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const bookmarkExists =
    user.bookmarks.find((bookmark) => bookmark === book?._id) !== undefined;

  const dispatch = useDispatch();
  const notAllowed = (book && user._id === book.seller._id) || user.isAdmin;

  const fetchBook = async (id) => {
    try {
      const { data } = await axios.get("/sales/" + id);
      setBook(data);
      setLoading(false);
    } catch (error) {
      Alert.alert(
        error?.response?.data ? error.response.data.error : error.message
      );
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      fetchBook(route?.params?.id);
      return () => {
        isActive = false;
      };
    }, [route])
  );

  const handleBookmarks = async () => {
    try {
      if (bookmarkExists) {
        await axios.delete("/users/bookmark/" + book?._id);
        dispatch(loadUser());
      } else {
        await axios.post("/users/bookmark/" + book?._id);
        dispatch(loadUser());
      }
    } catch (error) {
      Alert.alert(
        error?.response?.data ? error.response.data.error : error.message
      );
    }
  };

  const handleReport = async () => {
    try {
      await axios.post("/sales/report/" + book?._id);
      Alert.alert("Book reported succesfully");
    } catch (error) {
      Alert.alert(
        error?.response?.data ? error.response.data.error : error.message
      );
    }
  };

  return (
    <ScrollView style={{ flex: 1, flexDirection: "column" }}>
      <Loader loading={loading} />
      <StatusBar hidden={true} />
      <View style={{ position: "relative" }}>
        <Image
          style={styles.image}
          source={{
            uri: book && book.pictures[0],
          }}
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="close" size={20} style={styles.alignedText}>
            Close
          </Ionicons>
        </TouchableOpacity>
        {book && user._id !== book.seller._id && !user.isAdmin && (
          <TouchableOpacity
            onPress={() => {
              openTwoButtonAlert(
                "Are you sure you want to report this book?",
                handleReport
              );
            }}
            style={styles.reportButton}
          >
            <Caption
              style={{
                color: "#fff",
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              Report
            </Caption>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.container}>
        {!notAllowed && (
          <View style={styles.bookmarkIcon}>
            <FloatingButton
              onPress={handleBookmarks}
              color="#fff"
              backgroundColor="#eec643"
              iconName={!bookmarkExists ? "bookmark-outline" : "bookmark"}
            />
          </View>
        )}
        <View style={styles.types}>
          <Text style={styles.type}>ISBN: {book && book.book.isbn}</Text>
          <Text style={styles.type}>
            {book && book.course_name} {book && book.course_code}
          </Text>
        </View>
        <HorizontalLine marginTop={10} marginBottom={10} />
        <Text style={styles.title}>{book && book?.book.title}</Text>
        <View style={styles.organizerInfo}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.infoText}>Posted By </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.push("Profile", { id: book?.seller?._id })
              }
            >
              <Text style={styles.organizer}>{book?.seller.name}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.infoText}>
            {book && moment(book.updatedAt).fromNow()}
          </Text>
        </View>
        <HorizontalLine marginTop={10} marginBottom={10} />
        <View style={styles.amountConditionContainer}>
          <View style={styles.amountConditionInfo}>
            <Text style={styles.amountConditionKey}>Price</Text>
            <Text style={styles.amountConditionValue}>
              ${book?.amount.toFixed(2)}
            </Text>
          </View>
          <View style={styles.amountConditionInfo}>
            <Text style={styles.amountConditionKey}>Condition</Text>
            <Text style={styles.amountConditionValue}>{book?.condition}</Text>
          </View>
          <View style={styles.amountConditionInfo}>
            <Text style={styles.amountConditionKey}>Edition</Text>
            <Text style={styles.amountConditionValue}>
              {book?.book?.edition}
            </Text>
          </View>
        </View>
        <View style={styles.authorInfo}>
          <Text style={styles.authorKey}>Authors</Text>

          <View style={styles.authorValue}>
            {book &&
              book.book?.authors.map((author) => (
                <Text key={author} style={styles.type}>
                  {author}
                </Text>
              ))}
          </View>
        </View>
        <HorizontalLine marginTop={15} marginBottom={10} />
        {!notAllowed && (
          <View style={styles.contactContainer}>
            <Text style={styles.contactOptions}>Contact Via: </Text>
            <View style={styles.buttonContainer}>
              <FloatingButton
                onPress={() =>
                  sendEmail(book?.seller?.email, book?.book?.title)
                }
                iconName="mail"
                size={30}
                backgroundColor="#000"
                color="#fff"
              />
              {book?.seller?.contact_number?.visibility &&
                book?.seller?.contact_number?.value && (
                  <FloatingButton
                    onPress={() =>
                      sendSMS(
                        book?.seller?.contact_number?.value,
                        book?.book?.title
                      )
                    }
                    marginLeft={20}
                    iconName="chatbubble"
                    size={30}
                    backgroundColor="#000"
                    color="#fff"
                  />
                )}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: height * 0.4,
    opacity: 0.9,
  },
  backButton: {
    position: "absolute",
    color: "#fff",
    top: 40,
    left: 10,
  },
  container: {
    flex: 1,
    position: "relative",
    padding: 12,
  },
  bookmarkIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -35,
    right: 20,
  },
  types: {
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  type: {
    fontSize: 12,
    color: "#74758C",
    textAlign: "center",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#d6d7db",
    marginRight: 10,
    borderRadius: 5,
    paddingHorizontal: 7,
    paddingVertical: 8,
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    flexWrap: "wrap",
  },
  organizerInfo: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
  },
  infoText: {
    color: "#74758C",
    fontSize: 16,
  },
  organizer: {
    color: "#fa824c",
    fontWeight: "bold",
    fontSize: 16,
    alignSelf: "center",
  },
  amountConditionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  amountConditionInfo: {
    flexDirection: "column",
    height: 50,
    justifyContent: "space-between",
  },
  amountConditionKey: {
    fontSize: 16,
    color: "#74758C",
  },
  amountConditionValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  reportButton: {
    position: "absolute",
    color: "#fff",
    top: 40,
    right: 10,
  },
  authorInfo: {
    marginTop: 25,
    flexDirection: "column",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  authorKey: {
    alignSelf: "center",
    fontSize: 16,
    color: "#74758C",
  },
  authorValue: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  contactContainer: {
    marginTop: 10,
  },

  contactOptions: {
    fontSize: 18,
    alignSelf: "center",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  contactButton: {
    backgroundColor: "#000",
    alignSelf: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  alignedText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default DetailsScreen;
