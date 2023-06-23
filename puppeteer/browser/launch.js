const puppeteer = require("puppeteer");

module.exports = function (RED) {
  function PuppeteerBrowserLaunch(nodeConfig) {
    RED.nodes.createNode(this, nodeConfig);
    nodeConfig.defaultViewport = null; // Setting the node's default viewport
    nodeConfig.ignoreHTTPSErrors = true; // Setting the node's ignoreHttpsErrors property
    var node = this; // Referencing the current node

    this.on("input", async function (msg, send, done) {
      try {
        node.status({ fill: "blue", shape: "dot", text: "Launching..." });
        // If debugport is specified
        if (nodeConfig.debugport != 0) {
          try {
            // Trying to connect to already existing
            // browser with node's config
            msg.puppeteer = {
              browser: await puppeteer.connect({
                ...nodeConfig,
                browserURL: `http://127.0.0.1:${nodeConfig.debugport}`,
              }),
            };

            node.status({
              fill: "green",
              shape: "dot",
              text: "Attached to existing browser",
            });
          } catch (e) { // If there is no existing browser
            node.status({
              fill: "gray",
              shape: "dot",
              text: "No existing browser detected, launching new one...",
            });

            // Launch a new browser with node's config
            msg.puppeteer = {
              browser: await puppeteer.launch({
                ...nodeConfig,
                args: [`--remote-debugging-port=${nodeConfig.debugport}`],
              }),
            };
            // Browser launched sucessfully
            node.status({ fill: "green", shape: "dot", text: "Launched" });
          }
        }
        // If there is no existing browser
        // or rather the puppeteer message property is undefined
        if (msg.puppeteer == undefined) {
          // Launch a new browser with node's config
          msg.puppeteer = {
            browser: await puppeteer.launch({
              ...nodeConfig,
              args: [`--remote-debugging-port=${nodeConfig.debugport}`],
            }),
          };
          // Browser launched sucessfully
          node.status({ fill: "green", shape: "dot", text: "Launched" });
        }
        // Get the page and set it to the puppeteer property of msg
        msg.puppeteer.page = (await msg.puppeteer.browser.pages())[0];
        msg.puppeteer.page.setDefaultTimeout(nodeConfig.timeout);

        // Get the cookies from input
        let cookies =
          nodeConfig.cookies !== ""
            ? nodeConfig.cookies
            : JSON.stringify(msg.payload);
        // Parse the cookies
        try {
          cookies = JSON.parse(cookies);
        } catch (e) {
          cookies = [];
        }

        // If cookies are passed through on lauch, set them for the page object
        try {
          // Setting the cookies
          for (const cookie of cookies) {
            await msg.puppeteer.page.setCookie(cookie);
          }
        } catch (e) {
          node.status({ fill: "yellow", shape: "dot", text: e });
        }
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
      $("#node-input-timeout").val(nodeConfig.timeout);
      $("#node-input-slowMo").val(nodeConfig.slowMo);
      $("#node-input-headless").val(nodeConfig.headless);
      $("#node-input-debugport").val(nodeConfig.debugport);
      $("#node-input-devtools").val(nodeConfig.devtools);
      $("#node-input-name").val(nodeConfig.name);
    }
  }
  RED.nodes.registerType("puppeteer-browser-launch", PuppeteerBrowserLaunch);
};
