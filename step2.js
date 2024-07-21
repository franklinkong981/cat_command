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

async function webCat(url) {
    try {
        const {data} = await axios.get(url);
        console.log("URL CONTENTS: ", data);
    }
    catch(error) {
        console.log(error);
    }
}

if (argv[2].includes('http://') || argv[2].includes('https://')) {
    webCat(argv[2]);
}
else {
    cat(argv[2]);
}