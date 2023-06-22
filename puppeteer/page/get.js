module.exports = function (RED) {
  function PuppeteerPageGetValue (config) {
    RED.nodes.createNode(this, config)

    // Retrieve the config node
    this.on('input', async function (msg) {
      try {
        let selector = config.selectortype!="str"?eval(config.selectortype+"."+config.selector):config.selector
        if(config.selectortype == 'flow' || config.selectortype == 'global') {
          selector = this.context()[config.selectortype].get(config.selectortype);
        }
        let property = config.propertytype!="str"?eval(config.propertytype+"."+config.property):config.property
        if(config.propertytype == 'flow' || config.propertytype == 'global') {
          property = this.context()[config.propertytype].get(config.propertytype);
        }
        this.status({fill:"green",shape:"dot",text:`Wait for ${selector}`});
        await msg.puppeteer.page.waitForSelector(selector)
        this.status({fill:"green",shape:"dot",text:`Getting ${selector}`});
        const value =  await msg.puppeteer.page.$eval(selector, (el,property) => el[property], property);
        this.status({fill:"grey",shape:"ring",text:`${value}`});
        msg.payload = value
        this.send(msg)
      } catch(e) {
        this.status({fill:"red",shape:"ring",text:e});
        msg.payload = undefined
        this.send(msg)
      }
    })
    this.on('close', function() {
      this.status({});
    });
    oneditprepare: function oneditprepare() {
      $("#node-input-name").val(this.name)
    }
  }
  RED.nodes.registerType('puppeteer-page-get-value', PuppeteerPageGetValue)
}
