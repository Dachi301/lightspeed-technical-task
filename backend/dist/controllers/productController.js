"use strict";
// backend/src/controllers/productController.ts
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
exports.addToCart = exports.updateSettings = exports.getSettings = exports.handleRecentProducts = void 0;
const ecwidService_1 = require("../services/ecwidService");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * Handles fetching recently updated products.
 */
const handleRecentProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limitParam = req.query.limit;
    const limit = limitParam ? parseInt(limitParam, 10) : 5;
    // Validate 'limit'
    if (isNaN(limit) || limit < 1) {
        return res.status(400).json({ error: "'limit' must be a positive integer" });
    }
    try {
        const products = yield (0, ecwidService_1.getRecentProducts)(limit);
        return res.status(200).json(products);
    }
    catch (error) {
        console.log(`Error fetching recent products: ${error.message}`);
        return res.status(500).json({ error: 'Failed to fetch recent products' });
    }
});
exports.handleRecentProducts = handleRecentProducts;
/**
 * Retrieves widget settings.
 */
const getSettings = (req, res) => {
    const settingsPath = path_1.default.join(__dirname, '../../settings.json');
    fs_1.default.readFile(settingsPath, 'utf-8', (err, data) => {
        if (err) {
            console.log(`Error reading settings: ${err.message}`);
            return res.status(500).json({ error: 'Failed to retrieve settings' });
        }
        try {
            const settings = JSON.parse(data);
            return res.status(200).json(settings);
        }
        catch (parseErr) {
            console.log(`Error parsing settings: ${parseErr.message}`);
            return res.status(500).json({ error: 'Failed to parse settings' });
        }
    });
};
exports.getSettings = getSettings;
const updateSettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const settings = req.body;
    // Basic validation
    if (typeof settings.isEnabled !== 'boolean' || typeof settings.productLimit !== 'number') {
        return res.status(400).json({ error: 'Invalid settings format' });
    }
    const settingsPath = path_1.default.join(__dirname, '../../settings.json');
    fs_1.default.writeFile(settingsPath, JSON.stringify(settings, null, 2), (err) => {
        if (err) {
            console.log(`Error writing settings: ${err.message}`);
            return res.status(500).json({ error: 'Failed to update settings' });
        }
        return res.status(200).json({ message: 'Settings updated successfully' });
    });
});
exports.updateSettings = updateSettings;
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, fromWidget } = req.body;
    if (!productId || typeof productId !== 'number') {
        return res.status(400).json({ error: 'Invalid productId' });
    }
    try {
        yield (0, ecwidService_1.addProductToCart)(productId, 1, fromWidget || false);
        return res.status(200).json({ message: 'Product added to cart successfully' });
    }
    catch (error) {
        console.log(`Error adding product to cart: ${error.message}`);
        return res.status(500).json({ error: 'Failed to add product to cart' });
    }
});
exports.addToCart = addToCart;
