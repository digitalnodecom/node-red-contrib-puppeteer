module.exports = function (RED) {
  function PuppeteerPageSetCookies (config) {
    RED.nodes.createNode(this, config)

    // Retrieve the config node
    this.on('input', async function (msg) {
      try {
        // Parsing the provided cookies
        let cookies = JSON.parse(config.cookies !== "" ? config.cookies : JSON.stringify(msg.payload));

        // Setting the cookies
        for (const cookie of cookies) {
          await msg.puppeteer.page.setCookie(cookie);
        }

        this.send(msg);
        this.status({fill:"green",shape:"dot",text:"Loaded cookies"});
        setTimeout(() => {
          this.status({});
        }, 2000);
      } catch (e) {
        this.status({fill:"red",shape:"ring",text:e});
        this.error(e)
      }
    })
    this.on('close', function() {
      this.status({});
    });
  }
  RED.nodes.registerType('puppeteer-page-setCookies', PuppeteerPageSetCookies)
}
