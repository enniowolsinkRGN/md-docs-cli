const chalk = require('chalk-next');
const path = require('path');
const { cwd } = require('process');

const AnchorParser = require('../anchor-parser');
const files = require('../../utils/files');

module.exports = class MarkdownMessageAnchorParser extends AnchorParser {

  constructor({ iFrameComponent }) {
    super();

    this.iFrameComponent = iFrameComponent;
  }

  _canParse(anchor) { return path.basename(anchor.href).endsWith('.message.md'); }

  async _parse(anchor, file) {
    console.info(chalk.green(`\t\t\t\t* rendering iframe`));

    const url = `${file}.html`;    
    
    const hash = await files.hash(file);
    
    return this.iFrameComponent.render({
      name: 'asyncapi',
      src: `./${path.relative(cwd(), url)}?_v=${hash}`
    });
  }
};
