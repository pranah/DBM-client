import React, { createContext, useState } from "react";

interface BookDetails {
  isbn: string;
  tokenId: string;
  bookUrl: string;
}

export const BookDetailsContext = createContext({
  bookDetails: {
    isbn: "",
    tokenId: "",
    bookUrl: "",
  },
  updateBookDetails: (updatedBookDetails: BookDetails) => {},
});

const BookDetailsProvider = ({ children }) => {
  const [bookDetails, setBookDetails] = useState<BookDetails>({
    isbn: "",
    tokenId: "",
    bookUrl: "",
  });
  const updateBookDetails = (updatedBookDetails: BookDetails) => {
    setBookDetails(updatedBookDetails);
  };
  return (
    <BookDetailsContext.Provider value={{ bookDetails, updateBookDetails }}>
      {children}
    </BookDetailsContext.Provider>
  );
};

export default BookDetailsProvider;
