import { useRouter } from "next/router";

import { PDP } from "../../components/pdp/pdp";
import { useGetMyBookDetails } from "../../hooks/useGetMyBookDetails";
import Loader from "../../components/loader/Loader";
import {
  ProductDetailButtonSectionMyBook,
  RoundedButton,
} from "../../components/ProductDetailButtonSectionMyBook/ProductDetailButtonSectionMyBook";

const MyBook = () => {
  const router = useRouter();
  const tokenId = router.query.tokenId as string;
  const { isLoading, book, isUpForRenting } = useGetMyBookDetails(tokenId);

  //

  const bookDetails = {
    title: book?.name || "",
    author: book?.author || "",
    isUpForRenting: !!isUpForRenting,
    isUpForResale: book?.isUpForResale,
  };

  console.log("this is the book", book);

  const onReadBook = () => {
    router.push(`/reader/${book.isbn}?tokenId=${tokenId}`);
  };

  return (
    <>
      {isLoading && <Loader />}
      <>
        {book && (
          <PDP
            readBookButton={() => (
              <RoundedButton
                sx={{ mt: 1 }}
                fullWidth
                variant="contained"
                size="large"
                onClick={onReadBook}
              >
                Read Book
              </RoundedButton>
            )}
            buyProductSection={() => (
              <>
                {bookDetails.isUpForRenting ||
                bookDetails.isUpForResale ? null : (
                  <ProductDetailButtonSectionMyBook bookDetails={bookDetails} />
                )}
              </>
            )}
            productDetails={book}
          />
        )}
      </>
    </>
  );
};

export default MyBook;
