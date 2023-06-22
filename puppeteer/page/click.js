
module.exports = function (RED) {
  function PuppeteerPageClick (config) {
    RED.nodes.createNode(this, config)
    // Retrieve the config node
    config.clickCount = parseInt(config.clickCount)
    this.on('input', async function (msg) {
      try {
        let selector = config.selectortype!="str"?eval(config.selectortype+"."+config.selector):config.selector
        if(config.selectortype == 'flow' || config.selectortype == 'global') {
          selector = this.context()[config.selectortype].get(config.selectortype);
        }
        let downloadPath = (config.downloadPathtype=="msg")?eval(config.downloadPathtype+"."+config.downloadPath):config.downloadPath
        if(config.downloadPathtype == 'flow' || config.downloadPathtype == 'global') {
          downloadPath = this.context()[config.downloadPathtype].get(config.downloadPath);
        }
        this.warn(downloadPath);
        if(downloadPath && downloadPath != '') {
          await msg.puppeteer.page.setRequestInterception(true);
          msg.puppeteer.page.on('request', interceptedRequest => {
            if (interceptedRequest.url().endsWith('.zip')) {
              interceptedRequest.continue({ url: 'chrome://downloads/' });
            } else {
              interceptedRequest.continue();
            }
          });
        }
        this.status({fill:"green",shape:"dot",text:`Wait for ${selector}`});
        await msg.puppeteer.page.waitForSelector(selector)
        this.status({fill:"green",shape:"dot",text:`Click ${selector}`});
        await msg.puppeteer.page.click(selector,config)
        if(downloadPath && downloadPath != '') {
          // Set the download path
          await msg.puppeteer.page._client.send('Page.setDownloadBehavior', {
            behavior: 'allow',
            downloadPath: downloadPath,
          });
        }
        this.status({fill:"grey",shape:"ring",text:`Clicked ${selector}`});
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
      $("#node-input-clickCount").val(config.clickCount)
      $("#node-input-delay").val(config.delay)
      $("#node-input-button").val(config.button)
      $("#node-input-name").val(config.name)
    }
  }
  RED.nodes.registerType('puppeteer-page-click', PuppeteerPageClick)
}
