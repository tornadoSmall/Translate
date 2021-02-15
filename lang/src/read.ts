import { promises as fsPromise } from 'fs';
import * as path from 'path';
import * as _ from 'lodash';
import { FileContentObj } from './type/type';

function content2Obj(content: string): FileContentObj[] {
	const reg = new RegExp(/GO((\r\n|\r|\n|$))/g);
	const fileContentObjs: FileContentObj[] = [];
	let regInfo;
	let lastIndex = 0;
	while ((regInfo = reg.exec(content))) {
		if (lastIndex < regInfo.index) {
			fileContentObjs.push(JSON.parse(content.substring(lastIndex, regInfo.index).trim()));
		}

		lastIndex = reg.lastIndex;
	}
	return fileContentObjs;
}

function collectWords(fileContentObjs: FileContentObj[]) {
	const simp_suffix = /_chs$/i;

	const words = _.flatten(fileContentObjs.map(({ Data }) => Data))
		.filter(({ ColName }) => simp_suffix.test(ColName) && !/content/i.test(ColName))
		.filter(({ ColValue }) => !!ColValue)
		.map(({ ColValue }) => ColValue);
	return words;
}
function filterFile(files: string[]) {
	return files.filter((file) => !file.match(/[0-9a-zA-Z]+-[0-9a-zA-Z]+-/));
}
/**
 * 深度遍历
 * @param pathName 文件路径
 */
async function findAndReadFiles(pathName: string, cache = new Map()) {
	const fileStat = await fsPromise.stat(pathName);
	if (fileStat.isDirectory()) {
		const files = await fsPromise.readdir(pathName);
		for (let file of filterFile(files)) {
			const currentFileName = path.join(pathName, file);
			await findAndReadFiles(currentFileName, cache);
		}
	} else {
		try {
			const content = await fsPromise.readFile(pathName, { encoding: 'utf8' });
			const fileContentObjs = content2Obj(content);
			collectWords(fileContentObjs).forEach((word) => cache.set(word, null));
		} catch (e) {
			console.error(pathName, e);
		}
	}
}

export { findAndReadFiles, content2Obj, filterFile,collectWords };
