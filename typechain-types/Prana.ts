/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface PranaInterface extends utils.Interface {
  contractName: "Prana";
  functions: {
    "approve(address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "baseURI()": FunctionFragment;
    "buyToken(uint256,address)": FunctionFragment;
    "consumeContent(uint256)": FunctionFragment;
    "directPurchase(uint256)": FunctionFragment;
    "getApproved(uint256)": FunctionFragment;
    "isApprovedForAll(address,address)": FunctionFragment;
    "name()": FunctionFragment;
    "numberOfRentedTokens(address)": FunctionFragment;
    "numberofTokensForRenting()": FunctionFragment;
    "numberofTokensForResale()": FunctionFragment;
    "ownerOf(uint256)": FunctionFragment;
    "publishBook(string,uint256,uint256,string,uint256)": FunctionFragment;
    "putForRent(uint256,uint256,uint256)": FunctionFragment;
    "putTokenForSale(uint256,uint256)": FunctionFragment;
    "rentToken(uint256)": FunctionFragment;
    "safeTransferFrom(address,address,uint256)": FunctionFragment;
    "setApprovalForAll(address,bool)": FunctionFragment;
    "setPranaHelperAddress(address)": FunctionFragment;
    "setTokenURI(uint256,string)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "symbol()": FunctionFragment;
    "tokenByIndex(uint256)": FunctionFragment;
    "tokenForRentingAtIndex(uint256)": FunctionFragment;
    "tokenForResaleAtIndex(uint256)": FunctionFragment;
    "tokenOfOwnerByIndex(address,uint256)": FunctionFragment;
    "tokenOfRenteeByIndex(address,uint256)": FunctionFragment;
    "tokenURI(uint256)": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
    "viewBookDetails(uint256)": FunctionFragment;
    "viewMyBookDetails(uint256)": FunctionFragment;
    "viewRentingTokenDetails(uint256)": FunctionFragment;
    "viewTokenDetails(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "approve",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(functionFragment: "baseURI", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "buyToken",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "consumeContent",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "directPurchase",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getApproved",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isApprovedForAll",
    values: [string, string]
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "numberOfRentedTokens",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "numberofTokensForRenting",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "numberofTokensForResale",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "ownerOf",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "publishBook",
    values: [string, BigNumberish, BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "putForRent",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "putTokenForSale",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "rentToken",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "safeTransferFrom",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setApprovalForAll",
    values: [string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "setPranaHelperAddress",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setTokenURI",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "tokenByIndex",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenForRentingAtIndex",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenForResaleAtIndex",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenOfOwnerByIndex",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenOfRenteeByIndex",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenURI",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "viewBookDetails",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "viewMyBookDetails",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "viewRentingTokenDetails",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "viewTokenDetails",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "baseURI", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "buyToken", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "consumeContent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "directPurchase",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getApproved",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isApprovedForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "numberOfRentedTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "numberofTokensForRenting",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "numberofTokensForResale",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "ownerOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "publishBook",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "putForRent", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "putTokenForSale",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "rentToken", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "safeTransferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setApprovalForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setPranaHelperAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTokenURI",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "tokenByIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokenForRentingAtIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokenForResaleAtIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokenOfOwnerByIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokenOfRenteeByIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "tokenURI", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "viewBookDetails",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "viewMyBookDetails",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "viewRentingTokenDetails",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "viewTokenDetails",
    data: BytesLike
  ): Result;

  events: {
    "Approval(address,address,uint256)": EventFragment;
    "ApprovalForAll(address,address,bool)": EventFragment;
    "BookPublished(address,uint256,string,uint256,uint256)": EventFragment;
    "TokenForRenting(uint256,uint256,uint256)": EventFragment;
    "TokenForSale(uint256,uint256,uint256)": EventFragment;
    "TokenRented(uint256,uint256,address)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ApprovalForAll"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BookPublished"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokenForRenting"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokenForSale"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokenRented"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}

export type ApprovalEvent = TypedEvent<
  [string, string, BigNumber],
  { owner: string; approved: string; tokenId: BigNumber }
>;

export type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>;

export type ApprovalForAllEvent = TypedEvent<
  [string, string, boolean],
  { owner: string; operator: string; approved: boolean }
>;

export type ApprovalForAllEventFilter = TypedEventFilter<ApprovalForAllEvent>;

export type BookPublishedEvent = TypedEvent<
  [string, BigNumber, string, BigNumber, BigNumber],
  {
    publisher: string;
    isbn: BigNumber;
    bookCoverAndDetails: string;
    price: BigNumber;
    transactionCut: BigNumber;
  }
>;

export type BookPublishedEventFilter = TypedEventFilter<BookPublishedEvent>;

export type TokenForRentingEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber],
  { rentingPrice: BigNumber; isbn: BigNumber; tokenId: BigNumber }
>;

export type TokenForRentingEventFilter = TypedEventFilter<TokenForRentingEvent>;

export type TokenForSaleEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber],
  { resalePrice: BigNumber; isbn: BigNumber; tokenId: BigNumber }
>;

export type TokenForSaleEventFilter = TypedEventFilter<TokenForSaleEvent>;

export type TokenRentedEvent = TypedEvent<
  [BigNumber, BigNumber, string],
  { isbn: BigNumber; tokenId: BigNumber; rentee: string }
>;

export type TokenRentedEventFilter = TypedEventFilter<TokenRentedEvent>;

export type TransferEvent = TypedEvent<
  [string, string, BigNumber],
  { from: string; to: string; tokenId: BigNumber }
>;

export type TransferEventFilter = TypedEventFilter<TransferEvent>;

export interface Prana extends BaseContract {
  contractName: "Prana";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: PranaInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    balanceOf(owner: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    baseURI(overrides?: CallOverrides): Promise<[string]>;

    buyToken(
      tokenId: BigNumberish,
      _tokenRecipient: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    consumeContent(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    directPurchase(
      _isbn: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    isApprovedForAll(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    name(overrides?: CallOverrides): Promise<[string]>;

    numberOfRentedTokens(
      _rentee: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    numberofTokensForRenting(overrides?: CallOverrides): Promise<[BigNumber]>;

    numberofTokensForResale(overrides?: CallOverrides): Promise<[BigNumber]>;

    ownerOf(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    publishBook(
      _encryptedBookDataHash: string,
      _isbn: BigNumberish,
      _price: BigNumberish,
      _unencryptedBookDetailsCID: string,
      _transactionCut: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    putForRent(
      _newPrice: BigNumberish,
      tokenId: BigNumberish,
      _numberofBlocksToRent: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    putTokenForSale(
      salePrice: BigNumberish,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    rentToken(
      tokenId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "safeTransferFrom(address,address,uint256)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setPranaHelperAddress(
      _pranaHelperAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setTokenURI(
      tokenId: BigNumberish,
      _uniqueCIDfortoken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    symbol(overrides?: CallOverrides): Promise<[string]>;

    tokenByIndex(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    tokenForRentingAtIndex(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    tokenForResaleAtIndex(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    tokenOfOwnerByIndex(
      owner: string,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    tokenOfRenteeByIndex(
      _rentee: string,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    tokenURI(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    viewBookDetails(
      _isbn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, string, BigNumber, BigNumber, BigNumber]>;

    viewMyBookDetails(
      _isbn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, string, string, BigNumber, BigNumber, BigNumber]>;

    viewRentingTokenDetails(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, BigNumber, BigNumber, BigNumber, BigNumber, boolean]
    >;

    viewTokenDetails(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, string, BigNumber, BigNumber, boolean]>;
  };

  approve(
    to: string,
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

  baseURI(overrides?: CallOverrides): Promise<string>;

  buyToken(
    tokenId: BigNumberish,
    _tokenRecipient: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  consumeContent(
    tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  directPurchase(
    _isbn: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getApproved(
    tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  isApprovedForAll(
    owner: string,
    operator: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  name(overrides?: CallOverrides): Promise<string>;

  numberOfRentedTokens(
    _rentee: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  numberofTokensForRenting(overrides?: CallOverrides): Promise<BigNumber>;

  numberofTokensForResale(overrides?: CallOverrides): Promise<BigNumber>;

  ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  publishBook(
    _encryptedBookDataHash: string,
    _isbn: BigNumberish,
    _price: BigNumberish,
    _unencryptedBookDetailsCID: string,
    _transactionCut: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  putForRent(
    _newPrice: BigNumberish,
    tokenId: BigNumberish,
    _numberofBlocksToRent: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  putTokenForSale(
    salePrice: BigNumberish,
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  rentToken(
    tokenId: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "safeTransferFrom(address,address,uint256)"(
    from: string,
    to: string,
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "safeTransferFrom(address,address,uint256,bytes)"(
    from: string,
    to: string,
    tokenId: BigNumberish,
    _data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setApprovalForAll(
    operator: string,
    approved: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setPranaHelperAddress(
    _pranaHelperAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setTokenURI(
    tokenId: BigNumberish,
    _uniqueCIDfortoken: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  symbol(overrides?: CallOverrides): Promise<string>;

  tokenByIndex(
    index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  tokenForRentingAtIndex(
    index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  tokenForResaleAtIndex(
    index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  tokenOfOwnerByIndex(
    owner: string,
    index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  tokenOfRenteeByIndex(
    _rentee: string,
    index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  tokenURI(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  transferFrom(
    from: string,
    to: string,
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  viewBookDetails(
    _isbn: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[string, string, BigNumber, BigNumber, BigNumber]>;

  viewMyBookDetails(
    _isbn: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[string, string, string, BigNumber, BigNumber, BigNumber]>;

  viewRentingTokenDetails(
    _tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, string, BigNumber, BigNumber, BigNumber, BigNumber, boolean]
  >;

  viewTokenDetails(
    _tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[BigNumber, string, BigNumber, BigNumber, boolean]>;

  callStatic: {
    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

    baseURI(overrides?: CallOverrides): Promise<string>;

    buyToken(
      tokenId: BigNumberish,
      _tokenRecipient: string,
      overrides?: CallOverrides
    ): Promise<void>;

    consumeContent(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    directPurchase(
      _isbn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    isApprovedForAll(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    name(overrides?: CallOverrides): Promise<string>;

    numberOfRentedTokens(
      _rentee: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    numberofTokensForRenting(overrides?: CallOverrides): Promise<BigNumber>;

    numberofTokensForResale(overrides?: CallOverrides): Promise<BigNumber>;

    ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

    publishBook(
      _encryptedBookDataHash: string,
      _isbn: BigNumberish,
      _price: BigNumberish,
      _unencryptedBookDetailsCID: string,
      _transactionCut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    putForRent(
      _newPrice: BigNumberish,
      tokenId: BigNumberish,
      _numberofBlocksToRent: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    putTokenForSale(
      salePrice: BigNumberish,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    rentToken(tokenId: BigNumberish, overrides?: CallOverrides): Promise<void>;

    "safeTransferFrom(address,address,uint256)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    setPranaHelperAddress(
      _pranaHelperAddress: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setTokenURI(
      tokenId: BigNumberish,
      _uniqueCIDfortoken: string,
      overrides?: CallOverrides
    ): Promise<void>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    symbol(overrides?: CallOverrides): Promise<string>;

    tokenByIndex(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenForRentingAtIndex(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenForResaleAtIndex(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenOfOwnerByIndex(
      owner: string,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenOfRenteeByIndex(
      _rentee: string,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenURI(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    viewBookDetails(
      _isbn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, string, BigNumber, BigNumber, BigNumber]>;

    viewMyBookDetails(
      _isbn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, string, string, BigNumber, BigNumber, BigNumber]>;

    viewRentingTokenDetails(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, BigNumber, BigNumber, BigNumber, BigNumber, boolean]
    >;

    viewTokenDetails(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, string, BigNumber, BigNumber, boolean]>;
  };

  filters: {
    "Approval(address,address,uint256)"(
      owner?: string | null,
      approved?: string | null,
      tokenId?: BigNumberish | null
    ): ApprovalEventFilter;
    Approval(
      owner?: string | null,
      approved?: string | null,
      tokenId?: BigNumberish | null
    ): ApprovalEventFilter;

    "ApprovalForAll(address,address,bool)"(
      owner?: string | null,
      operator?: string | null,
      approved?: null
    ): ApprovalForAllEventFilter;
    ApprovalForAll(
      owner?: string | null,
      operator?: string | null,
      approved?: null
    ): ApprovalForAllEventFilter;

    "BookPublished(address,uint256,string,uint256,uint256)"(
      publisher?: string | null,
      isbn?: BigNumberish | null,
      bookCoverAndDetails?: null,
      price?: BigNumberish | null,
      transactionCut?: null
    ): BookPublishedEventFilter;
    BookPublished(
      publisher?: string | null,
      isbn?: BigNumberish | null,
      bookCoverAndDetails?: null,
      price?: BigNumberish | null,
      transactionCut?: null
    ): BookPublishedEventFilter;

    "TokenForRenting(uint256,uint256,uint256)"(
      rentingPrice?: BigNumberish | null,
      isbn?: BigNumberish | null,
      tokenId?: BigNumberish | null
    ): TokenForRentingEventFilter;
    TokenForRenting(
      rentingPrice?: BigNumberish | null,
      isbn?: BigNumberish | null,
      tokenId?: BigNumberish | null
    ): TokenForRentingEventFilter;

    "TokenForSale(uint256,uint256,uint256)"(
      resalePrice?: BigNumberish | null,
      isbn?: BigNumberish | null,
      tokenId?: BigNumberish | null
    ): TokenForSaleEventFilter;
    TokenForSale(
      resalePrice?: BigNumberish | null,
      isbn?: BigNumberish | null,
      tokenId?: BigNumberish | null
    ): TokenForSaleEventFilter;

    "TokenRented(uint256,uint256,address)"(
      isbn?: BigNumberish | null,
      tokenId?: BigNumberish | null,
      rentee?: string | null
    ): TokenRentedEventFilter;
    TokenRented(
      isbn?: BigNumberish | null,
      tokenId?: BigNumberish | null,
      rentee?: string | null
    ): TokenRentedEventFilter;

    "Transfer(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      tokenId?: BigNumberish | null
    ): TransferEventFilter;
    Transfer(
      from?: string | null,
      to?: string | null,
      tokenId?: BigNumberish | null
    ): TransferEventFilter;
  };

  estimateGas: {
    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

    baseURI(overrides?: CallOverrides): Promise<BigNumber>;

    buyToken(
      tokenId: BigNumberish,
      _tokenRecipient: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    consumeContent(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    directPurchase(
      _isbn: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isApprovedForAll(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    numberOfRentedTokens(
      _rentee: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    numberofTokensForRenting(overrides?: CallOverrides): Promise<BigNumber>;

    numberofTokensForResale(overrides?: CallOverrides): Promise<BigNumber>;

    ownerOf(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    publishBook(
      _encryptedBookDataHash: string,
      _isbn: BigNumberish,
      _price: BigNumberish,
      _unencryptedBookDetailsCID: string,
      _transactionCut: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    putForRent(
      _newPrice: BigNumberish,
      tokenId: BigNumberish,
      _numberofBlocksToRent: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    putTokenForSale(
      salePrice: BigNumberish,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    rentToken(
      tokenId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "safeTransferFrom(address,address,uint256)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setPranaHelperAddress(
      _pranaHelperAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setTokenURI(
      tokenId: BigNumberish,
      _uniqueCIDfortoken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    symbol(overrides?: CallOverrides): Promise<BigNumber>;

    tokenByIndex(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenForRentingAtIndex(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenForResaleAtIndex(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenOfOwnerByIndex(
      owner: string,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenOfRenteeByIndex(
      _rentee: string,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenURI(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    viewBookDetails(
      _isbn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    viewMyBookDetails(
      _isbn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    viewRentingTokenDetails(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    viewTokenDetails(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    balanceOf(
      owner: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    baseURI(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    buyToken(
      tokenId: BigNumberish,
      _tokenRecipient: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    consumeContent(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    directPurchase(
      _isbn: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isApprovedForAll(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    numberOfRentedTokens(
      _rentee: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    numberofTokensForRenting(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    numberofTokensForResale(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    ownerOf(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    publishBook(
      _encryptedBookDataHash: string,
      _isbn: BigNumberish,
      _price: BigNumberish,
      _unencryptedBookDetailsCID: string,
      _transactionCut: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    putForRent(
      _newPrice: BigNumberish,
      tokenId: BigNumberish,
      _numberofBlocksToRent: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    putTokenForSale(
      salePrice: BigNumberish,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    rentToken(
      tokenId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "safeTransferFrom(address,address,uint256)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setPranaHelperAddress(
      _pranaHelperAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setTokenURI(
      tokenId: BigNumberish,
      _uniqueCIDfortoken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tokenByIndex(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tokenForRentingAtIndex(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tokenForResaleAtIndex(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tokenOfOwnerByIndex(
      owner: string,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tokenOfRenteeByIndex(
      _rentee: string,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tokenURI(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    viewBookDetails(
      _isbn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    viewMyBookDetails(
      _isbn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    viewRentingTokenDetails(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    viewTokenDetails(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
