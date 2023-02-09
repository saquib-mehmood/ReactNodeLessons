var fs = require('fs');

fs.appendFile("mynewfile1.txt", "This is my text Morons!", 
    (err) => {
        if(err) throw err;
        console.log('Updated Morons!');
    })