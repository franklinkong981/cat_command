const fs = require('fs');
const argv = process.argv;

function cat(path) {
    fs.readFile(path, 'utf8', (error, data) => {
        if (error) { 
            console.log("ERROR: ", error);
            process.kill(1); 
        }
        console.log("CONTENTS: ", data);
    });    
}

// argv[0] = node, argv[1] = step1.js, argv[2] = path to file you want to read from.
cat(argv[2]);