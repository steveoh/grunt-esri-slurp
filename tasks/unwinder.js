/*
    m/(define\()(\".*\")(.split\(\"\,\"\))/;
    (my \$new = \$2) =~ s/,/\"\,\"/g;
    s/(define\()(\".*\")(.split\(\"\,\"\))/\$1\[\$new\]/;
    s/\/dojo\/dijit\/themes/\/dijit\/themes/g;
    s/\/dojo\/dojox\/grid\/resources\/images/\/dojox\/grid\/resources\/images/g;
    s/\/dojo\/dojo\/resources\/images/\/dojo\/resources\/images/g;
    " $f
*/

module.exports = function(text) {
    var matches = /define\(\"(.*)\".split\("\s"\)([\s\S]*)/m.exec(text);

    if(matches === null || matches.length < 2){
        return text;
    }

    var requireString = matches[1];
    requireString = requireString.replace(/dojo\/dijit\/themes/g, 'dijit/themes');
    requireString = requireString.replace(/dojo\/dojox\/grid\/resources\/images/g, 'dojox/grid/resources/images');
    requireString = requireString.replace(/dojo\/dojo\/resources\/images/g, 'dojo/resources/images');

    var requireArgs = requireString.split(' ');

    requireArgs = requireArgs.map(function(arg){
        return '"' + arg + '"';
    });

    var requires = requireArgs.join(',');

    var unwound = '//>>built\ndefine([' + requires + ']' + matches[2];

    return unwound;
};