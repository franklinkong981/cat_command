const fs = require('fs');
const axios = require('axios');
const argv = process.argv;

function cat(path) {
    fs.readFile(path, 'utf8', (error, data) => {
        if (error) { 
            console.log("ERROR: ", error);
            process.kill(1); 
        }
        console.log("FILE CONTENTS: ", data);
    });    
}

function catWrite(path, writePath) {
    fs.readFile(path, 'utf8', (error, data) => {
        if (error) { 
            console.log("ERROR: ", error);
            process.kill(1); 
        }
        fs.writeFile(writePath, data, 'utf8', err => {
            if (err) {
                console.log("ERROR: ", err);
                process.kill(1);
            }
            console.log(`No output, but ${writePath} contains contents of ${path}`);
        });
    });  
}

async function webCat(url) {
    try {
        const {data} = await axios.get(url);
        console.log("URL CONTENTS: ", data);
    }
    catch(error) {
        console.log(error);
    }
}

async function webCatWrite(url, writePath) {
    try {
        const {data} = await axios.get(url);
        fs.writeFile(writePath, data, 'utf8', err => {
            console.log(`No output, but ${writePath} contains HTML of ${url}`);
        });
    }
    catch(error) {
        console.log(error);
        process.kill(1);
    }
}

if (argv[2] == '--out') {
    if (argv[4].includes('http://') || argv[4].includes('https://')) {
        webCatWrite(argv[4], argv[3]);
    }
    else {
        catWrite(argv[4], argv[3]);
    }
}
else if (argv[2].includes('http://') || argv[2].includes('https://')) {
    webCat(argv[2]);
}
else {
    cat(argv[2]);
}