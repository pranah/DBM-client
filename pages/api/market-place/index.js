import Moralis from "moralis/node";
import axios from "axios";
import { ethers } from "ethers";

/* Moralis init code */
const serverUrl = "http://localhost:1337/server";
const appId = "001";

export default async function handler(req, res) {
  try {
    await Moralis.start({ serverUrl, appId });

    const query = new Moralis.Query("BookPublished");
    const books = await query.find();
    const booksResponse = books.map((book) => book.attributes);

    const items = await Promise.all(
      booksResponse.map(async (i) => {
        const meta = await axios.get(i.bookCoverAndDetails);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          displayPrice: price,
          image: meta.data.image,
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

    res.status(200).json({ books: items });
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });
  }
}
