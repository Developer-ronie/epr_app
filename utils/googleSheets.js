import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const syncToGoogleSheet = async (data) => {
  try {
    await axios.post(process.env.GOOGLE_SHEET_API_URL, data);
  } catch (err) {
    console.error("Google Sheet Error:", err.message);
  }
};
