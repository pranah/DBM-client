import { Product } from "../components/ProductCard/ProductCard.types";

export function ordinal_suffix_of(i: number) {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
}

export const productsArray: Product[] = [
  {
    id: 1,
    rating: 3,
    name: "The Time Machine",
    author: "H. G. Wells",
    price: 0.2,
    image:
      "https://ipfs.moralis.io:2053/ipfs/QmPjizJcoZPFKEGNfDEbhtxi4L2dN3PWXGhk6SCBeNogN1",
  },
  {
    id: 2,

    rating: 3,
    name: "The Divine Comedy",
    author: "Dante Alighieri",
    price: 0.5,
    image:
      "https://ipfs.moralis.io:2053/ipfs/QmYnbE8pF6mv7ewUwaz6CePp63Q7n9xZXsMjivZxHfT5jM",
  },
  {
    id: 3,

    rating: 3,
    name: "Macbeth",
    author: "William Shakespeare",
    price: 0.3,
    image:
      "https://ipfs.moralis.io:2053/ipfs/QmRN9Niq35SfH2BUhtuXC2VmM6gkNdQZfKqSk3aWp3YiWn",
  },
  {
    id: 4,

    rating: 3,
    name: "Frankenstein",
    author: "Mary Shelley",
    price: 0.35,
    image:
      "https://ipfs.moralis.io:2053/ipfs/QmckUFY6PLYvkx1esnXNkfmy3atW8PWGcwPGGAx7Yp7tLk",
  },
  {
    id: 5,

    rating: 3,
    name: "Candide",
    author: "Voltaire",
    price: 0.2,
    image:
      "https://ipfs.moralis.io:2053/ipfs/QmUP8WmQJasVhodsZGx8pDjgnJomvKHFKkhQcWznCAkRYu",
  },
  {
    id: 6,

    rating: 3,
    name: "Candide",
    author: "Voltaire",
    price: 0.2,
    image:
      "https://ipfs.moralis.io:2053/ipfs/QmUP8WmQJasVhodsZGx8pDjgnJomvKHFKkhQcWznCAkRYu",
  },
];
