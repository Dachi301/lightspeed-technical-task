"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// @ts-ignore
const fs_1 = __importDefault(require("fs"));
// @ts-ignore
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
const settingsPath = path_1.default.join(__dirname, '../../settings.json');
// GET /api/settings
router.get('/', (req, res) => {
    fs_1.default.readFile(settingsPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading settings' });
        }
        res.json(JSON.parse(data));
    });
});
// POST /api/settings
router.post('/', (req, res) => {
    const newSettings = req.body;
    fs_1.default.writeFile(settingsPath, JSON.stringify(newSettings, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error saving settings' });
        }
        res.json({ message: 'Settings updated successfully' });
    });
});
exports.default = router;
