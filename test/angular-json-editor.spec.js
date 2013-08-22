describe('Angular Toggle', function() {

    var element, $rootScope;

    beforeEach(function() {

        module('angularJsonEditorDirectives');

        inject(function(_$rootScope_) {
            $rootScope = _$rootScope_;
        });
    });

    describe('toggle directive element', function() {

        it('directive should create a textarea with the value string in it', function() {

            given(function(){
                $rootScope.json = { myAttribute: 'some value' };
            });

            when(function() {
                element = compileDirective('<json-editor json="json"></json-editor>');
            });

            then(function(){
                expect(element.find('label').text()).toEqual('myAttribute');
                expect(element.find('textarea').val()).toEqual('some value');
            });
        });

        it('directive should create two textarea with the value string in it', function() {

            given(function(){
                $rootScope.json = { firstAttribute: 'some first value', secondAttribute: 'some second value' };
            });

            when(function() {
                element = compileDirective('<json-editor json="json"></json-editor>');
            });

            then(function(){
                expect(element.find('label').eq(0).text()).toEqual('firstAttribute');
                expect(element.find('textarea').eq(0).val()).toEqual('some first value');
            });

            and(function(){
                expect(element.find('label').eq(1).text()).toEqual('secondAttribute');
                expect(element.find('textarea').eq(1).val()).toEqual('some second value');
            });
        });

        it('directive should create two textarea with the value string in it', function() {

            given(function(){
                $rootScope.json = { firstAttribute: 'some first value', secondAttribute: [1, 2, 3], thirdAttribute: { iAm: 'an object' } };
            });

            when(function() {
                element = compileDirective('<json-editor json="json"></json-editor>');
            });

            then(function(){
                expect(element.find('label').eq(0).text()).toEqual('firstAttribute');
                expect(element.find('textarea').eq(0).val()).toEqual('some first value');
            });

            and(function(){
                expect(element.find('label').eq(1).text()).toEqual('secondAttribute');
                expect(element.find('label').eq(2).text()).toEqual('0');
                expect(element.find('label').eq(3).text()).toEqual('1');
                expect(element.find('label').eq(4).text()).toEqual('2');

                expect(element.find('textarea').eq(1).val()).toEqual('1');
                expect(element.find('textarea').eq(2).val()).toEqual('2');
                expect(element.find('textarea').eq(3).val()).toEqual('3');
            });

            and(function(){
                expect(element.find('label').eq(5).text()).toEqual('thirdAttribute');
                expect(element.find('label').eq(6).text()).toEqual('iAm');
                expect(element.find('textarea').eq(4).val()).toEqual('an object');
            });
        });
    });

});