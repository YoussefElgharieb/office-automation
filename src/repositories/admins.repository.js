import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, '../data/adminIds.json');

let adminIds = JSON.parse(readFileSync(filePath, 'utf8'));

export const get = () => {
    return adminIds;
}

export const update = (ids) => {
    adminIds = ids;
    writeFileSync(filePath, JSON.stringify(adminIds, null, 2));
    return adminIds;
}