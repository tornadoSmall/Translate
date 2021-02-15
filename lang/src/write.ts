import { promises as fsPromise } from 'fs';
import * as path from 'path';
import * as _ from 'lodash';
import { filterFile, content2Obj, collectWords } from './read';
import { FileContentObj } from './type/type';
async function findFileAndWrite(sourcePath: string, targetPath: string, cache: Map<string, string>) {
	try {
		await fsPromise.mkdir(targetPath);
	} catch (e) {
		console.error(e);
	}

	const files = await fsPromise.readdir(sourcePath);
	for (let file of filterFile(files)) {
		const sourceFilePath = path.join(sourcePath, file);
		const targetFilePath = path.join(targetPath, file);
		try {
			const stats = await fsPromise.stat(sourceFilePath);
			if (stats.isFile()) {
				const content = await fsPromise.readFile(sourceFilePath, { encoding: 'utf8' });
				const fileContentObjs = content2Obj(content);
				const newFileContentObj = createNewFileObj(fileContentObjs, cache);
				if (newFileContentObj) {
					writeFile(<FileContentObj[]>newFileContentObj, targetFilePath);
				}
			} else if (stats.isDirectory()) {
				await findFileAndWrite(sourceFilePath, targetFilePath, cache);
			}
		} catch (e) {
			console.log(sourceFilePath);
			console.error(e);
		}
	}
}
function createNewFileObj(fileContentObjs: FileContentObj[], cache: Map<string, string>) {
	const words = collectWords(fileContentObjs);
	if (!words.length) {
		return null;
	}
	const simp_suffix = /_chs$/i;
	const target = fileContentObjs.map((value) => {
		const data = value.Data;
		const dataObj: any = {};
		for (let { ColName, ColValue } of data) {
			_.assign(dataObj, { [ColName]: ColValue });
		}
		_.keys(dataObj)
			.filter((ColName) => simp_suffix.test(ColName) && !/content/i.test(ColName) && !!dataObj[ColName])
			.forEach((key_chs) => {
				const key_cht = /_chs/.test(key_chs)
					? key_chs.replace(simp_suffix, '_cht')
					: key_chs.replace(simp_suffix, '_CHT');
				dataObj[key_cht] = cache.get(dataObj[key_chs]); //相当于 有就修改，没有就新增
			});
		const currentData = _.entries(dataObj).map(([ key, value ]: [string, any]) => {
			return { ColName: key, ColValue: value };
		});
		return _.assign(value, { Data: currentData }); //重新赋值Data属性
	});
	return target;
}

async function writeFile(fileContentObjs: FileContentObj[], targetFilePath: string) {
	let targetContent = '';
	fileContentObjs.forEach((value) => {
		targetContent += JSON.stringify(value, null, 4) + '\r\nGO\r\n';
	});
	if (targetContent) {
		try {
			await fsPromise.writeFile(
				targetFilePath,
				targetContent.trim().replace(/"\/(Date\([0-9+-]+\))\/"/g, '"\\/$1\\/"')
			);
		} catch (e) {
			console.log(targetFilePath);
			console.error(e);
		}
	}
}

export { findFileAndWrite };
