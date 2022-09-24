import axios from "axios";

export const searchBookByISBN = async (isbn) => {
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
    );

    if (data.totalItems !== 0) {
      const result = {
        title: data.items[0].volumeInfo.title,
        authors: data.items[0].volumeInfo.authors.join(","),
      };

      return result;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
