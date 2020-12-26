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
<p>To reference it via jsDeliver,
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

A Kaeon United CLI command follows this general format:

    npx kaeon-united [(1) operation] [(2*) "open" / "read"] [(3*) file / data] [(4*) export path]

_An asterisk indicates that the argument may or may not be necessary depending on the operation_

All Kaeon United CLI commands operate on data which must either be imported from a file or specified literally.

The first argument specifies which operation to perform.

The second argument specifies whether the provided data will be imported from a file,
in which case the argument shall be "open",
or specified literally,
in which case the argument shall be "read".

The third argument shall either specify the path to the file from which to import the data if the second argument was "open",
or shall specify the literal data if the second argument was "read".

The fourth argument shall specify a file path to export any output of the operation to.

Kaeon United operations are separated into the two categories,
processor operations and translator operations.

Processor operations,
each of which are associated with a specific programming language,
may or may not have the second and third arguments,
and shall not have the fourth argument.

If said arguments are provided,
then they shall take the specified data and execute it as code in their respective language.
If said arguments are not provided,
then they shall open a REPL for their respective language.

Translator operations,
each of which are associated with two specific programming languages,
an input language and an output language,
must have the second and third arguments,
and may or may not have the fourth argument.

They shall take the data specified by the second and third arguments as code in their respective input language and convert it to code in their repsective output language.

If the fourth arugment is present,
they shall write the output to the file path specified by said argument,
and if not,
they shall write the output to the console.

The operations that Kaeon United supports are "js",
"process",
"parse",
"preprocess",
"ucc",
"assemble",
and "disassemble".

<h4>The JS Operation</h4>

The JS operation is a processor operation for [United JavaScript](https://github.com/Gallery-of-Kaeon/Kaeon-United/blob/master/Kaeon%20United/Specification/1%20-%20United%20Suite/1%20-%20United%20JavaScript/United%20JavaScript.op).

<h4>The Process Operation</h4>

The Process operation is a processor operatons for Kaeon FUSION.

<h4>The Parse Operation</h4>

The Parse operation is a translator operation where [ONE+](https://github.com/Gallery-of-Kaeon/Kaeon-FUSION/tree/master/Kaeon%20FUSION/Documentation/1%20-%20Foundations/2%20-%20ONE%2B) is the input language and [ONE](https://github.com/Gallery-of-Kaeon/Kaeon-FUSION/blob/master/Kaeon%20FUSION/Documentation/1%20-%20Foundations/1%20-%20ONE/README.md) is the output language.

<h4>The Preprocess Operation</h4>

The Preprocess operation is a translator operation where the [Universal Preprocessor](https://github.com/Gallery-of-Kaeon/Kaeon-FUSION/blob/master/Kaeon%20FUSION/Documentation/1%20-%20Foundations/3%20-%20Universal%20Preprocessor/README.md) is the input language and raw text is the output language.

<h4>The UCC Operation</h4>

The UCC operation is a translator operation where [United C](https://github.com/Gallery-of-Kaeon/Kaeon-United/blob/master/Kaeon%20United/Specification/1%20-%20United%20Suite/2%20-%20United%20C/United%20C.op) is the input language and C is the output language.

<h4>The Assemble Operation</h4>

The Assemble operation is a translator operation where [CSB](https://github.com/Gallery-of-Kaeon/Kaeon-United/blob/master/Kaeon%20United/Specification/1%20-%20United%20Suite/2%20-%20United%20C/3%20-%20Character%20Separated%20Binary/Character%20Separated%20Binary.op) is the input language and binary is the output language.

<h4>The Disassemble Operation</h4>

The Disassemble operation is a translator operation where binary is the input language and CSB is the output language.

<!-- STUB -->
<h3>As a Module</h3>

<p>If using JavaScript through Kaeon United&#39;s CDN,
Script,
or CLI modes,
then Kaeon United may be imported as a CommonJS style module through the KaeonUnited require function via the alias &quot;Kaeon United&quot;.</p>
<p>The imported module may act as a Kaeon FUSION interface,
and shall contain a series of functions which when called return references to various miscellaneous JavaScript utilities.</p>

Said functions and the modules they return are listed as follows:

<h4>httpUtils()</h4>

A module for easily sending HTTP requests.

Click [here](https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/HTTP%20Utils/httpUtils.js) for the source code.

<h4>input()</h4>

A module for automatically detecting keyboard and mouse interaction with DOM elements.

Click [here](https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/UI/input.js) for the source code.

<h4>io()</h4>

A module for basic file system and terminal IO.

Click [here](https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/IO/io.js) for the source code.

<h4>kaeonACE()</h4>

See [Kaeon ACE](https://github.com/Gallery-of-Kaeon/Kaeon-ACE).

Click [here](https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-ACE/master/Kaeon%20ACE/API/Kaeon%20ACE/Babylon/KaeonACE.js) for the source code.

<h4>kaeonACEModules()</h4>

See [Kaeon ACE](https://github.com/Gallery-of-Kaeon/Kaeon-ACE).

Click [here](https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-ACE/master/Kaeon%20ACE/API/Kaeon%20ACE/Babylon/KaeonACEModules.js) for the source code.

<h4>ONESuite()</h4>

See [Kaeon FUSION](https://github.com/Gallery-of-Kaeon/Kaeon-FUSION).

Click [here](https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/United%20Bootstrap/ONESuite.js) for the source code.

<h4>philosophersStone()</h4>

See the [Philosopher's Stone](https://github.com/Gallery-of-Kaeon/Philosophers-Stone).

Click [here](https://raw.githubusercontent.com/Gallery-of-Kaeon/Philosophers-Stone/master/Philosopher's%20Stone/API/JavaScript/PhilosophersStone.js) for the source code.

<h4>plaform()</h4>

A module for detecting whether the program is running on the browser or on node.

Click [here](https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/Platform/platform.js) for the source code.

<h4>search()</h4>

A module for creating search bar widgets.

Click [here](https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/UI/search.js) for the source code.

<h4>server()</h4>

A module for simple server utilities.

Click [here](https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/Server/server.js) for the source code.

<h4>speech()</h4>

A module for front end speech to text and text to speech functionality.

Click [here](https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/Speech/speech.js) for the source code.

<h4>tokenizer()</h4>

A module for tokenization.

Click [here](https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/Tokenizer/tokenizer.js) for the source code.

<h4>ui()</h4>

For more details,
see the [Dynamic UI Framework](https://github.com/Gallery-of-Kaeon/Kaeon-United/blob/master/Kaeon%20United/Specification/1%20-%20United%20Suite/1%20-%20United%20JavaScript/3%20-%20Frameworks/1%20-%20Dynamic%20UI/Dynamic%20UI%20Framework.op).

Click [here](https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/UI/UI.js) for the source code.

<h4>virtualSystem()</h4>

A module for emulating the structure of a file system.

Click [here](https://raw.githubusercontent.com/Gallery-of-Kaeon/Philosophers-Stone/master/Philosopher's%20Stone/API/Virtual%20System/virtualSystem.js) for the source code.

<h4>widgets()</h4>

A module for creating various miscellaneous widgets.

Click [here](https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/UI/widgets.js) for the source code.

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