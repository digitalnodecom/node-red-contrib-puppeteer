module.exports = function (RED) {
  function PuppeteerPageClose(nodeConfig) {
    RED.nodes.createNode(this, nodeConfig);
    var node = this; // Referencing the current node

    this.on("input", async function (msg, send, done) {
      try {
        // Closing the page (tab)
        node.status({
          fill: "blue",
          shape: "dot",
          text: `Closing page(tab)...`,
        });
        await msg.puppeteer.page.close();

        // Updating the puppeteer page object
        msg.puppeteer.page = (await msg.puppeteer.browser.pages())[0];
        node.status({ fill: "green", shape: "dot", text: `Tab closed` });
        // Sending the msg
        send(msg);

      } catch (e) {
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
  RED.nodes.registerType("puppeteer-page-close", PuppeteerPageClose);
};
