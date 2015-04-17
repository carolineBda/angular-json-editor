'use strict';

describe('Angular JSON editor', function () {

    var element, $rootScope, changeInputValue;
    var markup = '<json-editor content="json"></json-editor>';

    beforeEach(function () {

        module('angularJsonEditor');

        inject(function (_$rootScope_, $sniffer) {
            $rootScope = _$rootScope_;
            changeInputValue = function (elm, value) {
                elm.val(value);
                browserTrigger(elm, $sniffer.hasEvent('input') ? 'input' : 'change');
            };

        });
    });

    describe('json editor present json object', function () {

        it('directive should create a input with the value string', function () {

            $rootScope.json = {myAttribute: 'some value'};

            element = compileDirective(markup);

            expect(element.find('label').text()).toEqual('myAttribute');
            expect(element.find('input').val()).toEqual('some value');

        });
        it('directive should create a input with the empty string', function () {

            $rootScope.json = {myAttribute: ''};

            element = compileDirective(markup);

            expect(element.find('label').text()).toEqual('myAttribute');
            expect(element.find('input').val()).toEqual('');
        });

        it('json editor with two string value', function () {


            $rootScope.json = {firstAttribute: 'some first value', secondAttribute: 'some second value'};

            element = compileDirective(markup);

            expect(element.find('label').eq(0).text()).toEqual('firstAttribute');
            expect(element.find('input').eq(0).val()).toEqual('some first value');

            expect(element.find('label').eq(1).text()).toEqual('secondAttribute');
            expect(element.find('input').eq(1).val()).toEqual('some second value');

        });
        it('json editor with array do not put key before array object', function () {

            $rootScope.json = {attribute: ['un', 'deux', 'trois']};

            element = compileDirective(markup);

            expect(element.find('span').eq(0).text()).toEqual('attribute');
            expect(element.find('input').eq(0).val()).toEqual('un');
            expect(element.find('label').eq(0).text()).toEqual('0');
            expect(element.find('input').eq(1).val()).toEqual('deux');
            expect(element.find('label').eq(1).text()).toEqual('1');
            expect(element.find('input').eq(2).val()).toEqual('trois');
            expect(element.find('label').eq(2).text()).toEqual('2');

        });
        it('json editor render textarea when value is more than 100 characters', function () {

            var longString = 'More than 100 characters! More than 100 characters! More than 100 characters! More than 100 characters! More than 100 characters! More than 100 characters! More than 100 characters! More than 100 characters! More than 100 characters! More than 100 characters! More than 100 characters! More than 100 characters! ';

            $rootScope.json = {attribute: longString};

            element = compileDirective(markup);

            expect(element.find('label').eq(0).text()).toEqual('attribute');
            expect(element.find('.ace_text-layer').text()).toBeDefined();

        });
        it('json editor with string, object and array', function () {

            $rootScope.json = {
                firstAttribute: 'some first value',
                secondAttribute: [1, 2, 3],
                thirdAttribute: {iAm: 'an object'}
            };


            element = compileDirective(markup);

            expect(element.find('label').eq(0).text()).toEqual('firstAttribute');
            expect(element.find('input').eq(0).val()).toEqual('some first value');

            expect(element.find('span').eq(0).text()).toEqual('secondAttribute');

            expect(element.find('input').eq(1).val()).toEqual('1');
            expect(element.find('input').eq(2).val()).toEqual('2');
            expect(element.find('input').eq(3).val()).toEqual('3');

            expect(element.find('span').eq(1).text()).toEqual('thirdAttribute');
            expect(element.find('label').eq(4).text()).toEqual('iAm');
            expect(element.find('input').eq(5).val()).toEqual('an object');

        });
    });

    describe('user is able to edit json object', function () {

        it('top level object is editable', function () {

            $rootScope.json = {hello:'ji'};

            element = compileDirective(markup);

            expect(element.find('input').eq(0).val()).toEqual('ji');
            expect(element.find('button').eq(0).attr('title')).toEqual('Remove');

            expect(element.find('input').eq(1).val()).toEqual('');
            expect(element.find('input').eq(2).val()).toEqual('');
            expect(element.find('button').eq(1).attr('title')).toEqual('Add');

            changeInputValue(element.find('input').eq(1), 'bonjour');
            changeInputValue(element.find('input').eq(2), 'jo');
            browserTrigger(element.find('button').eq(1), 'click');

            expect($rootScope.json).toEqual({hello:'ji', bonjour: 'jo'});
        });

        it('json editor (+) modifies ui and model with an object', function () {

            $rootScope.json = {firstAttribute: []};

            element = compileDirective(markup);

            expect(element.find('span').eq(0).text()).toEqual('firstAttribute');
            expect(element.find('input').eq(0).val()).toEqual('');
            expect(element.find('button').eq(0).attr('title')).toEqual('Add');

            changeInputValue(element.find('input').eq(0), '{}');
            browserTrigger(element.find('button').eq(0), 'click');

            expect(element.find('input').eq(0).val()).toEqual('');
            expect(element.find('input').eq(1).val()).toEqual('');
            expect($rootScope.json).toEqual({firstAttribute: [{}]});

        });

        it('json editor (+) modifies default empty value to object', function () {

            $rootScope.json = {firstAttribute: []};

            element = compileDirective(markup);

            changeInputValue(element.find('input').eq(0), '');
            browserTrigger(element.find('button').eq(0), 'click');

            expect(element.find('input').eq(0).val()).toEqual('');
            expect(element.find('input').eq(1).val()).toEqual('');
            expect($rootScope.json).toEqual({firstAttribute: [{}]});

        });

        it('json editor (+) modifies ui and model with a property', function () {

            $rootScope.json = {firstAttribute: {}};

            element = compileDirective(markup);

            expect(element.find('span').eq(0).text()).toEqual('firstAttribute');
            expect(element.find('input').eq(0).val()).toEqual('');
            expect(element.find('input').eq(1).val()).toEqual('');
            expect(element.find('button').eq(0).attr('title')).toEqual('Add');

            changeInputValue(element.find('input').eq(0), 'something');
            changeInputValue(element.find('input').eq(1), 'other thing');
            browserTrigger(element.find('button').eq(0), 'click');

            expect(element.find('label').eq(0).text()).toEqual('something');
            expect(element.find('input').eq(0).val()).toEqual('other thing');
            expect(element.find('input').eq(1).val()).toEqual('something');
            expect(element.find('input').eq(2).val()).toEqual('other thing');
            expect($rootScope.json).toEqual({firstAttribute: {something: 'other thing'}});

        });

        it('json editor (+) modifies ui and model with a table', function () {

            $rootScope.json = {firstAttribute: {}};

            element = compileDirective(markup);
            changeInputValue(element.find('input').eq(0), 'table');
            changeInputValue(element.find('input').eq(1), '[1, 2, 3]');
            browserTrigger(element.find('button').eq(0), 'click');

            expect(element.find('span').eq(1).text()).toEqual('table');

            expect(element.find('input').eq(0).val()).toEqual('1');
            expect(element.find('input').eq(1).val()).toEqual('2');
            expect(element.find('input').eq(2).val()).toEqual('3');
            expect($rootScope.json).toEqual({firstAttribute: {table: [1, 2, 3]}});

        });

        it('json editor (-) modifies ui and model', function () {

            $rootScope.json = {firstAttribute: {src: 'www.nowtv.com'}};

            element = compileDirective(markup);

            expect(element.find('span').eq(0).text()).toEqual('firstAttribute');
            expect(element.find('label').eq(0).text()).toEqual('src');
            expect(element.find('input').eq(0).val()).toEqual('www.nowtv.com');
            expect(element.find('button').eq(0).attr('title')).toEqual('Remove');

            browserTrigger(element.find('button').eq(0), 'click');

            expect(element.find('input').eq(0).val()).toEqual('');
            expect($rootScope.json).toEqual({firstAttribute: {}});

        });

        it('json editor (-) modifies ui and model with array', function () {

            $rootScope.json = {firstAttribute: [1, 2, 3]};

            element = compileDirective(markup);

            expect(element.find('span').eq(0).text()).toEqual('firstAttribute');
            expect(element.find('button').eq(0).attr('title')).toEqual('Remove');
            expect(element.find('button').eq(1).attr('title')).toEqual('Remove');
            expect(element.find('button').eq(2).attr('title')).toEqual('Remove');

            browserTrigger(element.find('button').eq(0), 'click');

            expect($rootScope.json).toEqual({firstAttribute: [2, 3]});

        });
    });

});