module.exports = function (RED) {
  function PuppeteerPageGetCookies(config) {
    RED.nodes.createNode(this, config);
    var node = this; // Referencing the current node

    this.on("input", async function (msg, send, done) {
      try {
        // Getting cookies
        node.status({
          fill: "blue",
          shape: "dot",
          text: `Fetching cookies`,
        });

        const cookies = await msg.puppeteer.page.cookies();

        node.status({
          fill: "green",
          shape: "dot",
          text: `Fetched cookies`,
        });

        // Updating msg and sending the msg
        msg.payload = cookies;
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
  RED.nodes.registerType("puppeteer-page-getCookies", PuppeteerPageGetCookies);
};
