describe('Angular JSON editor', function() {

    var element, $rootScope, changeInputValue;

    beforeEach(function() {

        module('angularJsonEditor');

        inject(function(_$rootScope_, $sniffer) {
            $rootScope = _$rootScope_;
             changeInputValue = function(elm, value) {
                elm.val(value);
                browserTrigger(elm, $sniffer.hasEvent('input') ? 'input' : 'change');
            };
        });
    });

    describe('user is able to edit json object', function() {

        it('directive should create a input with the value string', function() {

            given(function(){
                $rootScope.json = { myAttribute: 'some value' };
            });

            when(function() {
                element = compileDirective('<json-editor content="json"></json-editor>');
            });

            then(function(){
                expect(element.find('label').text()).toEqual('myAttribute');
                expect(element.find('input').val()).toEqual('some value');
            });
        });

        it('directive should create a input with the empty string', function() {

            given(function(){
                $rootScope.json = { myAttribute: '' };
            });

            when(function() {
                element = compileDirective('<json-editor content="json"></json-editor>');
            });

            then(function(){
                expect(element.find('label').text()).toEqual('myAttribute');
                expect(element.find('input').val()).toEqual('');
            });
        });

        it('json editor with two string value', function() {

            given(function(){
                $rootScope.json = { firstAttribute: 'some first value', secondAttribute: 'some second value' };
            });

            when(function() {
                element = compileDirective('<json-editor content="json"></json-editor>');
            });

            then(function(){
                expect(element.find('label').eq(0).text()).toEqual('firstAttribute');
                expect(element.find('input').eq(0).val()).toEqual('some first value');
            });

            and(function(){
                expect(element.find('label').eq(1).text()).toEqual('secondAttribute');
                expect(element.find('input').eq(1).val()).toEqual('some second value');
            });
        });

        it('json editor with array do not put key before array object', function() {

            given(function(){
                $rootScope.json = { attribute: ['un', 'deux', 'trois'] };
            });

            when(function() {
                element = compileDirective('<json-editor content="json"></json-editor>');
            });

            then(function(){
                expect(element.find('span').eq(0).text()).toEqual('attribute');
                expect(element.find('input').eq(0).val()).toEqual('un');
                expect(element.find('label').eq(0).text()).toEqual('0');
                expect(element.find('input').eq(1).val()).toEqual('deux');
                expect(element.find('label').eq(1).text()).toEqual('1');
                expect(element.find('input').eq(2).val()).toEqual('trois');
                expect(element.find('label').eq(2).text()).toEqual('2');
            });
        });

        it('json editor render textarea when value is more than 100 characters', function() {

            const longString = 'More than 100 characters! More than 100 characters! More than 100 characters! More than 100 characters! More than 100 characters! More than 100 characters! More than 100 characters! More than 100 characters! More than 100 characters! More than 100 characters! More than 100 characters! More than 100 characters! ';

            given(function(){
                $rootScope.json = { attribute: longString };
            });

            when(function() {
                element = compileDirective('<json-editor content="json"></json-editor>');
            });

            then(function(){
                expect(element.find('label').eq(0).text()).toEqual('attribute');
                expect(element.find('textarea').eq(0).val()).toEqual(longString);
            });
        });

        it('json editor with string, object and array', function() {

            given(function(){
                $rootScope.json = { firstAttribute: 'some first value', secondAttribute: [1, 2, 3], thirdAttribute: { iAm: 'an object' } };
            });

            when(function() {
                element = compileDirective('<json-editor content="json"></json-editor>');
            });

            then(function(){
                expect(element.find('label').eq(0).text()).toEqual('firstAttribute');
                expect(element.find('input').eq(0).val()).toEqual('some first value');
            });

            and(function(){
                expect(element.find('span').eq(0).text()).toEqual('secondAttribute');

                expect(element.find('input').eq(1).val()).toEqual('1');
                expect(element.find('input').eq(2).val()).toEqual('2');
                expect(element.find('input').eq(3).val()).toEqual('3');
            });

            and(function(){
                expect(element.find('span').eq(1).text()).toEqual('thirdAttribute');
                expect(element.find('label').eq(4).text()).toEqual('iAm');
                expect(element.find('input').eq(5).val()).toEqual('an object');
            });
        });
    });

    function browserTrigger(element, eventType) {
        element = element[0];
        if (document.createEvent) {
            var event = document.createEvent('MouseEvents');
            event.initMouseEvent(eventType, true, true, window, 0, 0, 0, 0, 0, false, false,
                false, false, 0, element);
            element.dispatchEvent(event);
        } else {
            element.fireEvent('on' + eventType);
        }
    }

    it('json editor (+) modifies ui and model with a property', function() {
        given(function() {
           $rootScope.json = {firstAttribute: {}};
        });

        when(function() {
           element = compileDirective('<json-editor content="json"></json-editor>');
        });

        then(function() {
           expect(element.find('span').eq(0).text()).toEqual('firstAttribute');
           expect(element.find('input').eq(0).val()).toEqual('');
           expect(element.find('input').eq(1).val()).toEqual('');
           expect(element.find('button').eq(0).text()).toEqual('+');
        });

        when(function() {
            changeInputValue(element.find('input').eq(0), 'something');
            changeInputValue(element.find('input').eq(1), 'other thing');
            browserTrigger(element.find('button').eq(0), 'click');
        });

        then(function() {
            expect(element.find('label').eq(0).text()).toEqual('something');
            expect(element.find('input').eq(0).val()).toEqual('other thing');
            expect(element.find('input').eq(1).val()).toEqual('something');
            expect(element.find('input').eq(2).val()).toEqual('other thing');
            expect($rootScope.json).toEqual({firstAttribute: { something : "other thing"}});
        });
    });

    it('json editor (+) modifies ui and model with a table', function() {
        given(function() {
           $rootScope.json = {firstAttribute: {}};
        });

        when(function() {
           element = compileDirective('<json-editor content="json"></json-editor>');
           changeInputValue(element.find('input').eq(0), 'table');
           changeInputValue(element.find('input').eq(1), "[1, 2, 3]");
           browserTrigger(element.find('button').eq(0), 'click');
        });

        then(function() {
            expect(element.find('span').eq(1).text()).toEqual('table');

            expect(element.find('input').eq(0).val()).toEqual('1');
            expect(element.find('input').eq(1).val()).toEqual('2');
            expect(element.find('input').eq(2).val()).toEqual('3');
            expect($rootScope.json).toEqual({firstAttribute: { table : [1, 2, 3]}});
        });
    });

});