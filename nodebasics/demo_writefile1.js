var fs = require('fs');

fs.writeFile("mynewfile3.txt", "This is my text Morons! Stay away from my text", 
    (err) => {
        if(err) throw err;
        console.log('Replaced Morons!');
    })