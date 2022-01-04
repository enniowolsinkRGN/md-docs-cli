const chalk = require('chalk-next');

const path = require('path');

const AnchorParser = require('../anchor-parser');

module.exports = class MarkdownAnchorParser extends AnchorParser {
  constructor(options) {
    super();

    this.renderer = options?.renderer;
  }

  _canParse(anchor) { return path.basename(anchor.href).endsWith('.md') || anchor.href.includes(".md#"); }

  async _parse(anchor) {
    if(anchor.href.endsWith(".md")) {
        anchor.href = `${anchor.href.substring(0, anchor.href.length - 3)}.html`;
    }
    else {
        anchor.href = anchor.href.replace(".md#", ".html#");
    }
  }

  async _render(file) {
    if (!path.basename(file).startsWith('_'))
      return;
    
    const markdown = await this._readFileAsString(file);
    return await this.renderer.render(markdown);
  }
};
