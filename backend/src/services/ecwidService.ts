import axios from 'axios';
import dotenv from "dotenv";

// Load environment variables from .env file https://app.ecwid.com/api/v3/101560752/products
dotenv.config();

const STORE_ID = process.env.STORE_ID;
const TOKEN = process.env.TOKEN;
const API_URL = `https://app.ecwid.com/api/v3/${STORE_ID}`;

export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`, {
            params: {
                token: TOKEN,
            },
        });
        return response.data.items;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

