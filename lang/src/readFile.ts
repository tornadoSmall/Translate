// import { promises as fsPromise } from 'fs';
// import * as path from 'path';
// import * as _ from 'lodash';
// import translate = require('google-translate-api');

// const sourcePath: string = path.resolve('./asset');
// const targetPath: string = path.resolve('./out');

// (async function readAndTranslate(sourcePath: string, targetPath: string) {
// 	try {
// 		await fsPromise.mkdir(targetPath);
// 	} catch (e) {
// 		console.error(e);
// 	}

// 	const files = await fsPromise.readdir(sourcePath);
// 	for (let file of files) {
// 		if (file.match(/[0-9a-zA-Z]+-[0-9a-zA-Z]+-/)) {
// 			continue;
// 		}
// 		const fullPath = path.join(sourcePath, file);
// 		const targetFilePath = path.join(targetPath, file);
// 		try {
// 			const stats = await fsPromise.stat(fullPath);
// 			if (stats.isFile()) {
// 				const content = await fsPromise.readFile(fullPath, { encoding: 'utf8' });
// 				await processFile(content, targetFilePath);
// 				await sleep(1000);
// 				console.log(1);
// 			} else if (stats.isDirectory()) {
// 				await readAndTranslate(fullPath, targetFilePath);
// 			} else {
// 				Promise.reject('文件类型不正确');
// 			}
// 		} catch (e) {
// 			console.log(fullPath)
// 			console.error(e);
// 		}
// 	}
// })(sourcePath, targetPath);

// async function processFile(content: string, targetPath: string) {
// 	const reg = new RegExp(/GO((\r\n|\r|\n|$))/g);
// 	const simp_suffix = /_chs$/i;
// 	let regInfo;
// 	const fileContentObjs: FileContentObj[] = [];
// 	let lastIndex = 0;
// 	while ((regInfo = reg.exec(content))) {
// 		fileContentObjs.push(JSON.parse(String.raw`${content.substring(lastIndex, regInfo.index)}`));
// 		lastIndex = reg.lastIndex;
// 	}
// 	const textSpArray = _.flatten(fileContentObjs.map(({ Data }) => Data))
// 		.filter(
// 			({ ColName }) => simp_suffix.test(ColName) && !ColName.includes('content') && !ColName.includes('CONTENT')
// 		)
// 		.filter(({ ColValue }) => !!ColValue)
// 		.map(({ ColValue }) => ColValue);
// 	const textSpSet = new Set(textSpArray);
// 	const originMapTarget = new Map();
// 	if (!textSpArray.length) {
// 		return;
// 	}
// 	try {
// 		const textOriginArr: string[] = Array.from(textSpSet);
// 		let { text } = await translate(textOriginArr.toString(), { from: 'zh-cn', to: 'zh-tw' });
// 		const textTargetArr: string[] = text.split(',');
// 		const length = textTargetArr.length;

// 		for (let i = 0; i < length; ++i) {
// 			originMapTarget.set(textOriginArr[i], textTargetArr[i]);
// 		}
// 	} catch (e) {
// 		console.log(targetPath);
// 		console.error(e);
// 	}
// 	if (originMapTarget.size) {
// 		const target = fileContentObjs.map((value) => {
// 			const data = value.Data;
// 			const dataObj: any = {};
// 			for (let { ColName, ColValue } of data) {
// 				_.assign(dataObj, { [ColName]: ColValue });
// 			}
// 			_.keys(dataObj)
// 				.filter(
// 					(key) =>
// 						simp_suffix.test(key) && !!dataObj[key] && !key.includes('content') && !key.includes('CONTENT')
// 				)
// 				.forEach((key_chs) => {
// 					const key_cht = /_chs/.test(key_chs)
// 						? key_chs.replace(simp_suffix, '_cht')
// 						: key_chs.replace(simp_suffix, '_CHT');
// 					dataObj[key_cht] = originMapTarget.get(dataObj[key_chs]);
// 				});
// 			const currentData = _.entries(dataObj).map(([ key, value ]: [string, any]) => {
// 				return { ColName: key, ColValue: value };
// 			});
// 			return _.assign(value, { Data: currentData });
// 		});
// 		let targetContent = '';
// 		target.forEach((value) => {
// 			targetContent += JSON.stringify(value, null, 4) + '\r\nGO\r\n';
// 		});
// 		if (targetContent) {
// 			try {
// 				await fsPromise.writeFile(
// 					targetPath,
// 					targetContent.trimRight().replace(/"\/(Date\([0-9+]+\))\/"/g, '"\\/$1\\/"')
// 				);
// 			} catch (e) {
// 				console.log(targetPath);
// 				console.error(e);
// 			}
// 		}
// 	}
// }
// function sleep(interval: number) {
// 	return new Promise((resolve) => {
// 		setTimeout(resolve, interval);
// 	});
// }
