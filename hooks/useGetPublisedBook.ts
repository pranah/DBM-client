import { useCallback, useState } from "react";

import axios from "axios";
import { ethers } from "ethers";

import useMoralisInit from "./useMoralisInit";
import { getNewMoralisUrl } from "../utils";

export const useGetPublisedBook = () => {
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");
  const [bookList, setBookList] = useState([]);
  const { Moralis } = useMoralisInit();

  const getBooks = useCallback(async () => {
    const query = new Moralis.Query("BookPublished");
    try {
      setisLoading(true);
      const books = await query.find();
      const booksResponse = books.map((book) => book.attributes);

      const items = await Promise.all(
        booksResponse.map(async (i) => {
          const meta = await axios.get(getNewMoralisUrl(i.bookCoverAndDetails));
          let price = ethers.utils.formatUnits(i.price.toString(), "ether");
          let item = {
            price,
            displayPrice: price,
            image: meta.data.image,
            file: meta.data.file,
            name: meta.data.name,
            description: meta.data.description,
            author: meta.data.author,
            isbn: meta.data.isbn,
            publisher: meta.data.publisher,
            royalty: meta.data.royalty,
            genre: meta.data.genre,
          };
          return item;
        })
      );
      setBookList(items);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);

      setError("Error while fetching the books");
    }
  }, [Moralis.Query]);
  return {
    books: bookList,
    isLoading,
    error,
    getBooks,
  };
};
