import { findAndReadFiles } from './read';
import * as path from 'path';
import translate = require('google-translate-api');
import * as _ from 'lodash';
import { findFileAndWrite } from './write';

const cache: Map<string, string> = new Map();

const sourcePath: string = path.resolve('./asset');
const targetPath: string = path.resolve('./target');
findAndReadFiles(sourcePath, cache).then(() => {
	//console.log(cache);
	console.log(cache.size);
	//console.log([...cache.keys()].join(','));
	const keys = [ ...cache.keys() ];
	const keyChunk = _.chunk(keys, 200);
	(async function() {
		for (let item of keyChunk) {
			console.log(12);
			try {
				const value = await translate(item.join('&'), { from: 'zh-cn', to: 'zh-tw' });
				const result = value.text;
				const resArr = result.split('&');
				item.forEach((key, index) => {
					cache.set(key, resArr[index]);
				});
			} catch (e) {
				console.error(e);
			}
			await sleep(4000);
		}
	})().then(() => {
		findFileAndWrite(sourcePath, targetPath, cache);
	});
});
function sleep(interval: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, interval);
	});
}
