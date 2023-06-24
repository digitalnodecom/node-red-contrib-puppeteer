module.exports = function (RED) {
  function PuppeteerPageWaitFor(config) {
    RED.nodes.createNode(this, config);
    var node = this; // Referencing the current node

    this.on("input", async function (msg, send, done) {
      try {
        // Parsing the selector from string input or from msg object
        let selector =
          config.selectortype != "str"
            ? eval(config.selectortype + "." + config.selector)
            : config.selector;
        // If the type of selector is set to flow or global, it needs to be parsed differently
        if (config.selectortype == "flow" || config.selectortype == "global") {
          // Parsing the selector
          selector = this.context()[config.selectortype].get(
            config.selectortype
          );
        }

        // Waiting for provided selector
        node.status({
          fill: "blue",
          shape: "dot",
          text: `Wait for ${selector}`,
        });
        await msg.puppeteer.page.waitForSelector(selector);

        // Provided selector exists
        node.status({
          fill: "green",
          shape: "dot",
          text: `${selector} exists`,
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
  RED.nodes.registerType("puppeteer-page-waitFor", PuppeteerPageWaitFor);
};
