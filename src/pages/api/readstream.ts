import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import PDFParser from "pdf-parse";

export default async (req: NextApiRequest, res: NextApiResponse) => {

  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { pdfUrl } = req.body;

    if (!pdfUrl) {
      return res.status(400).json({ error: "Missing pdfURL in the request body" });
    }

    // Fetch the PDF file from the specified URL
    const response = await axios.get(pdfUrl, { responseType: "arraybuffer" });

    // Extract text from the PDF
    const data = await PDFParser(response.data);
    const text = data.text;

    res.status(200).json({ text });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

