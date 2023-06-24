module.exports = function (RED) {
  function PuppeteerPageClick(nodeConfig) {
    RED.nodes.createNode(this, nodeConfig);
    // Parse the click count to integer
    nodeConfig.clickCount = parseInt(nodeConfig.clickCount);
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

        // Parsing the downloadPath from string input or from msg object
        let downloadPath =
          nodeConfig.downloadPathtype == "msg"
            ? eval(nodeConfig.downloadPathtype + "." + nodeConfig.downloadPath)
            : nodeConfig.downloadPath;
        // If the type of downloadPath is set to flow or global, it needs to be parsed differently
        if (
          nodeConfig.downloadPathtype == "flow" ||
          nodeConfig.downloadPathtype == "global"
        ) {
          // Parsing the downloadPath
          downloadPath = this.context()[nodeConfig.downloadPathtype].get(
            nodeConfig.downloadPath
          );
        }

        // If download path is defined
        if (downloadPath && downloadPath != "") {
          // Enable requests interception
          await msg.puppeteer.page.setRequestInterception(true);

          // When request comes
          msg.puppeteer.page.on("request", (interceptedRequest) => {
            // And for everything that ends with zip (for now only supported file type)
            if (interceptedRequest.url().endsWith(".zip")) {
              interceptedRequest.continue({ url: "chrome://downloads/" }); // Continue to downloads url where download path is defined
            } else {
              interceptedRequest.continue(); // Continue the requets as usual
            }
          });
        }
        // Waiting for the specified selector
        node.status({
          fill: "blue",
          shape: "ring",
          text: `Wait for ${selector}`,
        });
        await msg.puppeteer.page.waitForSelector(selector);

        // Clicking on the specified selector
        node.status({ fill: "blue", shape: "dot", text: `Click ${selector}` });
        await msg.puppeteer.page.click(selector, nodeConfig);

        // If download path was specified
        if (downloadPath && downloadPath != "") {
          // Set the download path and download the file to it
          await msg.puppeteer.page._client.send("Page.setDownloadBehavior", {
            behavior: "allow",
            downloadPath: downloadPath,
          });
        }

        // Selector clicked sucessfully
        node.status({
          fill: "green",
          shape: "dot",
          text: `Clicked ${selector}`,
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
      $("#node-input-clickCount").val(nodeConfig.clickCount);
      $("#node-input-delay").val(nodeConfig.delay);
      $("#node-input-button").val(nodeConfig.button);
      $("#node-input-name").val(nodeConfig.name);
    }
  }
  RED.nodes.registerType("puppeteer-page-click", PuppeteerPageClick);
};
