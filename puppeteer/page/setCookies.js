module.exports = function (RED) {
  function PuppeteerPageSetCookies(config) {
    RED.nodes.createNode(this, config);
    var node = this; // Referencing the current node

    this.on("input", async function (msg, send, done) {
      try {
        // Parsing the provided cookies
        let cookies = JSON.parse(
          config.cookies !== "" ? config.cookies : JSON.stringify(msg.payload)
        );

        // Setting the cookies
        node.status({ fill: "blue", shape: "dot", text: "Setting cookies" });
        for (const cookie of cookies) {
          await msg.puppeteer.page.setCookie(cookie);
        }

        // Successfully loaded the cookies
        node.status({ fill: "green", shape: "dot", text: "Loaded cookies" });
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
  }
  RED.nodes.registerType("puppeteer-page-setCookies", PuppeteerPageSetCookies);
};
