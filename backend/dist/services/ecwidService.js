"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file https://app.ecwid.com/api/v3/101560752/products
dotenv_1.default.config();
const STORE_ID = process.env.STORE_ID;
const TOKEN = process.env.TOKEN;
const API_URL = `https://app.ecwid.com/api/v3/${STORE_ID}`;
const getProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${API_URL}/products`, {
            params: {
                token: TOKEN,
            },
        });
        return response.data.items;
    }
    catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
});
exports.getProducts = getProducts;
