var fs = require('fs');

fs.rename("mynewfile1.txt", "myrenamedmoronfile.txt",
    (err) => {
        if(err) throw err;
        console.log("File RENAMED MORONS!")
    })