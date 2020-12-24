<p><h1 align="center">Kaeon United</h1></p>
<h2 align="center">It just works.</h2>

<p align="center">
    <img src="https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-United/master/Kaeon%20United/Logo/Logo.png" width="300px" height="300px"/>
</p>

<h2 align="center">What is Kaeon United?</h2>

<p>Kaeon United (pronounced &quot;KAI-on&quot;) is an API that provides developers access to <a href="https://github.com/Gallery-of-Kaeon/Kaeon-FUSION">Kaeon FUSION</a>,
<a href="https://github.com/Gallery-of-Kaeon/Kaeon-ACE">Kaeon ACE</a>,
the <a href="https://github.com/Gallery-of-Kaeon/Kaeon-United/tree/master/Kaeon%20United/Specification/1%20-%20United%20Suite">United Suite</a>,
and various other miscellaneous utilities through a single JavaScript interface.</p>
<h2 align="center">API</h2>

<p>Kaeon United is implemented as a single file,
but it is written in such a way that its functionality differs according to how it is referenced.</p>
<p>It can be used as a CDN,
as an HTML script,
as a CLI,
or as a CommonJS module.</p>
<h3 align="center">As a CDN</h3>

<p>See <a href="https://github.com/Gallery-of-Kaeon/Gallery-of-Kaeon.github.io">Kaeon United GhostHost</a>.</p>
<h3 align="center">As an HTML Script</h3>

<p>To use Kaeon United as a script,
reference it via <a href="https://www.jsdelivr.com/">jsDelivr</a> or another similar service.</p>
<p>To reference it via jsDeliver,
use the following URL:</p>
<pre><code>https:<span class="hljs-regexp">//</span>cdn.jsdelivr.net<span class="hljs-regexp">/gh/</span>Gallery-of-Kaeon<span class="hljs-regexp">/Kaeon-United/</span>Kaeon%<span class="hljs-number">20</span>United<span class="hljs-regexp">/Source/</span>KaeonUnited.js
</code></pre><p>As a script,
Kaeon United shall allow the use of the CommonJS require function to import CommonJS style modules stored online via their URLs.</p>
<p>However,
unlike other libraries which also provide this functionality,
Kaeon United shall allow the dynamic use of the require function such that modules may be referenced via URLs generated or retrieved at runtime,
and shall also allow cross origin access to said modules.</p>
<h3 align="center">As a CLI</h3>

<p>Kaeon United is available on npm under the alias &quot;kaeon-united&quot;,
and as such,
it may be used as a command line utility via npx.</p>
<!-- STUB -->
<h3 align="center">As a Module</h3>

<p>If using JavaScript through Kaeon United&#39;s CDN,
Script,
or CLI modes,
then Kaeon United may be imported as a CommonJS style module through the KaeonUnited require function via the alias &quot;Kaeon United&quot;.</p>
<p>The imported module may act as a Kaeon FUSION interface,
and shall contain a series of functions which when called return references to various miscellaneous JavaScript utilities.</p>
<!-- STUB -->
<h2 align="center">Source</h2>

<p>To view the source code for Kaeon United,
click <a href="https://github.com/Gallery-of-Kaeon/Kaeon-United/blob/master/Kaeon%20United/Source/KaeonUnited.js">here</a>.</p>
<h2 align="center">Specification</h2>

<p>To view the specification for Kaeon United,
click <a href="https://github.com/Gallery-of-Kaeon/Kaeon-United/tree/master/Kaeon%20United/Specification">here</a>.</p>
<h2 align="center">Contact Info</h2>

<p>For any questions or comments, please email the following address: kaeon.ace@gmail.com</p>
<h2>Disclaimer</h2>

<p>Please note,
the ability for Kaeon United to reference certain utilities is dependent on a public CORS proxy,
currently <a href="https://cors-anywhere.herokuapp.com/">Cors Anywhere</a>,
which occasionally goes down.</p>