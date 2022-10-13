import fetch from 'node-fetch';

export const getCollectionName = async (tokenMint) => {
    try {

        const apiUrl = `https://api-mainnet.magiceden.dev/v2/tokens/${tokenMint}`;

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'accept': 'application/json, text/plain, */*',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36'
            }
        });
    
        const tokenData = await response.json();

        return tokenData.collection;
        
    } catch(err) {
        return err
    }

}




