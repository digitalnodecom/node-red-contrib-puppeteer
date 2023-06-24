module.exports = function (RED) {
  function PuppeteerPageKeyboardType(config) {
    RED.nodes.createNode(this, config);
    var node = this; // Referencing the current node

    this.on("input", async function (msg, send, done) {
      try {
        // Parsing the text
        let text = config.text;
        text = config.texttype == "msg" ? msg[config.text] : text;
        text = config.texttype == "flow" ? flowContext.get(config.text) : text;
        text =
          config.texttype == "global" ? globalContext.get(config.text) : text;

        // Typing the provided text
        node.status({ fill: "blue", shape: "dot", text: `Typing ${text}` });
        await msg.puppeteer.page.keyboard.type(text);

        // Successfully typed the provded text
        node.status({ fill: "green", shape: "dot", text: `Typed ${text}` });
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
  RED.nodes.registerType(
    "puppeteer-page-keyboard-type",
    PuppeteerPageKeyboardType
  );
};
