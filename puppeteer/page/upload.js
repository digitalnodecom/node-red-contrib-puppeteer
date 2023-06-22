module.exports = function (RED) {
  function PuppeteerPageUpload (config) {
    RED.nodes.createNode(this, config)

    // Retrieve the config node
    this.on('input', async function (msg) {
      try {
        let selector = config.selectortype!="str"?eval(config.selectortype+"."+config.selector):config.selector
        if(config.selectortype == 'flow' || config.selectortype == 'global') {
          selector = this.context()[config.selectortype].get(config.selectortype);
        }
        let file = config.filetype!="str"?eval(config.filetype+"."+config.file):config.file
        if(config.filetype == 'flow' || config.filetype == 'global') {
          file = this.context()[config.filetype].get(config.filetype);
        }
        this.status({fill:"green",shape:"dot",text:`Wait for ${selector}`});
        await msg.puppeteer.page.waitForSelector(selector)
        this.status({fill:"green",shape:"dot",text:`Upload ${file}`});
        await (await msg.puppeteer.page.$(selector)).uploadFile(file)
        this.status({fill:"grey",shape:"ring",text:`Uploaded ${file}`});
        this.send(msg)
      } catch(e) {
          this.status({fill:"red",shape:"ring",text:e});
          this.error(e)
      }
    })
    this.on('close', function() {
      this.status({});
    });
    oneditprepare: function oneditprepare() {
      $("#node-input-name").val(this.name)
    }
  }
  RED.nodes.registerType('puppeteer-page-upload', PuppeteerPageUpload)
}
