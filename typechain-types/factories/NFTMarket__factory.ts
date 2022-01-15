/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { NFTMarket, NFTMarketInterface } from "../NFTMarket";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "itemId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "nftContract",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "sold",
        type: "bool",
      },
    ],
    name: "MarketItemCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nftContract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "createMarketItem",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nftContract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "itemId",
        type: "uint256",
      },
    ],
    name: "createMarketSale",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "fetchItemsCreated",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "itemId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "nftContract",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "seller",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "sold",
            type: "bool",
          },
        ],
        internalType: "struct NFTMarket.MarketItem[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "fetchMarketItems",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "itemId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "nftContract",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "seller",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "sold",
            type: "bool",
          },
        ],
        internalType: "struct NFTMarket.MarketItem[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "fetchMyNFTs",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "itemId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "nftContract",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "seller",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "sold",
            type: "bool",
          },
        ],
        internalType: "struct NFTMarket.MarketItem[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getListingPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040526658d15e1762800060045534801561001b57600080fd5b506001600055600380546001600160a01b03191633179055610d02806100426000396000f3fe6080604052600436106100555760003560e01c80630f08efe01461005a57806312e8558514610085578063202e3740146100a357806358eb2df5146100b8578063c23b139e146100cd578063f064c32e146100e0575b600080fd5b34801561006657600080fd5b5061006f6100f5565b60405161007c9190610bd8565b60405180910390f35b34801561009157600080fd5b5060045460405190815260200161007c565b3480156100af57600080fd5b5061006f61029d565b6100cb6100c6366004610ba6565b610483565b005b6100cb6100db366004610b7d565b610723565b3480156100ec57600080fd5b5061006f61093f565b6060600061010260015490565b9050600061010f60025490565b60015461011c9190610c84565b90506000808267ffffffffffffffff81111561014857634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561018157816020015b61016e610b25565b8152602001906001900390816101665790505b50905060005b8481101561029457600060058161019f846001610c6c565b81526020810191909152604001600020600401546001600160a01b031614156102825760006101cf826001610c6c565b600081815260056020818152604092839020835160e0810185528154815260018201546001600160a01b0390811693820193909352600282015494810194909452600381015482166060850152600481015490911660808401529081015460a0830152600681015460ff16151560c083015285519293509185908790811061026757634e487b7160e01b600052603260045260246000fd5b602090810291909101015261027d600186610c6c565b945050505b8061028c81610c9b565b915050610187565b50949350505050565b606060006102aa60015490565b905060008060005b8381101561030d5733600560006102ca846001610c6c565b81526020810191909152604001600020600401546001600160a01b031614156102fb576102f8600184610c6c565b92505b8061030581610c9b565b9150506102b2565b5060008267ffffffffffffffff81111561033757634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561037057816020015b61035d610b25565b8152602001906001900390816103555790505b50905060005b8481101561029457336005600061038e846001610c6c565b81526020810191909152604001600020600401546001600160a01b031614156104715760006103be826001610c6c565b600081815260056020818152604092839020835160e0810185528154815260018201546001600160a01b0390811693820193909352600282015494810194909452600381015482166060850152600481015490911660808401529081015460a0830152600681015460ff16151560c083015285519293509185908790811061045657634e487b7160e01b600052603260045260246000fd5b602090810291909101015261046c600186610c6c565b945050505b8061047b81610c9b565b915050610376565b600260005414156104db5760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c0060448201526064015b60405180910390fd5b60026000558061052d5760405162461bcd60e51b815260206004820152601c60248201527f5072696365206d757374206265206174206c656173742031207765690000000060448201526064016104d2565b600454341461058a5760405162461bcd60e51b8152602060048201526024808201527f5072696365206d75737420626520657175616c20746f206c697374696e6720706044820152637269636560e01b60648201526084016104d2565b610598600180546001019055565b60006105a360015490565b6040805160e0810182528281526001600160a01b0387811660208084018281528486018a8152336060870181815260006080890181815260a08a018e815260c08b018381528d8452600598899052928c90209a518b55955160018b018054918b166001600160a01b0319928316179055945160028b0155915160038a018054918a1691861691909117905590516004808a01805492909916919094161790965591519286019290925592516006909401805494151560ff199095169490941790935592516323b872dd60e01b81529182015230602482015260448101869052919250906323b872dd90606401600060405180830381600087803b1580156106a957600080fd5b505af11580156106bd573d6000803e3d6000fd5b505060408051338152600060208201819052818301879052606082015290518693506001600160a01b038816925084917f045dfa01dcba2b36aba1d3dc4a874f4b0c5d2fbeb8d2c4b34a7d88c8d8f929d1919081900360800190a4505060016000555050565b600260005414156107765760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c0060448201526064016104d2565b600260008181558281526005602081905260409091209081015491015434821461080a576040805162461bcd60e51b81526020600482015260248101919091527f506c65617365207375626d6974207468652061736b696e67207072696365206960448201527f6e206f7264657220746f20636f6d706c6574652074686520707572636861736560648201526084016104d2565b6000838152600560205260408082206003015490516001600160a01b03909116913480156108fc02929091818181858888f19350505050158015610852573d6000803e3d6000fd5b506040516323b872dd60e01b8152306004820152336024820152604481018290526001600160a01b038516906323b872dd90606401600060405180830381600087803b1580156108a157600080fd5b505af11580156108b5573d6000803e3d6000fd5b50505060008481526005602052604090206004810180546001600160a01b03191633179055600601805460ff19166001179055506108f7600280546001019055565b6003546004546040516001600160a01b039092169181156108fc0291906000818181858888f19350505050158015610933573d6000803e3d6000fd5b50506001600055505050565b6060600061094c60015490565b905060008060005b838110156109af57336005600061096c846001610c6c565b81526020810191909152604001600020600301546001600160a01b0316141561099d5761099a600184610c6c565b92505b806109a781610c9b565b915050610954565b5060008267ffffffffffffffff8111156109d957634e487b7160e01b600052604160045260246000fd5b604051908082528060200260200182016040528015610a1257816020015b6109ff610b25565b8152602001906001900390816109f75790505b50905060005b84811015610294573360056000610a30846001610c6c565b81526020810191909152604001600020600301546001600160a01b03161415610b13576000610a60826001610c6c565b600081815260056020818152604092839020835160e0810185528154815260018201546001600160a01b0390811693820193909352600282015494810194909452600381015482166060850152600481015490911660808401529081015460a0830152600681015460ff16151560c0830152855192935091859087908110610af857634e487b7160e01b600052603260045260246000fd5b6020908102919091010152610b0e600186610c6c565b945050505b80610b1d81610c9b565b915050610a18565b6040805160e081018252600080825260208201819052918101829052606081018290526080810182905260a0810182905260c081019190915290565b80356001600160a01b0381168114610b7857600080fd5b919050565b60008060408385031215610b8f578182fd5b610b9883610b61565b946020939093013593505050565b600080600060608486031215610bba578081fd5b610bc384610b61565b95602085013595506040909401359392505050565b602080825282518282018190526000919060409081850190868401855b82811015610c5f57815180518552868101516001600160a01b039081168887015286820151878701526060808301518216908701526080808301519091169086015260a0808201519086015260c09081015115159085015260e09093019290850190600101610bf5565b5091979650505050505050565b60008219821115610c7f57610c7f610cb6565b500190565b600082821015610c9657610c96610cb6565b500390565b6000600019821415610caf57610caf610cb6565b5060010190565b634e487b7160e01b600052601160045260246000fdfea26469706673582212202c03904dcd75713ae40d8c8f2da17894ff948e4d9bd46e75ebe722eab78b646164736f6c63430008040033";

type NFTMarketConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NFTMarketConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class NFTMarket__factory extends ContractFactory {
  constructor(...args: NFTMarketConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "NFTMarket";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<NFTMarket> {
    return super.deploy(overrides || {}) as Promise<NFTMarket>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): NFTMarket {
    return super.attach(address) as NFTMarket;
  }
  connect(signer: Signer): NFTMarket__factory {
    return super.connect(signer) as NFTMarket__factory;
  }
  static readonly contractName: "NFTMarket";
  public readonly contractName: "NFTMarket";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NFTMarketInterface {
    return new utils.Interface(_abi) as NFTMarketInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NFTMarket {
    return new Contract(address, _abi, signerOrProvider) as NFTMarket;
  }
}
