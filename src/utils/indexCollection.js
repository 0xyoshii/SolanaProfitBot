import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getMintAddresses } from './getHashlist.js'
import { getCollectionName } from './getMetadata.js'

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export const writeToCsv = async (creatorAddress) => {

    const hashes = await getMintAddresses(creatorAddress);
    const collectionName = await getCollectionName(hashes[0]);

    var csv = "hashlist \r\n";
    for (let hash of hashes) {
        csv += hash + "\r\n";
    }

    fs.writeFileSync(path.join(__dirname, `/../../hashes/hashlists/${collectionName}.csv`), csv);
    return "Indexed collection - " + collectionName;
}

