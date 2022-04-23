import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";

import { PDP } from "../../components/pdp/pdp";
import useMoralisInit from "../../hooks/useMoralisInit";
import { useBuyBook } from "../../hooks/useBuyBook";
import Loader from "../../components/loader/Loader";
import { ProductDetailButtonSectionMyBook } from "../../components/ProductDetailButtonSectionMyBook/ProductDetailButtonSectionMyBook";

const Buy = () => {
  const [books, setBooks] = useState(null);
  const [loading, setLoading] = useState(false);

  const { Moralis } = useMoralisInit();
  const { buyBook, loading: loadingBookState } = useBuyBook(books);
  const router = useRouter();

  const getBookById = useCallback(async () => {
    setLoading(true);
    const { isbn } = router.query;

    const BookPublished = Moralis.Object.extend("BookPublished");
    const query = new Moralis.Query(BookPublished);
    query.equalTo("isbn", isbn);
    const bookObj = await query.first();
    const bookAttributes = bookObj.attributes;
    const meta = await axios.get(bookAttributes.bookCoverAndDetails);
    const price = ethers.utils.formatUnits(
      bookAttributes.price.toString(),
      "ether"
    );
    const product = {
      price,
      image: meta.data.image,
      name: meta.data.name,
      description: meta.data.description,
      author: meta.data.author,
      isbn: meta.data.isbn,
      publisher: meta.data.publisher,
      genre: meta.data.genre,
      language: meta.data.language,
    };
    setBooks(product);
    setLoading(false);
  }, [Moralis.Object, Moralis.Query, router.query]);

  useEffect(() => {
    const { isbn } = router.query;
    if (isbn) getBookById();
  }, [getBookById, router.query]);

  const bookDetails = {
    title: books?.name || "",
    author: books?.author || "",
  };

  return (
    <>
      {loading || loadingBookState ? (
        <Loader />
      ) : (
        <>
          {books && (
            <PDP
              buyProductSection={() => (
                <ProductDetailButtonSectionMyBook bookDetails={bookDetails} />
              )}
              productDetails={books}
            />
          )}
        </>
      )}
    </>
  );
};

export default Buy;
