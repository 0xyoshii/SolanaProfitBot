import path from 'path';
import { fileURLToPath } from 'url';
import { promises as asyncFs } from "fs";
import fetch from 'node-fetch';
import fs from 'fs';
import { HyperspaceClient } from "hyperspace-client-js";



const hsClient = new HyperspaceClient(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJTT0wgUHJvZml0IEJvdCIsIm5hbWUiOiJIeXBlcnNwYWNlIiwiaWF0IjoxNTE2MjM5MDIyfQ.TVGGyClaX8R4ImCA5Odp03stu68wpjlNWe7lA90DrFA"
    );

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export class Refresh {

    constructor(collectionName) {
        this.collectionName = collectionName.toString();
        this.txs = [];
        this.base = "https://api-mainnet.magiceden.dev/v2/";
    }

    async readCSV() {

        var data = await asyncFs.readFile(path.join(__dirname, `/../../hashes/hashlists/${this.collectionName}.csv`), "utf8", function(err) {
            if(err) console.log('error', err);
        });
        data = data.split("\r\n");
        data.shift();
        return data;
    
    }

    async initiate() {
        try {
        const hashes = await this.readCSV();
        console.log("Got hashlist");

        const hashCont = [];
        const chunkSize = 100;

        for (let i = 0; i < hashes.length; i += chunkSize) {
            hashCont.push(hashes.slice(i, i + chunkSize));
        }

        for await (let hashlist of hashCont) {
            await this.getTokenActivity(hashlist);

        }

        this.storeTx();
    
        return;
    } catch (err) {
    }
    
    }

    /*

    async getTokenActivity(tokenMint, i) {
        try {

            
            console.log("checking token - " + i.toString());

            await new Promise(r => setTimeout(r, 300));

            //this.base = "https://api-mainnet.magiceden.dev/v2/"


            const response = await fetch(this.base + "tokens/" + tokenMint + '/activities?offset=0&limit=500', {
                method: 'GET',
                headers: {
                    'accept': 'application/json, text/plain',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36'
                }
            });


            const data = await response.json();
        
            for (let i = 0; i < data.length; i++) {

                if (data[i].type == "buyNow") {
                    this.txs.push(
                    { 
                        "hash": data[i].signature, 
                        "buyer": data[i].buyer, 
                        "seller": data[i].seller, 
                        "price": data[i].price
                    });
                }

            }

            return;

        } catch (err) {
            console.log(err);
        }
    }

    */
    async getTokenActivity(tokenArray) {
        try {

            await new Promise(r => setTimeout(r, 5000));

            console.log("Batch checking " + tokenArray.length.toString() + " tokens")

            const history = await hsClient.getTokenHistory({
                condition: {
                  tokenAddresses: tokenArray
                }
              });
        
              for (let i = 0; i < history.getMarketPlaceActionsByToken.length; i++) {
                for (let z = 0; z < history.getMarketPlaceActionsByToken[i].market_place_actions.length; z++) {
            
                  if (history.getMarketPlaceActionsByToken[i].market_place_actions[z].type == "TRANSACTION") {
                      this.txs.push(
                      { 
                          "hash": history.getMarketPlaceActionsByToken[i].market_place_actions[z].signature, 
                          "buyer": history.getMarketPlaceActionsByToken[i].market_place_actions[z].buyer_address, 
                          "seller": history.getMarketPlaceActionsByToken[i].market_place_actions[z].seller_address, 
                          "price": history.getMarketPlaceActionsByToken[i].market_place_actions[z].price
                      });
                  }
                }
            }

            return;

        } catch (err) {
        }
    }


    storeTx() {
        
        var csv = "hash,buyer,seller \r\n";
        for (let tx of this.txs) {
            csv += tx.hash + "," + tx.buyer + "," +  tx.seller + "," + tx.price.toString() + "\r\n";
        }

        fs.writeFileSync(path.join(__dirname, `/../../hashes/transactions/${this.collectionName}.csv`), csv);
        console.log("Refreshed collection - " + this.collectionName);
        return "Refreshed collection - " + this.collectionName;
    }
    
}