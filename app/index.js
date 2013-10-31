"use strict";

var util = require("util"),
    path = require("path"),
    yeoman = require("yeoman-generator"),
    NjsGenerator;

NjsGenerator = module.exports = function NjsGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on("end", function () {
    this.installDependencies({ skipInstall: options["skip-install"] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, "../package.json")));
};

util.inherits(NjsGenerator, yeoman.generators.Base);

NjsGenerator.prototype.askFor = function askFor() {
  var callback = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    type: "confirm",
    name: "someOption",
    message: "Would you like to enable this option?",
    default: true
  }];

  this.prompt(prompts, function (props) {
    this.someOption = props.someOption;

    callback();
  }.bind(this));
};

NjsGenerator.prototype.app = function app() {
  // this.mkdir("app");
  // this.mkdir("app/templates");

  // this.copy("_package.json", "package.json");
  // this.copy("_bower.json", "bower.json");
};

NjsGenerator.prototype.projectfiles = function projectfiles() {
  this.copy(".jshintrc", ".jshintrc");
};