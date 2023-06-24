module.exports = function (RED) {
  function PuppeteerDocumentQuerySelector(nodeConfig) {
    RED.nodes.createNode(this, nodeConfig);
    var node = this; // Referencing the current node
    this.selector = nodeConfig.selector;
    this.property = nodeConfig.property;

    this.on("input", function (msg, send, done) {
      // Parsing the selector
      node.selector =
        nodeConfig.selectortype == "msg" ? msg[node.selector] : node.selector;
      node.selector =
        nodeConfig.selectortype == "flow"
          ? flowContext.get(node.selector)
          : node.selector;
      node.selector =
        nodeConfig.selectortype == "global"
          ? globalContext.get(node.selector)
          : node.selector;
      const selector = "a";
      const property = "innerText";

      node.status({ fill: "blue", shape: "dot", text: `Querying` });

      // Querying the provided selector and property
      msg.puppeteer.page
        .evaluate(
          ({ selector, property }) => {
            return document.querySelector(selector)[property];
          },
          {
            selector: this.selector,
            property: this.property,
          }
        )
        .then((payload) => {
          node.status({ fill: "green", shape: "dot", text: `Queried` });
          msg.payload = payload;
          // Sending the msg
          send(msg);
        })
        .catch((e) => {
          // If an error occured
          node.error(e);
          // Update the status
          node.status({ fill: "red", shape: "dot", text: e });
          // And update the message error property
          msg.error = e;
          send(msg);
        })
        .finally(() => {
          // Clear status of the node
          setTimeout(() => {
            done();
            node.status({});
          }, (msg.error) ? 10000 : 3000);
        });
    });
    this.on("close", function () {
      node.status({});
    });
    oneditprepare: function oneditprepare() {
      $("#node-input-name").val(this.name);
      $("#node-input-selector").val(this.selector);
      $("#node-input-property").val(this.property);
    }
  }
  RED.nodes.registerType(
    "puppeteer-page-document-querySelector",
    PuppeteerDocumentQuerySelector
  );
};
