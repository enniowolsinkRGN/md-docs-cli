const colors = require('colors');
const HtmlParser = require('../html-parser');

module.exports = class DefinitionHtmlParser extends HtmlParser {
    constructor({ definitionParser }) { 
        super();

        this.definitionParser = definitionParser;
    }

    async parse(element) {
        const elements = element
            .querySelectorAll('p,li,td,th,span');

        if (elements === undefined || elements.length === 0) {
            return;
        }

        console.info(colors.green(`\t* parsing ${elements.length} elements:`));

        for (const element of elements) {
            element.innerHTML = await this.definitionParser.parse(element.innerHTML);
        }
    }
}