module.exports = function (RED) {
  function PuppeteerPageScreenshot(config) {
    RED.nodes.createNode(this, config);
    var node = this; // Referencing the current node

    this.on("input", async function (msg, send, done) {
      try {
        // Capturing screen
        node.status({
          fill: "blue",
          shape: "dot",
          text: `Capturing screen ...`,
        });
        msg.payload = await msg.puppeteer.page.screenshot({
          fullPage: config.fullpage,
        });

        // Screen captured
        node.status({ fill: "green", shape: "dot", text: `Screen captured` });
        // Converting the image to base64
        RED.comms.publish("puppeteer-screenshot", {
          id: this.id,
          image: msg.payload.toString("base64"),
        });
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
  RED.nodes.registerType("puppeteer-page-screenshot", PuppeteerPageScreenshot);
};
