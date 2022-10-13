# SolanaProfitBot

SolanaProfitBot is a discord bot used to calculate profits on solana NFTs trades. It calculates both the P&L made on buying on secondary marketplaces and minting.
This is the list of commands that the bot can perform.

Index Collection
-------------

`/index ${creator_address}`

You can use the `/index` command to index a collection's hashlist. This command is required to calculate profits. This process can take up to 10 minutes depending
on the size of the collection. It takes the **creator_address** as a parameter.

If successfull, it returns a `Indexed collection - ${collection_name}`.

Refresh Collection
-------------

`/refresh ${collection_name}`

You can use the `/refresh` command to refresh a collection's transaction history for every token. This command is required to calculate profits and needs to be performed
after indexing a collection and its required to calculate profits. It takes the **collection_name** as a parameter.
This process can take up to 15 minutes depending on the size of the collection.

It returns a `Queued refresh for ${collection_name} message. You can check the state with the next command.`


Check refresh state
-------------

`/isRefreshed ${collection_name}`

You can use the `/isRefreshed` command to the state of a collection, to see if its refreshed or not. This command is not required to calculate profits and needs to be
performed after a refresh command. It takes the **collection_name** as parameter

Calculate Profits
-------------

`/profit ${collection_name} ${wallet_address} ${tokens_minted} ${mint_price}`

You can use the `/profit` command to calculate profits on a specified collection for a specified wallet. The **collection_name** and the **wallet_address** are **REQUIRED**,
**tokens_minted** and **mint_price** aren't required.

