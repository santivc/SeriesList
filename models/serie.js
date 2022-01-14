const { v4: uuidv4 } = require('uuid');

class Serie {
    id = '';
    title = '';
    viewed = null;

    constructor(title) {
        this.id = uuidv4();
        this.title = title;
        this.viewed = false;
    }
}

module.exports = Serie;