module.exports = function (RED) {
  function PuppeteerBrowserNewPage(nodeConfig) {
    RED.nodes.createNode(this, nodeConfig);
    var node = this; // Referencing the current node

    this.on("input", async function (msg, send, done) {
      try {
        node.status({
          fill: "blue",
          shape: "dot",
          text: `Opening new Tab...`,
        });
        // Opening new page
        msg.puppeteer.page = await msg.puppeteer.browser.newPage();
        msg.puppeteer.page.setDefaultTimeout(nodeConfig.timeout);

        // New page opened (tab created) succesfully
        node.status({ fill: "green", shape: "dot", text: `New Tab created` });
        // Sending the msg
        send(msg);

      } catch (e) { // If an error occurred during opening a new page/tab
        // If an error occured
        node.error(e);
        // Update the status
        node.status({ fill: "red", shape: "dot", text: e });
        // And update the message error property
        msg.error = e;
        send(msg);
      }

      // Clear status of the node
      setTimeout(() => {
        done();
        node.status({});
      }, (msg.error) ? 10000 : 3000);
    });
    this.on("close", function () {
      node.status({});
    });
    oneditprepare: function oneditprepare() {
      $("#node-input-name").val(this.name);
    }
  }
  RED.nodes.registerType("puppeteer-browser-newPage", PuppeteerBrowserNewPage);
};
