module.exports = function (RED) {
  function PuppeteerPageKeyboardPress(config) {
    RED.nodes.createNode(this, config);
    var node = this; // Referencing the current node

    this.on("input", async function (msg, send, done) {
      try {
        // Pressing the provided key
        node.status({
          fill: "blue",
          shape: "dot",
          text: `Pressing Key ${config.key}`,
        });
        await msg.puppeteer.page.keyboard.press(config.key);

        // Sucessfully pressed the provided key
        node.status({
          fill: "green",
          shape: "dot",
          text: `Pressed Key ${config.key}`,
        });
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
      $("#node-input-key").val(this.key);
    }
  }
  RED.nodes.registerType(
    "puppeteer-page-keyboard-press",
    PuppeteerPageKeyboardPress
  );
};
