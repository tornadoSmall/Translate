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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findFileAndWrite = void 0;
var fs_1 = require("fs");
var path = __importStar(require("path"));
var _ = __importStar(require("lodash"));
var read_1 = require("./read");
function findFileAndWrite(sourcePath, targetPath, cache) {
    return __awaiter(this, void 0, void 0, function () {
        var e_1, files, _a, _b, file, sourceFilePath, targetFilePath, stats, content, fileContentObjs, newFileContentObj, e_2, e_3_1;
        var e_3, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fs_1.promises.mkdir(targetPath)];
                case 1:
                    _d.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _d.sent();
                    console.error(e_1);
                    return [3 /*break*/, 3];
                case 3: return [4 /*yield*/, fs_1.promises.readdir(sourcePath)];
                case 4:
                    files = _d.sent();
                    _d.label = 5;
                case 5:
                    _d.trys.push([5, 16, 17, 18]);
                    _a = __values(read_1.filterFile(files)), _b = _a.next();
                    _d.label = 6;
                case 6:
                    if (!!_b.done) return [3 /*break*/, 15];
                    file = _b.value;
                    sourceFilePath = path.join(sourcePath, file);
                    targetFilePath = path.join(targetPath, file);
                    _d.label = 7;
                case 7:
                    _d.trys.push([7, 13, , 14]);
                    return [4 /*yield*/, fs_1.promises.stat(sourceFilePath)];
                case 8:
                    stats = _d.sent();
                    if (!stats.isFile()) return [3 /*break*/, 10];
                    return [4 /*yield*/, fs_1.promises.readFile(sourceFilePath, { encoding: 'utf8' })];
                case 9:
                    content = _d.sent();
                    fileContentObjs = read_1.content2Obj(content);
                    newFileContentObj = createNewFileObj(fileContentObjs, cache);
                    if (newFileContentObj) {
                        writeFile(newFileContentObj, targetFilePath);
                    }
                    return [3 /*break*/, 12];
                case 10:
                    if (!stats.isDirectory()) return [3 /*break*/, 12];
                    return [4 /*yield*/, findFileAndWrite(sourceFilePath, targetFilePath, cache)];
                case 11:
                    _d.sent();
                    _d.label = 12;
                case 12: return [3 /*break*/, 14];
                case 13:
                    e_2 = _d.sent();
                    console.log(sourceFilePath);
                    console.error(e_2);
                    return [3 /*break*/, 14];
                case 14:
                    _b = _a.next();
                    return [3 /*break*/, 6];
                case 15: return [3 /*break*/, 18];
                case 16:
                    e_3_1 = _d.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 18];
                case 17:
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_3) throw e_3.error; }
                    return [7 /*endfinally*/];
                case 18: return [2 /*return*/];
            }
        });
    });
}
exports.findFileAndWrite = findFileAndWrite;
function createNewFileObj(fileContentObjs, cache) {
    var words = read_1.collectWords(fileContentObjs);
    if (!words.length) {
        return null;
    }
    var simp_suffix = /_chs$/i;
    var target = fileContentObjs.map(function (value) {
        var e_4, _a, _b;
        var data = value.Data;
        var dataObj = {};
        try {
            for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
                var _c = data_1_1.value, ColName = _c.ColName, ColValue = _c.ColValue;
                _.assign(dataObj, (_b = {}, _b[ColName] = ColValue, _b));
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        _.keys(dataObj)
            .filter(function (ColName) { return simp_suffix.test(ColName) && !/content/i.test(ColName) && !!dataObj[ColName]; })
            .forEach(function (key_chs) {
            var key_cht = /_chs/.test(key_chs)
                ? key_chs.replace(simp_suffix, '_cht')
                : key_chs.replace(simp_suffix, '_CHT');
            dataObj[key_cht] = cache.get(dataObj[key_chs]); //相当于 有就修改，没有就新增
        });
        var currentData = _.entries(dataObj).map(function (_a) {
            var _b = __read(_a, 2), key = _b[0], value = _b[1];
            return { ColName: key, ColValue: value };
        });
        return _.assign(value, { Data: currentData }); //重新赋值Data属性
    });
    return target;
}
function writeFile(fileContentObjs, targetFilePath) {
    return __awaiter(this, void 0, void 0, function () {
        var targetContent, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    targetContent = '';
                    fileContentObjs.forEach(function (value) {
                        targetContent += JSON.stringify(value, null, 4) + '\r\nGO\r\n';
                    });
                    if (!targetContent) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fs_1.promises.writeFile(targetFilePath, targetContent.trim().replace(/"\/(Date\([0-9+]+\))\/"/g, '"\\/$1\\/"'))];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_5 = _a.sent();
                    console.log(targetFilePath);
                    console.error(e_5);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=write.js.map