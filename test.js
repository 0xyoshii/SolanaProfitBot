import { HyperspaceClient } from "hyperspace-client-js";


const hsClient = new HyperspaceClient(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJTT0wgUHJvZml0IEJvdCIsIm5hbWUiOiJIeXBlcnNwYWNlIiwiaWF0IjoxNTE2MjM5MDIyfQ.TVGGyClaX8R4ImCA5Odp03stu68wpjlNWe7lA90DrFA"
    );

const hashes = ["BTwurXyrcscVdWndFMtmiVbBqDkAPG8yKPvf4Kct8NqJ", "6UGmPoumL1CS4vYv5257VtMBNhStuDq6s7mAEy9rs399", "98Sh9NUkc3e41WRzYkGRvZnGP3RYrhj7ZZe3hSiPDQaD", "Dv73BV8evB7PEsFyL9VZH1e4T686Gv4aJde7bSDJm5wp", "2B4gSGLGWWHDqLqvxtiTdbVFWYzpwdR4HgkCe85RGfMj", "2uoewLAgHt6GevbkqGXvefiumUKrFDjBTfPRQ8yu4RaF", "CHCwYTJQJAH6mbMq1CKaxMyj74UhU5bet6XeKQNT9LKq", "Hkd8ERnzN6qFdmgEE5XaTmNHeMXYuVZL3AWorYdcd7kq", "Fccn88WVVYjyHGVV45RubGat1VRJ8ao2f2zfDYpnkPG1", "EAkxYfQWoysgBkvpFq6g4X8JdJsyqqyJV7RMdPuNW8PF", "HPtuBZTgfp5AqKRNKyDX7ArQ1xfy2VBmh72pXrdzT5cP", "3xgWeWvjXy28hSxpPfEGprNG1WbWTvRUGUJ8naWBoXYb", "27N3ybfUezzKiqSHSAKo1jrcY5onCWg1wEABRPKfXur3", "GtR75ZYZs8obFwotCGYjA6DXnBZLfoaWV35uGMN8LkXc", "679vXQMXh2Fttbiu1bPS2vjkSr2S8C4T6hkSWH1KnZc9", "EwP2VRJf7vbDYDJKiUrTj7QMPsZn4iYAJrA1CPDcLwup", "AyTV3oxLspK5RVwufvEXiiwWADQqZr7bRivkCRrSr9w4", "2uQoWUo9N9LwmHZYC2SZXuDpj2tw99nvykkhKnSS4zS1", "BSKFbE2TR9Kq9KEtSA2GT7sbxjJ7CCKMkBhct6F42Xzy", "YAn8HmVsZyKrM8zbwjs3zfiQhsWu2tBMo4DYa4FsWtJ", "8C77TQPaBfQvsJZuwguQ9c1PWGM75tNWqPE4VqBc23bj", "Hue8T9YqPzWqVdvFMfYYmQvj2nzFVMrWX96bjxCXxBBB", "CwbWp2EymT3rUBopHwjcY7oiGmFDreA8ULcziW9MsqWx", "6Gu1xvoL4Ek8c2XiWgyMChKVCRe6HqDDXhxJTLiFZ8Q1", "4p7PvUgZwTezJgXp7t3t3JUPVp1kdLr2sfsDvcEbJ2v9", "HVdKsiTKKMm9vQdZ9osBLCuD3HvZ7qNbYthb5nnVwbKd", "Fc964ruZByTsrxxozr3BxbaALu98H2DazgkZq5j93s1g", "7XJGVSjy1faBXRRA7vaufZLR7j3BdsSmY5G7AwnZKJfi", "B4t1g1G2exxcCLoDpG8dvRabdCiW2NRnbB4UHKCaCBv7", "FvANHVC5TRuZAK1knL2azqixnBEtcs3Xr3Cwq8mVZVXE", "6FssM2njdmj9qBPFRKg5MHFbFa1Th81U8d5VY3C8LcF5", "7qfGJGiQk5uK5LGi6S8G6d4Sbi66u97z12TAsY3bRjKK", "CvaP72PQTBTgJ5dUVPM3cV9VwA4HC27uZmMRMtFnm8Sq", "C8LX16ii9WHikumFbJWtZ6dncKZ4uKjux8TsuCRoX461", "5MyaAL2yFXReBEKjrG5SVDwUeNHRKce25CKxPMiYGpPL", "CiSAXbwkJWGuS8F6U6r2ewMEj23eLJWQH9uqda891rWP", "BRLXYNsDp3JsQwdX3emZK6aB24G8Dcvqc7RuVpMFYBN5", "GAsgPoyXFvWYji4tmE2xjei6SAJrdXr7cDXm3Xekugzr", "BzZ4x7xdRthHq331za4Rh7te1VL7AeJA7M4A6aYt7kFq", "82j5jNDG333bR8BUHTZ6f4X5SE2wRzzd97JU6jGEoZV4", "B9JyL91Nm9M4oHDvyxbLncZZTCW1txsw3sAztUBvdcAT", "UzYgn5cny4ZhoGhPBLtsUQ3u294GuLUzrZ6V4fzxgc6", "G87biKdnG6Jg8xiPwZQWnbmQpwUnwuL8erwLUssa4AYF", "5oM9PhirHJ1jRZEdyrZScoSwWeg738Sucz5iB4LRJ8vx", "Bhs2TK85Vx93zTNvRmJ7NhBvvCBEcPpy4mH3mSE1Eirb", "26qcvVs1ANeNd8nYrs4Cy416i47V4U8cAc8om4aPfw4p", "631KucuKd6yfs1uVrveLMY5iYWfXnLALBGtyXx17gN84", "2P6F8eCVivCnGnMrNNWbBXMCLgktq5RP93e1sWfUEaxH", "2VLjt2mtiEmJJLs2P7Mf4x3rJHUyk5BvuYbUMnu6qpjS", "6uVCHuuEQTuNDDVV93ps44N4FkiD8UyWmxeBsLhJ2y3J", "9tFSKW3CbLpN1av2SYiaFXrs8mfRNus75aqQ93UfhFHy", "DV2mz2ZqvVwGGUpCd3LQMG5xQ8RdkjHVTRm7GGa3YC5t", "HtrjrJTpLHM7MQc4X9h7R8iYq7gwXA8Kd1923HMmvBYs", "C2bB9mB5Ap2iV7G1qEr4Skv1p5PqdtrCPp21Sd9BSpbt", "278rFvXcfqqzNx7dZNCJ5aSrGSuTW85tiNWkKYUdCSkB", "G2CZG2yuqoVW617H8QNu2GkLG46W1RDwPMmAmYBErxW8", "3vvxshvxcMhEqsLz7JxrAaVZvCQX8a5g7wVdmTuzAxA1", "G4EDAtdwohe7m8X5Aqzv3asj4ZvEer7KH1yGF5c2zWCF", "7jv8iwpLkHt9TkzrMDwYrVhF34jPAiiCFnxLmsHJZgo6", "J6W7UBGVPndRYt53fEP2nDg8oJ2ZJ5PSw1siAMrasD2J", "FAy9TJYNnnv9QkYuWoqWM1gm2czXkRaRJ21cKz69siAX", "3VGzvwBXZU97CMZfArpYyNeFMPYCsEEZstfPtxxxAcpM", "DAzNNLTgY8qXdFBU1XRcx1bFrb6DRbH4GbZoZyo1o4m1", "AoixSSXpVg45ygCkTAqVaauLF5aGCYXMkJwXmc9hukkw", "3vDiLcAA5G7vZUMB6mXmNG17Ht7YCfNnnnUenQd2CBM1", "6qqKjmRHVvNkcDDUg3v8zUZ5Yivxe9rf3GAsDdQHpzWg", "8Bzh7BsiJSDKNR61ySGHHDAFNH8f9a3yTfCRWCBSZTrQ", "Cm4V2GsvipwdLXmf4Lzj9nNLErtkwKUhYeWqRAAnbT6C", "HH1uF15si3PfmLJ1eJtCmBwHqcvASdYJ6hYHdn3DscMC", "59qV86oFFjPiYg5i7Kdj9HPMqAErhRupr41ei2CrgUbR", "FqTkGTv8GqAdU8dMYJFn1uJYSvXXKjeMLCqxNLqGDzdr", "H9GEqoycXyVKUVLFxpEy8cdTsGSdbhW5q6FdQx5cgqJ2", "5xXi7Eg8Q3AWtRCo4AsyjpbaZqnoY2TeVLYA9yj8Maja", "4kAMbwSrNLVpUGQY8eUPPzAVM1UZjEAzrPfXXThR4cMa", "3SkKX5diBSRb1yFxH7dWPRLqwRKtpXWhaZ14GR1bmLca", "2g8sTtCMCrnWs2RuNM1dXKTndQf7jWNhmh7LxWDKyakU", "FfM78uTWjNGJz5RUY557CvWuVV2qTrLT5X5aaWdxQKci", "Cvw5HZsPQ11XE4YT5G4HYB5vuYgoZL2rusk8voQk7fWX", "3ZqKfg5JLFJvJKK8hPZkqs4upsENmRHmmVJ8K4ADoTw3", "9v3N8ThMqcfjDx2k3oujNd5Vs1HtETpLanJMhiMnALRq", "3cANKretH6qjwuuBfL8xztHs1m4qBZD7fEuFrwrjQNuf", "3XA5cmrinLv6GXFnE8G6Pv44eNWxcKHstqpCctMSXtV4", "63pXzsdhCoyFpAT8NyTjAfJK1rh8ypif3DrtqimeApaG", "3y8hqjhDwhCDGgfCKxo56YDPq4EDEH9zY3oZELUQT82a", "J2rERSCtgewxtBH24aFBQ3eNjqx4GSTEogLm2SZ9F9iR", "DPwLuQF5gMyFbaR2vZnYQ4g9yMxkQhaXjnMsDcqzgwg3", "7ndoJmPb7oJrjmvkCXWAkpSrQJy4DzYZa4PYfN8hViV5", "73ZJ2u5oMiygiPvAJWDwcQh5FTmQ8g6nMrBoy85zQMJj", "3cPqLxufMJ8oGwoSstAgN48FiA6FyKoNpxHE5fgcb2Rd", "e1EZJY63tMssrXFXCbev4GqQ8etAUHnKpVhckvwoZqb", "GDL9mkLdwLfw8jQAa3TWDayw9XvzTYfZsN8Z4RiNj8G6", "DTKxqgYAPDDdwKEePXhEzuD1gkJHudn5KuFhPpT92Whp", "9PjfgcxPGPNK5L22bDvQBbVU3WLh4iZVHycScg3hexG6", "CXf3wt1tY68k36jtrpSkG81dXsQurTPgrfLiRveg9boF"]
const chunkSize = 30;
const hashCont = [];
let txs = [];

for (let i = 0; i < hashes.length; i += chunkSize) {
  hashCont.push(hashes.slice(i, i + chunkSize));
}

hashCont.forEach(async function(item, i) {
  const history = await hsClient.getTokenHistory({
    condition: {
      tokenAddresses: item
    }
  })


  for (let i = 0; i < history.getMarketPlaceActionsByToken.length; i++) {
    for (let z = 0; z < history.getMarketPlaceActionsByToken[i].market_place_actions.length; z++) {

      if (history.getMarketPlaceActionsByToken[i].market_place_actions[z].type == "TRANSACTION") {
        console.log(
          { 
              "hash": history.getMarketPlaceActionsByToken[i].market_place_actions[z].signature, 
              "buyer": history.getMarketPlaceActionsByToken[i].market_place_actions[z].buyer_address, 
              "seller": history.getMarketPlaceActionsByToken[i].market_place_actions[z].seller_address, 
              "price": history.getMarketPlaceActionsByToken[i].market_place_actions[z].price
          })
          txs.push(
          { 
              "hash": history.getMarketPlaceActionsByToken[i].market_place_actions[z].signature, 
              "buyer": history.getMarketPlaceActionsByToken[i].market_place_actions[z].buyer_address, 
              "seller": history.getMarketPlaceActionsByToken[i].market_place_actions[z].seller_address, 
              "price": history.getMarketPlaceActionsByToken[i].market_place_actions[z].price
          });
      }
    }

}
  
  i++;
})

