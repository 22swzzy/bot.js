const cmd = require("../../badoszApiCmd.js");
module.exports = class command extends cmd {
    constructor() {
        super({
            name: "dog",
            endpoint: "dog",
            argval: "none"
        });
    }
}