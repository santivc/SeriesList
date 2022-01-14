const fs = require('fs');
const path = require('path');

const path_file = path.join('.', 'db', 'series.json') 


const fileSystem = {

    writeFile: (data) => {
        const dataStr = JSON.stringify(data);
        fs.writeFileSync(path_file, dataStr)
    },

    readFile: () => {
        if (!fs.existsSync(path_file)) {
            return null;
        }

        const info = fs.readFileSync(path_file, 'utf-8');
        const data = JSON.parse(info);

        return data;
    }
}

module.exports = fileSystem;