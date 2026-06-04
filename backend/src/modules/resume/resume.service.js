import pdfParse from "../../utils/pdfParse.js";
import resumeParserPrompt from "../../ai/prompts/resumeParser.prompt.js";
async function uploadResume(file) {

    const text =
        await pdfParse.extractTextFromPDF(
            file.path
        );

    // return text;
    const parsedData = await resumeParserPrompt(text);
    return parsedData;

}

export default {
    uploadResume
};