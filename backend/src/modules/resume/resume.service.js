import pdfParse from "../../utils/pdfParse.js";

async function uploadResume(file) {

    const text =
        await pdfParse.extractTextFromPDF(
            file.path
        );

    return text;
}

export default {
    uploadResume
};