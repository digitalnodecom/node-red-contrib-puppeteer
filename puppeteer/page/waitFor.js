module.exports = function (RED) {
  function PuppeteerPageWaitFor (config) {
    RED.nodes.createNode(this, config)

    // Retrieve the config node
    this.on('input', async function (msg) {
      try {
        let selector = config.selectortype!="str"?eval(config.selectortype+"."+config.selector):config.selector
        if(config.selectortype == 'flow' || config.selectortype == 'global') {
          selector = this.context()[config.selectortype].get(config.selectortype);
        }
        this.status({fill:"green",shape:"dot",text:`Wait for ${selector}`});
        await msg.puppeteer.page.waitForSelector(selector)
        this.status({fill:"grey",shape:"ring",text:`${selector} exists`});
        msg.error = null;
      } catch (e) {
        this.status({fill:"red",shape:"ring",text:e});
        this.error(e)
        msg.error = e;
      }
      this.send(msg)
    })
    this.on('close', function() {
      this.status({});
    });
    oneditprepare: function oneditprepare() {
      $("#node-input-name").val(this.name)
    }
  }
  RED.nodes.registerType('puppeteer-page-waitFor', PuppeteerPageWaitFor)
}
