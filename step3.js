const fs = require('fs');
const axios = require('axios');
const argv = process.argv;

function cat(path, writePath = null) {
    fs.readFile(path, 'utf8', (error, data) => {
        if (error) { 
            console.log("ERROR: ", error);
            process.kill(1); 
        }
        if (writePath) {
            catWrite(writePath, data);
        }
        else {
            console.log("FILE CONTENTS: ", data);
        }
    });    
}

function catWrite(writePath, data) {
    fs.writeFile(writePath, data, 'utf8', err => {
        if (err) {
            console.log("ERROR: ", err);
            process.kill(1);
        }
        console.log(`No output, but ${writePath} contains contents of ${writePath}`);
    });
}

async function webCat(url, writePath = null) {
    try {
        const {data} = await axios.get(url);
        if (writePath) {
            webCatWrite(writePath, data, url);
        }
        else {
            console.log("URL CONTENTS: ", data);
        }
    }
    catch(error) {
        console.log(error);
        process.kill(1);
    }
}

function webCatWrite(writePath, data, url) {
    fs.writeFile(writePath, data, 'utf8', err => {
        console.log(`No output, but ${writePath} contains HTML of ${url}`);
    });
}

function parseArgs() {
    if (argv[2] == '--out') {
        if (argv[4].includes('http://') || argv[4].includes('https://')) {
            webCat(argv[4], argv[3]);
        }
        else {
            cat(argv[4], argv[3]);
        }
    }
    else if (argv[2].includes('http://') || argv[2].includes('https://')) {
        webCat(argv[2]);
    }
    else {
        cat(argv[2]);
    }
}

parseArgs();
