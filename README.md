angular-json-editor
===================

Directive to render an editor to edit the fields of any JSON object. The editor does not allow yet to change the schema (add or remove attributes) but just to edit the exsiting values

##Usage
    <json-editor content="content"></json-editor>

Note that content object is a json object added to the scope

##Installation
Add to your project angular-json-editor [source](https://github.com/carolineBda/angular-json-editor/blob/master/directives/angular-json-editor.min.js).

Include the json-editor directives as a dependency on your angular module

    angular.module("myapp", ["angularJsonEditorDirectives"]);
