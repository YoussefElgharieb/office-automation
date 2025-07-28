import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envFound = dotenv.config({ path: path.resolve(__dirname, "../../.env") });

if (envFound.error) {
    throw new Error(`${envFound.error}`);
}