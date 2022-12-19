import { minify } from 'minify';
import tryToCatch from 'try-to-catch';
import fs from 'fs';
import path from 'path';
const options =
{
    "html": {
        "removeAttributeQuotes": false,
        removeOptionalTags: false
    },
    "css": {
        "compatibility": "*"
    },
    "js": {
        "ecma": 5
    },
}

let directoryPath = path.join('src');
let distPath = path.join('dist');
if (process.argv[2] === '-src') {
    directoryPath = path.join(process.argv[3]);
}
if (process.argv[4] === '-dist') {
    distPath = path.join(process.argv[5]);
}
fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    if (!fs.existsSync(distPath)) {
        fs.mkdirSync(distPath);
    }
    files.forEach(async (file) => {
        await mini(file);
        console.log(file, "minified!");
    });
});

const mini = async (file) => {
    const [error, data] = await tryToCatch(minify, `./src/${file}`, options);
    if (error)
        return console.error(error.message);

    fs.writeFile(`./dist/${file}`, data, err => {
        if (err) {
            console.error(err);
        }
    });
}