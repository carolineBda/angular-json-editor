angular-json-editor
===================

Directive to render an editor to edit the fields of any JSON object. The editor does not allow yet to change the schema (add or remove attributes) but just to edit the exsiting values

##Usage
    <json-editor content="content"></json-editor>

Note that content object is a json object added to the scope

## Requirements

- AngularJS
- [Ace 1.x](https://github.com/ajaxorg/ace-builds/)
- [Ace-ui](https://github.com/angular-ui/ui-ace)

##Installation
Add to your project angular-json-editor [source](https://github.com/carolineBda/angular-json-editor/blob/master/src/angular-json-editor.min.js).

Include the json-editor directives as a dependency on your angular module

    angular.module("myapp", ["angularJsonEditor"]);

Demo

Checkout source code, update dependencies and run the app 

    git clone https://github.com/carolineBda/angular-json-editor 
    cd angular-json-editor 
    bower install
    npm start

Then browse [http://localhost:8000/demo/index.html](http://localhost:8000/demo/index.html)
