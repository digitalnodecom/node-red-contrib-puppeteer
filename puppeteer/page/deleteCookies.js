module.exports = function (RED) {
  function PuppeteerPageDeleteCookies (config) {
    RED.nodes.createNode(this, config)

    // Retrieve the config node
    this.on('input', async function (msg) {
      try {
        const cookies = await msg.puppeteer.page.cookies();
        for (const cookie of cookies) {
          await msg.puppeteer.page.deleteCookie(deleteCookieObject(cookie));
        }
        this.send(msg)
      } catch (e) {
        this.status({fill:"red",shape:"ring",text:e});
        this.error(e)
      }
    })
    this.on('close', function() {
      this.status({});
    });
  }
  RED.nodes.registerType('puppeteer-page-deleteCookies', PuppeteerPageDeleteCookies)
}

function deleteCookieObject(cookie) {
  return {
    url: `${cookie.sourcePort === 443 ? 'https://' : 'http://'}${cookie.domain}${cookie.path}`,
    name: cookie.name
  };
}