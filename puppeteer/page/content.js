module.exports = function (RED) {
  function PuppeteerPageContent(nodeConfig) {
    RED.nodes.createNode(this, nodeConfig);
    var node = this; // Referencing the current node

    // Retrieve the config node
    this.on("input", async function (msg, send, done) {
      try {
        // Get page content
        const content = await msg.puppeteer.page.content();
        // Update puppeteer msg property
        msg.puppeteer.content = content;
        node.status({ fill: "green", shape: "dot", text: 'Content fetched!' });
        // Send the msg
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
  RED.nodes.registerType("puppeteer-page-content", PuppeteerPageContent);
};
