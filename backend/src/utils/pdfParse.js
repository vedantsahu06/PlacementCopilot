import { readFile } from 'node:fs/promises';
import { PDFParse } from 'pdf-parse';

async function parseLocalFile(filePath) {
  try {
    // 1. Read the local PDF file into a buffer
    const buffer = await readFile(filePath);
    
    // 2. Initialize PDFParse with the 'data' property instead of 'url'
    const parser = new PDFParse({ data: buffer });
    
    // 3. Extract the text (or use getInfo(), getTable(), etc.)
    const result = await parser.getText();
    
    // console.log(result.text);
    
    // 4. Always destroy the parser instance to free up memory
    await parser.destroy();

    return result.text;
    
  } catch (error) {
    console.error("Error parsing the PDF:", error);
  }
}

export default {
    extractTextFromPDF: parseLocalFile
}