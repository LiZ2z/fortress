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
const Flex = ({ Tag = 'div', flex = 'none', justify = 'space-between', align, vertical = false, className, ...rest }, ref) => {
    const classNames = classNames_1.default(style_m_scss_1.default.flex, style_m_scss_1.default[`flex-${flex}`], style_m_scss_1.default[`flex-justify-${justify}`], align && style_m_scss_1.default[`flex-align-${align}`], vertical && style_m_scss_1.default['flex-direction-column'], className);
    return <Tag {...rest} ref={ref} className={classNames}/>;
};
exports.default = react_1.default.forwardRef(Flex);
