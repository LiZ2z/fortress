"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Flex_1 = __importDefault(require("./Flex"));
const FlexItem_1 = __importDefault(require("./FlexItem"));
const Flex = Flex_1.default;
Flex.Item = FlexItem_1.default;
exports.default = Flex;
