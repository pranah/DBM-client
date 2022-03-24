# Prānah


![prana: deck cover](prana_cover_pic.png)
## Ebook Publishing and  Distribution using NFTs

We humans have a unique way of adding value to entities just by interacting with it: a particular DVD of Star Wars once owned by Mark Hamill fetches more than its MRP (Maximum Retail Price), you attach sentimental value to the watch that your dad gave you (so much so that you’re not willing to part with it for any sum of money). This level of interaction and sentiment-attachment is only
possible in the physical realm, precisely because there is no uniqueness attached with digital copies. Until the advent of blockchain and Non-Fungible Tokens.

With NFTs, suddenly we’re able to hold unique digital collectibles, attach sentimental value to it, and have a history associated with it. But they don’t just have to be collectibles. They can be utilitarian entities, just like the watch that you wear to tell time. Here we propose such a platform for utilitarian non-fungible tokens: for ebooks.


A unique NFT is generated and assigned to an owner when an e-book sale is executed. And since these tokens are unique, they behave like physical entities, i.e. as physical copies of a book. This means that there are a whole new set of behaviors that opens up for the owner, which doesn’t exist in any of the current content distribution platforms.An owner can sell or rent the book as she pleases, for the price that she chooses, to anyone in the globe.

The books will have the history of its previous owners as it jumps from hand to hand, and it becomes verifiable to all whether one particular copy of Harry Potter was once owned by Emma Watson or not. Limited editions and other collectible characteristics can also be incorporated into the tokens to sell them at a premium.

A whole new market gets opened up with this, while providing increased freedom and control to the customers. The platform is designed in such a way that each monetary transaction attached to a particular e-book copy results in royalties being sent to the content creator/author, incentivizing their participation on the platform. Thus, both content creators and consumers are incentivized to be on the platform. The supply would always be limited, as new NFTs are only generated at the time of an e-book sale from the author/publisher, hence ensuring digital scarcity. We believe a free-market economics model would drive down the prices of resales and rentals, making it affordable for the Third World (or people in Levels 1 to 3 per Hans Rosling) and other emerging markets, nudging people away from piracy.

## Demo

Checkout the [demo here.](https://www.pranah.co)


# Advanced Sample Hardhat Project

This project demonstrates an advanced Hardhat use case, integrating other tools commonly used alongside Hardhat in the ecosystem.

The project comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts. It also comes with a variety of other tools, preconfigured to work with the project code.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.ts
TS_NODE_FILES=true npx ts-node scripts/deploy.ts
npx eslint '**/*.{js,ts}'
npx eslint '**/*.{js,ts}' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```

# Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```shell
hardhat run --network ropsten scripts/sample-script.ts
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```

# Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).
# DBM-client
