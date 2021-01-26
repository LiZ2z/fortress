"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
// FIXME: typo
const react_1 = __importDefault(require("react"));
const classNames_1 = __importDefault(require("./classNames"));
const style_m_scss_1 = __importDefault(require("./style.m.scss"));
const FlexItem = ({ Tag = 'div', flex = 'none', className, ...rest }, ref) => {
    const classNames = classNames_1.default(style_m_scss_1.default[`flex-${flex}`], className);
    return <Tag {...rest} ref={ref} className={classNames}/>;
};
exports.default = react_1.default.forwardRef(FlexItem);
