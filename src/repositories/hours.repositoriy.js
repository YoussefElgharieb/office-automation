import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, '../data/hours.json');


let hours = JSON.parse(readFileSync(filePath, 'utf-8'));

export const getHours = () => {
    return hours;
}

export const updateHours = (updatedHours) => {
    hours = updatedHours;
    writeFileSync(filePath, JSON.stringify(updatedHours, null, 2));
    return hours;
}