module.exports = function (RED) {
  function PuppeteerPageGoto (config) {
    RED.nodes.createNode(this, config)

    // Retrieve the config node
    this.on('input', async function (msg) {
      try {
        let url = config.urltype!="str"?eval(config.urltype+"."+config.url):config.url
        if(config.urltype == 'flow' || config.urltype == 'global') {
          url = this.context()[config.urltype].get(config.urltype);
        }
        this.status({fill:"green",shape:"dot",text:`Go to ${url}`});
        await msg.puppeteer.page.goto(url,config)
        this.status({fill:"grey",shape:"ring",text:url});
        this.send(msg)
      } catch (e) {
        this.status({fill:"red",shape:"ring",text:e});
        this.error(e)
      }
    })
    this.on('close', function() {
      this.status({});
    });
    oneditprepare: function oneditprepare() {
      $("#node-input-name").val(this.name)
      $("#node-input-waitUntil").val(this.waitUntil)
    }
  }
  RED.nodes.registerType('puppeteer-page-goto', PuppeteerPageGoto)
}
