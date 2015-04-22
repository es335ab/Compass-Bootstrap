//var Nanika = require('./nanika/models/Nanika');
var NanikaView = require('./nanika/views/NanikaView');
var getUrlVars = require('./utils/getUrlVars');

//var nanika = new Nanika();
var nanikaView = new NanikaView();

nanikaView.render();
console.log(getUrlVars);