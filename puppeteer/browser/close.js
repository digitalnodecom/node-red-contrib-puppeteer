const puppeteer = require("puppeteer");

module.exports = function (RED) {
  function PuppeteerBrowserClose(nodeConfig) {
    RED.nodes.createNode(this, nodeConfig);
    this.name = nodeConfig.name; // Getting the node's name
    var node = this; // Referencing the current node

    this.on("input", async function (msg, send, done) {
      try {
        node.status({
          fill: "blue",
          shape: "dot",
          text: `Closing browser...`,
        });
        // Closing browser
        await msg.puppeteer.browser.close();
        // Browser closed without any errors
        node.status({ fill: "green", shape: "dot", text: `Browser closed successfully` });
        // Deleting the msg.puppeteer object
        delete msg.puppeteer;
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
  RED.nodes.registerType("puppeteer-browser-close", PuppeteerBrowserClose);
};
