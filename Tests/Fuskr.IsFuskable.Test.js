$(function(){
	module("IsFuskable");
	
	test("Function exists", function(){
		equal(!!Fuskr.IsFuskable, true);
		equal(typeof(Fuskr.IsFuskable), "function");
	});

	test("Null url", function() {
		var url;
		equal(Fuskr.IsFuskable(url), false);
	});

	test("Empty string Url", function() {
		var url = "";
		equal(Fuskr.IsFuskable(url), false);
	});

	test("Object / Invalid parameter Url", function() {
		var url = { "hey" : "ho" } ;
		equal(Fuskr.IsFuskable(url), false);
	});

	test("Array / Invalid parameter Url", function() {
		var url = ["string",1234, {"obj" : "ject"}] ;
		equal(Fuskr.IsFuskable(url), false);
	});

	test("URL - Unfuskable - no numbers", function() {
		var url = "http://domain.com/path/file/";
		equal(Fuskr.IsFuskable(url), false);
	});

	//URL - Unfuskable (unclosed)
	test("URL - Unfuskable (unclosed)", function() {
		var url = "http://domain.com/path/file/[0-9.jpg";
		equal(Fuskr.IsFuskable(url), false);

		var url = "http://domain.com/path/file/[a-z.jpg";
		equal(Fuskr.IsFuskable(url), false);
	});

	//URL - Unfuskable (unopen)
	test("URL - Unfuskable (unopen)", function() {
		var url = "http://domain.com/path/file/0-9].jpg";
		equal(Fuskr.IsFuskable(url), false);

		var url = "http://domain.com/path/file/a-z].jpg";
		equal(Fuskr.IsFuskable(url), false);
	});

	//URL - Unfuskable (symbols)
	test("URL - Unfuskable (symbols)", function() {
		var url = "http://domain.com/path/file/[0-$&].jpg";
		equal(Fuskr.IsFuskable(url), false);

		var url = "http://domain.com/path/file/[a-$&].jpg";
		equal(Fuskr.IsFuskable(url), false);
	});

	//URL - Unfuskable (malformed)
	test("URL - Unfuskable (malformed)", function() {
		var url = "http://domain.com/path/file/[0-45[.jpg";
		equal(Fuskr.IsFuskable(url), false);

		var url = "http://domain.com/path/file/[a-z[.jpg";
		equal(Fuskr.IsFuskable(url), false);
	});

	test("URL - Fuskable file [0-9]/[a-z]", function() {
		var url = "http://domain.com/path/file/[0-9].jpg";
		equal(Fuskr.IsFuskable(url), true);

		var url = "http://domain.com/path/file/[a-z].jpg";
		equal(Fuskr.IsFuskable(url), true);
	});

	test("URL - Fuskable path with file [0-9]/[a-z]", function() {
		var url = "http://domain.com/path[0-9]/file.jpg";
		equal(Fuskr.IsFuskable(url), true);

		var url = "http://domain.com/path[a-z]/file.jpg";
		equal(Fuskr.IsFuskable(url), true);
	});

	test("URL - Fuskable path with no file [0-9]/[a-z]", function() {
		var url = "http://domain.com/path[0-9]/";
		equal(Fuskr.IsFuskable(url), true);

		var url = "http://domain.com/path[a-z]/";
		equal(Fuskr.IsFuskable(url), true);
	});

	test("URL - Fuskable path with no file [0-9]/[a-z] and no trailing slash", function() {
		var url = "http://domain.com/path[0-9]";
		equal(Fuskr.IsFuskable(url), true);

		var url = "http://domain.com/path[a-z]";
		equal(Fuskr.IsFuskable(url), true);
	});

	test("URL - Fuskable domain with file [0-9]/[a-z]", function() {
		var url = "http://domain[0-9].com/path/file.jpg";
		equal(Fuskr.IsFuskable(url), true);

		var url = "http://domain[a-z].com/path/file.jpg";
		equal(Fuskr.IsFuskable(url), true);
	});

	test("URL - Fuskable domain with path only [0-9]/[a-z]", function() {
		var url = "http://domain[0-9].com/path";
		equal(Fuskr.IsFuskable(url), true);

		var url = "http://domain[a-z].com/path";
		equal(Fuskr.IsFuskable(url), true);
	});

	/*********************************/
	test("URL - Fuskable file - [0-9]/[a-z] (multiple fusks)", function() {
		var url = "http://domain.com/path/file[0-9]another[0-9].jpg";
		equal(Fuskr.IsFuskable(url), true);

		var url = "http://domain.com/path/file[a-z]another[a-z].jpg";
		equal(Fuskr.IsFuskable(url), true);
	});

	test("URL - Fuskable path with file [0-9]/[a-z] (multiple fusks)", function() {
		var url = "http://domain.com/path[0-9]another[0-9]/file.jpg";
		equal(Fuskr.IsFuskable(url), true);

		var url = "http://domain.com/path[a-z]another[a-z]/file.jpg";
		equal(Fuskr.IsFuskable(url), true);
	});

	test("URL - Fuskable path with no file [0-9]/[a-z] (multiple fusks)", function() {
		var url = "http://domain.com/path[0-9]another[0-9]/";
		equal(Fuskr.IsFuskable(url), true);

		var url = "http://domain.com/path[a-z]another[a-z]/";
		equal(Fuskr.IsFuskable(url), true);
	});

	test("URL - Fuskable path with no file [0-9]/[a-z] and no trailing slash (multiple fusks)", function() {
		var url = "http://domain.com/path[0-9]another[0-9]";
		equal(Fuskr.IsFuskable(url), true);

		var url = "http://domain.com/path[a-z]another[a-z]";
		equal(Fuskr.IsFuskable(url), true);
	});

	test("URL - Fuskable domain with file [0-9]/[a-z] (multiple fusks)", function() {
		var url = "http://domain[0-9]another[0-9].com/path/file.jpg";
		equal(Fuskr.IsFuskable(url), true);

		var url = "http://domain[a-z]another[a-z].com/path/file.jpg";
		equal(Fuskr.IsFuskable(url), true);
	});

	test("URL - Fuskable domain with path only [0-9]/[a-z] (multiple fusks)", function() {
		var url = "http://domain[0-9]another[0-9].com/path";
		equal(Fuskr.IsFuskable(url), true);

		var url = "http://domain[a-z]another[a-z].com/path";
		equal(Fuskr.IsFuskable(url), true);
	});

	/*********************************/

	test("URL - Fuskable file - [0-9]/[a-z] (dual fusks after)", function() {
		var url = "http://domain.com/path/file[0-9]another{0}.jpg";
		equal(Fuskr.IsFuskable(url), true);

		var url = "http://domain.com/path/file[a-z]another{0}.jpg";
		equal(Fuskr.IsFuskable(url), true);
	});

	test("URL - Fuskable path with file [0-9]/[a-z] (dual fusks after)", function() {
		var url = "http://domain.com/path[0-9]another{0}/file.jpg";
		equal(Fuskr.IsFuskable(url), true);

		var url = "http://domain.com/path[a-z]another{0}/file.jpg";
		equal(Fuskr.IsFuskable(url), true);
	});

	test("URL - Fuskable path with no file [0-9/[a-z]] (dual fusks after)", function() {
		var url = "http://domain.com/path[0-9]another{0}";
		equal(Fuskr.IsFuskable(url), true);

		var url = "http://domain.com/path[a-z]another{0}";
		equal(Fuskr.IsFuskable(url), true);
	});

	test("URL - Fuskable path with no file [0-9]/[a-z] and no trailing slash (dual fusks after)", function() {
		var url = "http://domain.com/path[0-9]another{0}";
		equal(Fuskr.IsFuskable(url), true);

		var url = "http://domain.com/path[a-z]another{0}";
		equal(Fuskr.IsFuskable(url), true);
	});

	test("URL - Fuskable domain with file [0-9]/[a-z] (dual fusks after)", function() {
		var url = "http://domain[0-9]another{0}.com/path/file.jpg";
		equal(Fuskr.IsFuskable(url), true);

		var url = "http://domain[a-z]another{0}.com/path/file.jpg";
		equal(Fuskr.IsFuskable(url), true);
	});

	test("URL - Fuskable domain with path only [0-9]/[a-z] (dual fusks after)", function() {
		var url = "http://domain[0-9]another{0}.com/path";
		equal(Fuskr.IsFuskable(url), true);

		var url = "http://domain[a-z]another{0}.com/path";
		equal(Fuskr.IsFuskable(url), true);
	});

	test("URL - Fuskable file {0} (dual fusks before)", function() {
		var url = "http://domain.com/path/file/{0}another[0-9].jpg";
		equal(true, Fuskr.IsFuskable(url));

		var url = "http://domain.com/path/file/{0}another[a-z].jpg";
		equal(true, Fuskr.IsFuskable(url));
	});

	test("URL - Fuskable path with file {0} (dual fusk before)", function() {
		var url = "http://domain.com/path{0}another[0-9]/file.jpg";
		equal(Fuskr.IsFuskable(url), true);

		var url = "http://domain.com/path{0}another[a-z]/file.jpg";
		equal(Fuskr.IsFuskable(url), true);
	});

	test("URL - Fuskable path with no file {0} (dual fusk before)", function() {
		var url = "http://domain.com/path{0}another[0-9]/";
		equal(Fuskr.IsFuskable(url), true);

		var url = "http://domain.com/path{0}another[a-z]/";
		equal(Fuskr.IsFuskable(url), true);
	});

	test("URL - Fuskable path with no file {0} and no trailing slash (dual fusk before)", function() {
		var url = "http://domain.com/path{4}another[0-9]";
		equal(Fuskr.IsFuskable(url), true);

		var url = "http://domain.com/path{4}another[a-z]";
		equal(Fuskr.IsFuskable(url), true);
	});

	test("URL - Fuskable domain with file {0} (dual fusk before)", function() {
		var url = "http://domain{1}another[0-9].com/path/file.jpg";
		equal(Fuskr.IsFuskable(url), true);

		var url = "http://domain{1}another[a-z].com/path/file.jpg";
		equal(Fuskr.IsFuskable(url), true);
	});

	test("URL - Fuskable domain with path only {0} (dual fusk before)", function() {
		var url = "http://domain{2}another[0-9].com/path";
		equal(Fuskr.IsFuskable(url), true);

		var url = "http://domain{2}another[a-z].com/path";
		equal(Fuskr.IsFuskable(url), true);
	});
});