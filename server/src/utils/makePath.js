import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



export const makeDirPath = (...filePath) => {
    return path.join(__dirname, ...filePath);
}


export const makePath = (...filePath) => {
    return path.join(...filePath);
}

