import path from 'path';
import * as solanaWeb3 from '@solana/web3.js';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { promises as fs } from "fs";


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const base = "https://api-mainnet.magiceden.dev/v2/";

export class Profit {

    constructor(collectionName, walletAddress, tokensMinted, mintPrice) {
        this.collectionName = collectionName;
        this.walletAddress = walletAddress;
        this.tokensMinted = tokensMinted;
        this.mintPrice = mintPrice;
        this.sales = [];
        this.buys = [];
        this.valid = [];

    }

    toSOL(lamps) {
        return lamps / 1000000000
    }


    async parseTxs() {
        try {
            
            let data = await fs.readFile(path.join(__dirname, `/../../hashes/transactions/${this.collectionName}.csv`), "utf8", function(err) {
                if(err) console.log('error', err);
            });

            data = data.split("\r\n");
            data.shift();

      
            for (let i = 0; i < data.length - 1; i++) {

                if (data[i].split(',')[1].toString() == this.walletAddress || data[i].split(',')[2].toString() == this.walletAddress) {
                    this.valid.push(data[i]);
                    //console.log("ADDED VALID ACTION");
                }

            }

            return;

        } catch (err) {
            console.log(err);
        }
    }


    async getExactAmount(hash) {
        try {
            const solana = new solanaWeb3.Connection("https://mainnet-beta.solflare.network/");

            const response = await solana.getParsedTransaction(hash);


           let ind;

            for (let i = 0; i < response.transaction.message.accountKeys.length; i++) {
                if (response.transaction.message.accountKeys[i].pubkey.toString() == this.walletAddress) {
                    ind = i;
                }
            }

     
            return this.toSOL(response.meta.postBalances[ind] - response.meta.preBalances[ind]);
        } catch (err) {
            console.log(err);
        }
    }

    async addSalesBuys() {
        try {

            await this.parseTxs();

            for (let i = 0; i < this.valid.length; i++) {
    
                if (this.valid[i].split(',')[2] == this.walletAddress) {
                    this.sales.push(await this.getExactAmount(this.valid[i].split(',')[0]));
                } else if (this.valid[i].split(',')[1] == this.walletAddress) {
                    this.buys.push(Number(this.valid[i].split(',')[3]));
                }
    
            }
        } catch (err) {
            console.log(err);
        }

    }

    toFixed(num, fixed) {
        try {
        var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
        return num.toString().match(re)[0];
        } catch (err) {
            throw(err)
        }
    }

    async solToUsd(price) {
        const apiUrl = "https://api.coincap.io/v2/assets/solana";

        const res = await fetch(apiUrl);
        const data = await res.json();
        const priceUsd = this.toFixed(Number(data.data.priceUsd));

        return this.toFixed(priceUsd * price)
    }

    async getProfit() {
        try {
            await this.addSalesBuys();

            const totalBuySecondary = this.buys.reduce((partialSum, a) => partialSum + a, 0);
            const totalSell = this.sales.reduce((partialSum, a) => partialSum + a, 0);

            const totalMint = this.mintPrice * this.tokensMinted;
            const totalBuy = totalMint + totalBuySecondary;

            const tokensBought = this.buys.length + this.tokensMinted;

            const profit = totalSell - totalBuy;

            const roi = profit / totalBuy * 100;

            const apiUrl = "https://api-mainnet.magiceden.dev/v2/collections/" + this.collectionName;

            const res = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'accept': 'application/json, text/plain, */*',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36'
                }
            });

            const data = await res.json();

            const thumbnail = data.image;
            const floorPrice = this.toSOL(data.floorPrice);

            const tokensLeft = tokensBought - this.sales.length

            const remainingValue = floorPrice * tokensLeft;

            const unrealized = remainingValue + profit;
    
            return { 

                "thumbnail": thumbnail,
                "profit": this.toFixed(profit, 2),
                "profitUsd": await this.solToUsd(profit),
                "tokensSold": this.sales.length.toString(),
                "tokensBought": this.buys.length.toString(), 
                "tokensMinted": this.tokensMinted.toString(),
                "tokensLeft": tokensBought - this.sales.length,
                "sell": this.toFixed(totalSell, 2),
                "sellUsd": await this.solToUsd(totalSell), 
                "buy": this.toFixed(totalBuySecondary, 2),
                "floorPrice": floorPrice,
                "floorUsd": await this.solToUsd(floorPrice),
                "unrealized": this.toFixed(unrealized, 2),
                "unrealizedUsd": await this.solToUsd(unrealized),
                "buyUsd": await this.solToUsd(totalBuySecondary), 
                "minted": totalMint.toString(),
                "mintedUsd": await this.solToUsd(totalMint),
                "spent": this.toFixed(totalBuy, 2),
                "spentUsd": await this.solToUsd(totalBuy),
                "roi": this.toFixed(roi, 2)
            };

        } catch (err) {
            console.log(err);
        }
        
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}

//let myProfit = new Profit("Tay_Keith", "HEtY9ZqBsM6gQDkuz7KUGrhh9hd9DX4WX29dnKrhb2Jm");
//console.log(await myProfit.getProfit())

