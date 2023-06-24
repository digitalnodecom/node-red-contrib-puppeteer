module.exports = function (RED) {
  function PuppeteerPageDeleteCookies(nodeConfig) {
    RED.nodes.createNode(this, nodeConfig);
    var node = this; // Referencing the current node

    // Retrieve the config node
    this.on("input", async function (msg, send, done) {
      try {
        // Get all cookies
        const cookies = await msg.puppeteer.page.cookies();
        // Delete all cookies
        for (const cookie of cookies) {
          await msg.puppeteer.page.deleteCookie(deleteCookieObject(cookie));
        }
        // Send the updated msg
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
  RED.nodes.registerType(
    "puppeteer-page-deleteCookies",
    PuppeteerPageDeleteCookies
  );
};

// Function to consctruct delete cookie object for puppeteer
function deleteCookieObject(cookie) {
  return {
    url: `${cookie.sourcePort === 443 ? "https://" : "http://"}${
      cookie.domain
    }${cookie.path}`,
    name: cookie.name,
  };
}
