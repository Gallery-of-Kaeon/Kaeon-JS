<style>

	#united-logo {
		background: white;
		border-radius: 100%
	}

</style>

<h1 align="center">Kaeon United</h1>
<h2 align="center">It just works.</h2>

<p align="center">
	<img id="united-logo" src="https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-United/master/Kaeon%20United/Logo/Logo.png" width="300px" height="300px"/>
</p>

<h2 align="center">What is Kaeon United?</h2>

Kaeon United (pronounced "KAI-on") is an API that provides developers access to [Kaeon FUSION](https://github.com/Gallery-of-Kaeon/Kaeon-FUSION),
[Kaeon ACE](https://github.com/Gallery-of-Kaeon/Kaeon-ACE),
the [United Suite](https://github.com/Gallery-of-Kaeon/Kaeon-United/tree/master/Kaeon%20United/Specification/1%20-%20United%20Suite),
and various other miscellaneous utilities through a single JavaScript interface.

<h2 align="center">API</h2>

Kaeon United is implemented as a single file,
but it is written in such a way that its functionality differs according to how it is referenced.

It can be used as a CDN,
as an HTML script,
as a CLI,
or as a CommonJS module.

<h3 align="center">As a CDN</h3>

See [Kaeon United GhostHost](https://github.com/Gallery-of-Kaeon/Gallery-of-Kaeon.github.io).

<h3 align="center">As an HTML Script</h3>

To use Kaeon United as a script,
reference it via [jsDelivr](https://www.jsdelivr.com/) or another similar service.

To reference it via jsDeliver,
use the following URL:

    https://cdn.jsdelivr.net/gh/Gallery-of-Kaeon/Kaeon-United/Kaeon%20United/Source/KaeonUnited.js

As a script,
Kaeon United shall allow the use of the CommonJS require function to import CommonJS style modules stored online via their URLs.

However,
unlike other libraries which also provide this functionality,
Kaeon United shall allow the dynamic use of the require function such that modules may be referenced via URLs generated or retrieved at runtime,
and shall also allow cross origin access to said modules.

<h3 align="center">As a CLI</h3>

Kaeon United is available on npm under the alias "kaeon-united",
and as such,
it may be used as a command line utility via npx.

<!-- STUB -->

<h3 align="center">As a Module</h3>

If using JavaScript through Kaeon United's CDN,
Script,
or CLI modes,
then Kaeon United may be imported as a CommonJS style module through the KaeonUnited require function via the alias "Kaeon United".

The imported module may act as a Kaeon FUSION interface,
and shall contain a series of functions which when called return references to various miscellaneous JavaScript utilities.

<!-- STUB -->

<h2 align="center">Source</h2>

To view the source code for Kaeon United,
click [here](https://github.com/Gallery-of-Kaeon/Kaeon-United/blob/master/Kaeon%20United/Source/KaeonUnited.js).

<h2 align="center">Specification</h2>

To view the specification for Kaeon United,
click [here](https://github.com/Gallery-of-Kaeon/Kaeon-United/tree/master/Kaeon%20United/Specification).

<h2>Disclaimer</h2>

Please note,
the ability for Kaeon United to reference certain utilities is dependent on a public CORS proxy,
currently [Cors Anywhere](https://cors-anywhere.herokuapp.com/),
which occasionally goes down.