# @digitalnodecom/node-red-contrib-puppeteer

<img src="https://digitalnode.com/wp-content/themes/digitalnode/public/assets/images/logo.1f5845.svg" alt="drawing" width="150"/>
</br>
</br>
<img src="https://user-images.githubusercontent.com/10379601/29446482-04f7036a-841f-11e7-9872-91d1fc2ea683.png" alt="drawing" height="100"/>

### These node-red nodes expose puppeteer's API used for controlling Chrome/Chromium over the <a href='https://chromedevtools.github.io/devtools-protocol/'>DevTools Protocol</a>


Group | Node Name | Detailed information
------------- | ------------- | -------------
<b>Browser</b> | Launch | <p>Launch Chrome browser</p><h3>Inputs</h3><dl class="message-properties"><dt><code>Timeout:&nbsp;<span style="color:#42b09a">number</span></code></dt><dd><i>Maximum time in milliseconds to wait for the browser instance to start. Defaults to&nbsp;<code>30000</code>&nbsp;(30 seconds). Pass&nbsp;<code>0</code>&nbsp;to disable timeout.</i></dd><dt><code>Slow Motion:&nbsp;<span style="color:#42b09a">number</span></code></dt><dd><i>Slows down Puppeteer operations by the specified amount of milliseconds. Useful so that you can see what is going on.</i></dd><dt><code>Hide Chrome:&nbsp;<span style="color:#42b09a">boolean</span></code></dt><dd><i>Whether to run browser in&nbsp;<a href="https://developers.google.com/web/updates/2017/04/headless-chrome" rel="nofollow">headless mode</a>. Defaults to&nbsp;<code>false</code>, it will show Chrome when&nbsp;<code>devtools</code>&nbsp;option is&nbsp;<code>true</code>.</i></dd><dt><code>Debug Port:&nbsp;<span style="color:#42b09a">number</span></code></dt><dd><i>Specify custom debugging port. It will connect to existing Chrome if port specified. Pass&nbsp;<code>0</code>&nbsp;to discover a random port. Defaults to&nbsp;<code>0</code>.</i></dd><dt><code>Show Devtools:&nbsp;<span style="color:#42b09a">boolean</span></code></dt><dd><i>Whether to auto-open a DevTools panel for each tab. If this option is&nbsp;<code>true</code>&nbsp;, the&nbsp;<code>Hide Chrome</code>&nbsp;option will be set&nbsp;<code>false</code>.</i></dd></dl><h3>Outputs</h3><dl class="message-properties"><dt><code>msg.puppeteer.browser:&nbsp;<span style="color:#42b09a">object</span></code></dt><dd><i>The puppeteer browser object</i></dd><dt><code>msg.puppeteer.page:&nbsp;<span style="color:#42b09a">object</span></code></dt><dd><i>The puppeteer page object</i></dd></dl><h3>Details</h3><p>Must launch Chrome browser before run any puppeteer actions</p>
<b>Browser</b> | New Page | This node creates/opens new page(tab) in existing chromium instance or rather <code>puppeteer.browser</code> object
<b>Browser</b> | Close Browser | This node closes chromium browser instance provided with <code>puppeteer.browser</code> object
<b>Page</b> | Click | <p>Click on Chrome</p><h3>Inputs</h3><dl class="message-properties"><dt><code>Selector:&nbsp;<span style="color:#42b09a">string</span></code></dt><dd><i>A&nbsp;<a href="#interface-selector" title="Selector">selector</a>to search for element to click. If there are multiple elements satisfying the selector, the first will be clicked.</i></dd><dt><code>Button:&nbsp;<span style="color:#42b09a">string</span></code></dt><dd><i>Slows down Puppeteer operations by the specified amount of milliseconds. Useful so that you can see what is going on.&lt;"left"\|"right"\|"middle"&gt; Defaults to&nbsp;<code>left</code>.</i></dd><dt><code>Click Count:&nbsp;<span style="color:#42b09a">number</span></code></dt><dd><i>Whether to run browser in &nbsp;<a href="https://developers.google.com/web/updates/2017/04/headless-chrome" rel="nofollow">headless mode</a>. Defaults to&nbsp;<code>false</code>, it will show Chrome when&nbsp;<code>devtools</code>&nbsp;option is&nbsp;<code>true</code>. Defaults to 1. See&nbsp;<a href="https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail" title="UIEvent.detail" rel="nofollow">UIEvent.detail</a>.</i></dd><dt><code>Delay:&nbsp;<span style="color:#42b09a">number</span></code></dt><dd><i>Specify custom debugging port. Pass&nbsp;<code>0</code>&nbsp; to discover a random port. Defaults to&nbsp;<code>0</code>. Time to wait between&nbsp;<code>mousedown</code>&nbsp;and&nbsp;<code>mouseup</code>&nbsp;in milliseconds. Defaults to 0.</i></dd></dl><h3>Details</h3><p>This node fetches an element with&nbsp;<code>selector</code>, scrolls it into view if needed, and then uses&nbsp;<code>page.mouse</code>&nbsp;to click in the center of the element. If there's no element matching&nbsp;<code>selector</code>, the node throws an error.</p>
<b>Page</b> | Close | <p>Close first chromium page(tab)</p><h3>Details</h3><p>This node closes first chromium page(tab) provided with&nbsp;<code>puppeteer.browser</code>&nbsp;object</p>
<b>Page</b> | Content | <p>Get content from page</p><h3>Details</h3><p>This node gets page's content from&nbsp;<code>puppeteer.page</code>&nbsp;object</p>
<b>Page</b> | Delete Cookies | This node deletes all the cookies from the passed&nbsp;<code>puppeteer.page</code>&nbsp;object
<b>Page</b> | Download | <p>Dowload a file</p><h3>Inputs</h3><dl class="message-properties"><dt><code>Selector:&nbsp;<span style="color:#42b09a">string</span></code></dt><dd><i>A&nbsp;<a href="#interface-selector" title="Selector">selector</a>&nbsp;to search for element to click. If there are multiple elements satisfying the selector, the first will be clicked.</i></dd><dt><code>Button:&nbsp;<span style="color:#42b09a">string</span></code></dt><dd><i>Slows down Puppeteer operations by the specified amount of milliseconds. Useful so that you can see what is going on.&lt;"left"\|"right"\|"middle"&gt; Defaults to&nbsp;<code>left</code>.</i></dd><dt><code>Click Count:&nbsp;<span style="color:#42b09a">number</span></code></dt><dt><code>Delay:&nbsp;<span style="color:#42b09a">number</span></code></dt><dt><code>Download path:&nbsp;<span style="color:#42b09a">string</span></code></dt><dd><i>Specify custom download path. Leave the field blank for default download path. Defaults to user's default browser download path.</i></dd><dt><code>File name:&nbsp;<span style="color:#42b09a">string</span></code></dt><dd><i>Specify custom file name. Leave the field blank for default file name. Please note that in order for this to work this node needs to be followed by the rename node<b><u><i>(in storage section)</i></u></b>. Defaults to default file name.</i></dd></dl><h3>Details</h3><p>This method fetches an element with&nbsp;<code>selector</code>, scrolls it into view if needed, and then uses&nbsp;<code>page.mouse</code>&nbsp;to click in the center of the element. If there's no element matching&nbsp;<code>selector</code>, the method throws an error. The main difference between this and click node is that with this node you can specify download path and file name. But, in order the custom filename to work, this node must have download path and file name specified and be followed by a rename node<b><u><i>(in storage section)</i></u></b>where the old file path should be set to&nbsp;<code>msg.old</code>&nbsp;and the new file path should be set to&nbsp;<code>msg.new</code></p>
<b>Page</b> | Focus | <p>Focus on element</p><h3>Details</h3><p>This node fetches an element with&nbsp;<code>selector</code>&nbsp;and puts it in focus. If there's no element matching&nbsp;<code>selector</code>, the node throws an error.</p>
<b>Page</b> | Get | <p>Get property value from element</p><h3>Details</h3><p>This node fetches a specified&nbsp;<code>property</code>&nbsp;value from element with specified&nbsp;<code>selector</code>&nbsp;. If there's no element matching the&nbsp;<code>selector</code>, the node throws an error.</p>
<b>Page</b> | Get Cookies | <div><span>This node retrieves all cookies using the passed page object as input (<code>msg.puppeteer.page</code>). This node otputs list of cookies in&nbsp;<code>msg.payload</code>&nbsp;property. Each object contains the following properties:<ul><li><code>name:&nbsp;<span style="color:#42b09a">string</span></code></li><li><code>value:&nbsp;<span style="color:#42b09a">string</span></code></li><li><code>domain:&nbsp;<span style="color:#42b09a">string</span></code></li><li><code>path:&nbsp;<span style="color:#42b09a">string</span></code></li><li><code>expires:&nbsp;<span style="color:#42b09a">number</span></code></li><li><code>size:&nbsp;<span style="color:#42b09a">number</span></code></li><li><code>httpOnly:&nbsp;<span style="color:#42b09a">boolean</span></code></li><li><code>secure:&nbsp;<span style="color:#42b09a">boolean</span></code></li><li><code>session:&nbsp;<span style="color:#42b09a">boolean</span></code></li><li><code>sameSite:&nbsp;<span style="color:#42b09a">string</span></code></li><li><code>sameParty:&nbsp;<span style="color:#42b09a">boolean</span></code></li><li><code>sourceScheme:&nbsp;<span style="color:#42b09a">string</span></code></li><li><code>sourcePort:&nbsp;<span style="color:#42b09a">number</span></code></li></span></div>
<b>Page</b> | Go to | <p>Chrome page navigation</p><h3>Inputs</h3><dl class="message-properties"><dt><code>URL:&nbsp;<span style="color:#42b09a">string</span></code></dt><dd><i>URL to navigate page to. The URL should include scheme, e.g.&nbsp;<code>https://</code></i></dd><dt><code>Wait Until:&nbsp;<span style="color:#42b09a">string</span></code></dt><dd><i>When to consider navigation succeeded. Given an array of event strings, navigation is considered to be successful after all events have been fired. Events can be either:</dd><dd>-&nbsp;<code>load</code>&nbsp;: consider navigation to be finished when the load event is fired.</dd><dd>-&nbsp;<code>domcontentloaded</code>&nbsp;: consider navigation to be finished when the DOMContentLoaded event is fired.</dd><dd>-&nbsp;<code>networkidle0</code>&nbsp;: consider navigation to be finished when there are no more than 0 network connections for at least 500 ms.</dd><dd>-&nbsp;<code>networkidle2</code>&nbsp;: consider navigation to be finished when there are no more than 2 network connections for at least 500 ms.</dd></i></dl>
<b>Page</b> | Screenshot | <p>Capture Screen</p><h3>Inputs</h3><dl class="message-properties"><dt><code>Capture Full Page:&nbsp;<span style="color:#42b09a">boolean</span></code></dt><dd><i>When&nbsp;<code>true</code>, takes a screenshot of the full scrollable page. Defaults to&nbsp;<code>false</code>.</i></dd></dl><h3>Outputs</h3><dl class="message-properties"><dt><code>msg.payload:&nbsp;<span style="color:#42b09a">Buffer</span></code></dt><dd>buffer with captured screenshot.</dd></dl><h3>Details</h3><p>Browser screenshot, require focus / active to browser</p>
<b>Page</b> | Set | <p>Set value to input field</p><h3>Details</h3><p>This node fetches an element with&nbsp;<code>selector</code>&nbsp;and if the element is input field it changes its value to the value specified in the&nbsp;<code>Value</code>&nbsp;field. If there's no element matching&nbsp;<code>selector</code>, the node throws an error.</p>
<b>Page</b> | Set Cookies | <div><span>This node sets the cookies on the current page object. The input page object should be passed as&nbsp;<code>msg.puppeteer.page</code>. The cookies should be a list of cookie objects where each one has the following properties and they should be passed in as&nbsp;<code>msg.payload</code>, or if directly into the input field it should be a valid JSON list:<ul><li><code>name:&nbsp;<span style="color:#42b09a">string</span>\|<u style="color:#4783b7">required</u></code></li><li><code>value:&nbsp;<span style="color:#42b09a">string</span>\|<u style="color:#4783b7">required</u></code></li><li><code>domain:&nbsp;<span style="color:#42b09a">string</span>\|<u style="color:#fdcf0d">optional</u>,<br><span style="color:#000"><i class="fa fa-long-arrow-right" aria-hidden="true"></i>Default value: '{domain from page object}'</span></code></li><li><code>path:&nbsp;<span style="color:#42b09a">string</span>\|<u style="color:#fdcf0d">optional</u>,<br><span style="color:#000"><i class="fa fa-long-arrow-right" aria-hidden="true"></i>Default value: '/'</span></code></li><li><code>expires:&nbsp;<span style="color:#42b09a">number</span>\|<u style="color:#fdcf0d">optional</u>,<br><span style="color:#000"><i class="fa fa-long-arrow-right" aria-hidden="true"></i>Default value: -1</span></code></li><li><code>size:&nbsp;<span style="color:#42b09a">number</span>\|<u style="color:#fdcf0d">optional</u>,<br><span style="color:#000"><i class="fa fa-long-arrow-right" aria-hidden="true"></i>Default value: {cookie size}</span></code></li><li><code>httpOnly:&nbsp;<span style="color:#42b09a">boolean</span>\|<u style="color:#fdcf0d">optional</u>,<br><span style="color:#000"><i class="fa fa-long-arrow-right" aria-hidden="true"></i>Default value: false</span></code></li><li><code>secure:&nbsp;<span style="color:#42b09a">boolean</span>\|<u style="color:#fdcf0d">optional</u>,<br><span style="color:#000"><i class="fa fa-long-arrow-right" aria-hidden="true"></i>Default value: true</span></code></li><li><code>session:&nbsp;<span style="color:#42b09a">boolean</span>\|<u style="color:#fdcf0d">optional</u>,<br><span style="color:#000"><i class="fa fa-long-arrow-right" aria-hidden="true"></i>Default value: true</span></code></li><li><code>sameSite:&nbsp;<span style="color:#42b09a">string</span>\|<u style="color:#fdcf0d">optional</u>,<br><span style="color:#000"><i class="fa fa-long-arrow-right" aria-hidden="true"></i>Default value: undefined</span></code></li><li><code>sameParty:&nbsp;<span style="color:#42b09a">boolean</span>\|<u style="color:#fdcf0d">optional</u>,<br><span style="color:#000"><i class="fa fa-long-arrow-right" aria-hidden="true"></i>Default value: false</span></code></li><li><code>sourceScheme:&nbsp;<span style="color:#42b09a">string</span>\|<u style="color:#fdcf0d">optional</u>,<br><span style="color:#000"><i class="fa fa-long-arrow-right" aria-hidden="true"></i>Default value: 'Secure'</span></code></li><li><code>sourcePort:&nbsp;<span style="color:#42b09a">number</span>\|<u style="color:#fdcf0d">optional</u>,<br><span style="color:#000"><i class="fa fa-long-arrow-right" aria-hidden="true"></i>Default value: 443</span></code></li></span></div>
<b>Page</b> | Upload | <p>Upload file to specified selector</p><h3>Details</h3><p>This node uploads a file(or more accurately specified filePath) specified with&nbsp;<code>Upload File</code>&nbsp;to the element speicified with the&nbsp;<code>selector</code>&nbsp;if it exists.</p>
<b>Page</b> | Wait for | <p>Wait for selector</p><h3>Details</h3><p>This node awaits for element specified with&nbsp;<code>selector</code>. If the wait timeouts/element doesn't exist, this node throws an error</p>
<b>Keyboard | Press | <p>Keyboard Press</p><h3>Details</h3><p>This node presses the keyboard key specified in&nbsp;<code>Key</code>&nbsp;input field.</p>
<b>Keyboard | Type | <p>Keyboard Type</p><h3>Details</h3><p>This node types the text specified in the&nbsp;<code>Text</code>&nbsp;input using the&nbsp;<code>puppeteer.page.keyboard.type</code>&nbsp;function.</p>
<b>Storage</b> | Rename | <p>Rename file</p><h3>Inputs</h3><dl class="message-properties"><dt><code>Old file path:&nbsp;<span style="color:#42b09a">string</span></code></dt><dt><code>New file path:&nbsp;<span style="color:#42b09a">string</span></code></dt></dl><h3>Details</h3><p>This node renames the file from old file path to the new file path, or essetially it moves it from one location to another if that is how the paths are specified.</p>

#### Install these nodes using the following command or directly via node-red dashboard
```bash
npm install @digitalnodecom/node-red-contrib-puppeteer
```

## Credits
### Original fork
The original package started development in [this](https://github.com/oliverlorenz/node-red-contrib-puppeteer) repository. Thank you [oliverlorenz](https://github.com/oliverlorenz) for the initiative!

### Forked from
Thanks to [d0uub](https://github.com/d0uub/) for picking up the development of the original repository and continuing it in the following [repo](https://github.com/d0uub/node-red-contrib-puppeteer-new). We forked from this repo and created this package by adding nodes and improving node's documentation!

### Palettes
By [coolors.co](https://coolors.co/palette/ef476f-ffd166-06d6a0-118ab2-073b4c)

### Icons
By [fontawesome](https://fontawesome.com/license) and [svgrepo](https://www.svgrepo.com/)