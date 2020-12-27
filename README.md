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
<h3>As a CDN</h3>

<p>See <a href="https://github.com/Gallery-of-Kaeon/Gallery-of-Kaeon.github.io">Kaeon United GhostHost</a>.</p>
<h3>As an HTML Script</h3>

<p>To use Kaeon United as a script,
reference it via <a href="https://www.jsdelivr.com/">jsDelivr</a> or another similar service.</p>
<p>To reference it via jsDelivr,
use the following URL:</p>
<pre><code>https:<span class="hljs-regexp">//</span>cdn.jsdelivr.net<span class="hljs-regexp">/gh/</span>Gallery-of-Kaeon<span class="hljs-regexp">/Kaeon-United/</span>Kaeon%<span class="hljs-number">20</span>United<span class="hljs-regexp">/Source/</span>KaeonUnited.js
</code></pre><p>As a script,
Kaeon United shall allow the use of the CommonJS require function to import CommonJS style modules stored online via their URLs.</p>
<p>However,
unlike other libraries which also provide this functionality,
Kaeon United shall allow the dynamic use of the require function such that modules may be referenced via URLs generated or retrieved at runtime,
and shall also allow cross origin access to said modules.</p>
<h3>As a CLI</h3>

<p>Kaeon United is available on npm under the alias &quot;kaeon-united&quot;,
and as such,
it may be used as a command line utility via npx.</p>

<h4>CLI Basics</h4>

<p>A Kaeon United CLI command follows this general format:</p>
<pre><code>npx kaeon-united [(<span class="hljs-number">1</span>) operation] [(<span class="hljs-number">2</span><em>) <span class="hljs-string">&quot;open&quot;</span> / <span class="hljs-string">&quot;read&quot;</span>] [(<span class="hljs-number">3</span></em>) file / data] [(<span class="hljs-number">4</span>*) export path]
</code></pre><p><em>An asterisk indicates that the argument may or may not be necessary depending on the operation</em></p>
<p>All Kaeon United CLI commands operate on data which must either be imported from a file or specified literally.</p>
<p>The first argument specifies which operation to perform.</p>
<p>The second argument specifies whether the provided data will be imported from a file,
in which case the argument shall be &quot;open&quot;,
or specified literally,
in which case the argument shall be &quot;read&quot;.</p>
<p>The third argument shall either specify the path to the file from which to import the data if the second argument was &quot;open&quot;,
or shall specify the literal data if the second argument was &quot;read&quot;.</p>

<p>If a file path is specified,
it may be in the form of a URL to a raw text file stored online.</p>
<p>The fourth argument shall specify a file path to export any output of the operation to.</p>
<p>Kaeon United operations are separated into the two categories,
processor operations and translator operations.</p>
<p>Processor operations,
each of which are associated with a specific programming language,
may or may not have the second and third arguments,
and shall not have the fourth argument.</p>
<p>If said arguments are provided,
then they shall take the specified data and execute it as code in their respective language.
If said arguments are not provided,
then they shall open a REPL for their respective language.</p>
<p>Translator operations,
each of which are associated with two specific programming languages,
an input language and an output language,
must have the second and third arguments,
and may or may not have the fourth argument.</p>
<p>They shall take the data specified by the second and third arguments as code in their respective input language and convert it to code in their repsective output language.</p>
<p>If the fourth arugment is present,
they shall write the output to the file path specified by said argument,
and if not,
they shall write the output to the console.</p>
<p>The operations that Kaeon United supports are &quot;js&quot;,
&quot;process&quot;,
&quot;parse&quot;,
&quot;preprocess&quot;,
&quot;ucc&quot;,
&quot;assemble&quot;,
and &quot;disassemble&quot;.</p>
<h4>The JS Operation</h4>

<p>The JS operation is a processor operation for <a href="https://github.com/Gallery-of-Kaeon/Kaeon-United/blob/master/Kaeon%20United/Specification/1%20-%20United%20Suite/1%20-%20United%20JavaScript/United%20JavaScript.op">United JavaScript</a>.</p>
<h4>The Process Operation</h4>

<p>The Process operation is a processor operation for Kaeon FUSION.</p>
<h4>The Parse Operation</h4>

<p>The Parse operation is a translator operation where <a href="https://github.com/Gallery-of-Kaeon/Kaeon-FUSION/tree/master/Kaeon%20FUSION/Documentation/1%20-%20Foundations/2%20-%20ONE%2B">ONE+</a> is the input language and <a href="https://github.com/Gallery-of-Kaeon/Kaeon-FUSION/blob/master/Kaeon%20FUSION/Documentation/1%20-%20Foundations/1%20-%20ONE/README.md">ONE</a> is the output language.</p>
<h4>The Preprocess Operation</h4>

<p>The Preprocess operation is a translator operation where the <a href="https://github.com/Gallery-of-Kaeon/Kaeon-FUSION/blob/master/Kaeon%20FUSION/Documentation/1%20-%20Foundations/3%20-%20Universal%20Preprocessor/README.md">Universal Preprocessor</a> is the input language and raw text is the output language.</p>
<h4>The UCC Operation</h4>

<p>The UCC operation is a translator operation where <a href="https://github.com/Gallery-of-Kaeon/Kaeon-United/blob/master/Kaeon%20United/Specification/1%20-%20United%20Suite/2%20-%20United%20C/United%20C.op">United C</a> is the input language and C is the output language.</p>

<p><em>The UCC operation should specify the input as a file path using &quot;read&quot;.</em></p>
<p><em>The UCC operation requires both gcc and make to be installed.</em></p>
<h4>The Assemble Operation</h4>

<p>The Assemble operation is a translator operation where <a href="https://github.com/Gallery-of-Kaeon/Kaeon-United/blob/master/Kaeon%20United/Specification/1%20-%20United%20Suite/2%20-%20United%20C/3%20-%20Character%20Separated%20Binary/Character%20Separated%20Binary.op">CSB</a> is the input language and binary is the output language.</p>
<h4>The Disassemble Operation</h4>

<p>The Disassemble operation is a translator operation where binary is the input language and CSB is the output language.</p>
<!-- STUB -->
<h3>As a Module</h3>

<p>If using JavaScript through Kaeon United&#39;s CDN,
Script,
or CLI modes,
then Kaeon United may be imported as a CommonJS style module through the KaeonUnited require function via the alias &quot;Kaeon United&quot;.</p>
<p>The imported module may act as a Kaeon FUSION interface,
and shall contain a series of functions which when called return references to various miscellaneous JavaScript utilities.</p>

<p>Said functions and the modules they return are listed as follows:</p>
<h4>httpUtils()</h4>

<p>A module for easily sending HTTP requests.</p>
<p>Click <a href="https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/HTTP%20Utils/httpUtils.js">here</a> for the source code.</p>
<h4>input()</h4>

<p>A module for automatically detecting keyboard and mouse interaction with DOM elements.</p>
<p>Click <a href="https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/UI/input.js">here</a> for the source code.</p>
<h4>io()</h4>

<p>A module for basic file system and terminal IO.</p>
<p>Click <a href="https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/IO/io.js">here</a> for the source code.</p>
<h4>kaeonACE()</h4>

<p>See <a href="https://github.com/Gallery-of-Kaeon/Kaeon-ACE">Kaeon ACE</a>.</p>
<p>Click <a href="https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-ACE/master/Kaeon%20ACE/API/Kaeon%20ACE/Babylon/KaeonACE.js">here</a> for the source code.</p>
<h4>kaeonACEModules()</h4>

<p>See <a href="https://github.com/Gallery-of-Kaeon/Kaeon-ACE">Kaeon ACE</a>.</p>
<p>Click <a href="https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-ACE/master/Kaeon%20ACE/API/Kaeon%20ACE/Babylon/KaeonACEModules.js">here</a> for the source code.</p>
<h4>ONESuite()</h4>

<p>See <a href="https://github.com/Gallery-of-Kaeon/Kaeon-FUSION">Kaeon FUSION</a>.</p>
<p>Click <a href="https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/United%20Bootstrap/ONESuite.js">here</a> for the source code.</p>
<h4>philosophersStone()</h4>

<p>See the <a href="https://github.com/Gallery-of-Kaeon/Philosophers-Stone">Philosopher&#39;s Stone</a>.</p>
<p>Click <a href="https://raw.githubusercontent.com/Gallery-of-Kaeon/Philosophers-Stone/master/Philosopher&#39;s%20Stone/API/JavaScript/PhilosophersStone.js">here</a> for the source code.</p>
<h4>plaform()</h4>

<p>A module for detecting whether the program is running on the browser or on node.</p>
<p>Click <a href="https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/Platform/platform.js">here</a> for the source code.</p>
<h4>search()</h4>

<p>A module for creating search bar widgets.</p>
<p>Click <a href="https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/UI/search.js">here</a> for the source code.</p>
<h4>server()</h4>

<p>A module for simple server utilities.</p>
<p>Click <a href="https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/Server/server.js">here</a> for the source code.</p>
<h4>speech()</h4>

<p>A module for front end speech to text and text to speech functionality.</p>
<p>Click <a href="https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/Speech/speech.js">here</a> for the source code.</p>
<h4>tokenizer()</h4>

<p>A module for tokenization.</p>
<p>Click <a href="https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/Tokenizer/tokenizer.js">here</a> for the source code.</p>
<h4>ui()</h4>

<p>For more details,
see the <a href="https://github.com/Gallery-of-Kaeon/Kaeon-United/blob/master/Kaeon%20United/Specification/1%20-%20United%20Suite/1%20-%20United%20JavaScript/3%20-%20Frameworks/1%20-%20Dynamic%20UI/Dynamic%20UI%20Framework.op">Dynamic UI Framework</a>.</p>
<p>Click <a href="https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/UI/UI.js">here</a> for the source code.</p>
<h4>virtualSystem()</h4>

<p>A module for emulating the structure of a file system.</p>
<p>Click <a href="https://raw.githubusercontent.com/Gallery-of-Kaeon/Philosophers-Stone/master/Philosopher&#39;s%20Stone/API/Virtual%20System/virtualSystem.js">here</a> for the source code.</p>
<h4>widgets()</h4>

<p>A module for creating various miscellaneous widgets.</p>
<p>Click <a href="https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/UI/widgets.js">here</a> for the source code.</p>
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
currently <a href="https://cors-anywhere.herokuapp.com/">CORS Anywhere</a>,
which occasionally goes down.</p>