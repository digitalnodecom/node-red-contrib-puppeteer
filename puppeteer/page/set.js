module.exports = function (RED) {
  function PuppeteerPageSetValue(config) {
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

        // Parsing the value from string input or from msg object
        let value =
          config.valuetype != "str"
            ? eval(config.valuetype + "." + config.value)
            : config.value;
        // If the type of value is set to flow or global, it needs to be parsed differently
        if (config.valuetype == "flow" || config.valuetype == "global") {
          // Parsing the value
          value = this.context()[config.valuetype].get(config.valuetype);
        }

        // Waiting for selector
        node.status({
          fill: "blue",
          shape: "ring",
          text: `Wait for ${selector}`,
        });
        await msg.puppeteer.page.waitForSelector(selector);

        // Setting the value to the selector
        node.status({
          fill: "blue",
          shape: "dot",
          text: `Setting ${selector}:${value}`,
        });
        while (
          (await msg.puppeteer.page.$eval(selector, (el) => el.value)) != value
        ) {
          await msg.puppeteer.page.$eval(
            selector,
            (el, value) => (el.value = value),
            value
          );
        }
        node.status({
          fill: "green",
          shape: "dot",
          text: `${selector}:${value}`,
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
  RED.nodes.registerType("puppeteer-page-set-value", PuppeteerPageSetValue);
};
