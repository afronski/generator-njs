"use strict";

var util = require("util"),
    path = require("path"),

    yeoman = require("yeoman-generator"),

    NjsGenerator;

NjsGenerator = module.exports = function NjsGenerator(args, options) {
  yeoman.generators.Base.apply(this, arguments);

  this.on("end", function () {
    this.installDependencies({
      skipInstall: options["skip-install"]
    });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, "../package.json")));
};

util.inherits(NjsGenerator, yeoman.generators.Base);

NjsGenerator.prototype.askFor = function () {
  var callback = this.async();

  console.log(this.yeoman);

  var prompts = [{
    name: "name",
    message: "What do you want to call your application?",

    default: "test-njs-application"
  }];

  this.prompt(prompts, function (props) {
    this.name = props.name;

    callback();
  }.bind(this));
};

NjsGenerator.prototype.app = function app() {
  this.mkdir("src");
  this.mkdir("test");

  this.copy("Gruntfile.js", "Gruntfile.js");
  this.copy("index.js", "index.js");

  this.copy("src/fake.js", "src/fake.js");
  this.copy("test/fake.test.js", "test/fake.test.js");

  this.template("_package.json", "package.json");
};

NjsGenerator.prototype.projectfiles = function projectfiles() {
  this.copy("License - MIT.md", "License - MIT.md");

  this.copy(".jshintrc", ".jshintrc");
  this.copy(".gitignore", ".gitignore");

  this.template("_README.md", "README.md");
};