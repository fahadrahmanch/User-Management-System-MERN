"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
class app {
    constructor() {
        this.app = (0, express_1.default)();
    }
    listen() {
        this.app.listen(3000, () => {
            console.log("server is running");
        });
    }
}
exports.app = app;
