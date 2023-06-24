module.exports = function (RED) {
  function PuppeteerPageGetValue(nodeConfig) {
    RED.nodes.createNode(this, nodeConfig);
    var node = this; // Referencing the current node

    this.on("input", async function (msg, send, done) {
      try {
        // Parsing the selector from string input or from msg object
        let selector =
          nodeConfig.selectortype != "str"
            ? eval(nodeConfig.selectortype + "." + nodeConfig.selector)
            : nodeConfig.selector;
        // If the type of selector is set to flow or global, it needs to be parsed differently
        if (
          nodeConfig.selectortype == "flow" ||
          nodeConfig.selectortype == "global"
        ) {
          // Parsing the selector
          selector = this.context()[nodeConfig.selectortype].get(
            nodeConfig.selectortype
          );
        }

        // Parsing the property from string input or from msg object
        let property =
          nodeConfig.propertytype != "str"
            ? eval(nodeConfig.propertytype + "." + nodeConfig.property)
            : nodeConfig.property;
        // If the type of property is set to flow or global, it needs to be parsed differently
        if (
          nodeConfig.propertytype == "flow" ||
          nodeConfig.propertytype == "global"
        ) {
          // Parsing the property
          property = this.context()[nodeConfig.propertytype].get(
            nodeConfig.propertytype
          );
        }

        // Waiting for the provided selector
        node.status({
          fill: "blue",
          shape: "ring",
          text: `Wait for ${selector}`,
        });
        await msg.puppeteer.page.waitForSelector(selector);

        // Getting the provided selector
        node.status({
          fill: "blue",
          shape: "dot",
          text: `Getting ${selector}`,
        });
        const value = await msg.puppeteer.page.$eval(
          selector,
          (el, property) => el[property],
          property
        );

        // Updating msg and sending the msg
        msg.payload = value;
        node.status({ fill: "green", shape: "dot", text: `${value}` });
        // Sending the msg
        send(msg);

      } catch (e) {
        // If an error occured
        node.error(e);
        // Update the status
        node.status({ fill: "red", shape: "dot", text: e });
        // And update the message error property
        msg.error = e;
        msg.payload = undefined;
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
  RED.nodes.registerType("puppeteer-page-get-value", PuppeteerPageGetValue);
};
