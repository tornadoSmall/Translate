"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectWords = exports.filterFile = exports.content2Obj = exports.findAndReadFiles = void 0;
var fs_1 = require("fs");
var path = __importStar(require("path"));
var _ = __importStar(require("lodash"));
function content2Obj(content) {
    var reg = new RegExp(/GO((\r\n|\r|\n|$))/g);
    var fileContentObjs = [];
    var regInfo;
    var lastIndex = 0;
    while ((regInfo = reg.exec(content))) {
        if (lastIndex < regInfo.index) {
            fileContentObjs.push(JSON.parse(content.substring(lastIndex, regInfo.index).trim()));
        }
        lastIndex = reg.lastIndex;
    }
    return fileContentObjs;
}
exports.content2Obj = content2Obj;
function collectWords(fileContentObjs) {
    var simp_suffix = /_chs$/i;
    var words = _.flatten(fileContentObjs.map(function (_a) {
        var Data = _a.Data;
        return Data;
    }))
        .filter(function (_a) {
        var ColName = _a.ColName;
        return simp_suffix.test(ColName) && !/content/i.test(ColName);
    })
        .filter(function (_a) {
        var ColValue = _a.ColValue;
        return !!ColValue;
    })
        .map(function (_a) {
        var ColValue = _a.ColValue;
        return ColValue;
    });
    return words;
}
exports.collectWords = collectWords;
function filterFile(files) {
    return files.filter(function (file) { return !file.match(/[0-9a-zA-Z]+-[0-9a-zA-Z]+-/); });
}
exports.filterFile = filterFile;
/**
 * 深度遍历
 * @param pathName 文件路径
 */
function findAndReadFiles(pathName, cache) {
    if (cache === void 0) { cache = new Map(); }
    return __awaiter(this, void 0, void 0, function () {
        var fileStat, files, _a, _b, file, currentFileName, e_1_1, content, fileContentObjs, e_2;
        var e_1, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, fs_1.promises.stat(pathName)];
                case 1:
                    fileStat = _d.sent();
                    if (!fileStat.isDirectory()) return [3 /*break*/, 11];
                    return [4 /*yield*/, fs_1.promises.readdir(pathName)];
                case 2:
                    files = _d.sent();
                    _d.label = 3;
                case 3:
                    _d.trys.push([3, 8, 9, 10]);
                    _a = __values(filterFile(files)), _b = _a.next();
                    _d.label = 4;
                case 4:
                    if (!!_b.done) return [3 /*break*/, 7];
                    file = _b.value;
                    currentFileName = path.join(pathName, file);
                    return [4 /*yield*/, findAndReadFiles(currentFileName, cache)];
                case 5:
                    _d.sent();
                    _d.label = 6;
                case 6:
                    _b = _a.next();
                    return [3 /*break*/, 4];
                case 7: return [3 /*break*/, 10];
                case 8:
                    e_1_1 = _d.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 10];
                case 9:
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 10: return [3 /*break*/, 14];
                case 11:
                    _d.trys.push([11, 13, , 14]);
                    return [4 /*yield*/, fs_1.promises.readFile(pathName, { encoding: 'utf8' })];
                case 12:
                    content = _d.sent();
                    fileContentObjs = content2Obj(content);
                    collectWords(fileContentObjs).forEach(function (word) { return cache.set(word, null); });
                    return [3 /*break*/, 14];
                case 13:
                    e_2 = _d.sent();
                    console.error(pathName, e_2);
                    return [3 /*break*/, 14];
                case 14: return [2 /*return*/];
            }
        });
    });
}
exports.findAndReadFiles = findAndReadFiles;
//# sourceMappingURL=read.js.map