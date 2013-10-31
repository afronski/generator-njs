/*global describe, beforeEach, it*/
"use strict";

var path = require("path"),
    helpers = require("yeoman-generator").test;

describe("njs generator", function () {

  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, "temp"), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator("njs:app", [ "../../app" ]);

      done();
    }.bind(this));
  });

  it("creates expected files", function (done) {
    var expected = [
      ".gitignore",
      ".jshintrc",

      "index.js",
      "package.json",

      "src/fake.js",
      "test/fake.test.js",

      "License - MIT.md",
      "README.md"
    ];

    helpers.mockPrompt(this.app, { "name": "name-doesnt-matter" });

    this.app.options["skip-install"] = true;

    this.app.run({}, function () {
      helpers.assertFiles(expected);

      done();
    });
  });

  it("fills properly README file", function (done) {
    var expected = "filling-README";

    helpers.mockPrompt(this.app, { "name": expected });

    this.app.options["skip-install"] = true;

    this.app.run({}, function () {
      helpers.assertFile("README.md", new RegExp(expected, "i"));

      done();
    });
  });

  it("fills properly package.json file", function (done) {
    var expected = "filling-package-json";

    helpers.mockPrompt(this.app, { "name": expected });

    this.app.options["skip-install"] = true;

    this.app.run({}, function () {
      helpers.assertFile("package.json", new RegExp(expected, "i"));

      done();
    });
  });

});