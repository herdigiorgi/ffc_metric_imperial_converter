/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });
    
    test('Decimal Input', function(done) {
      assert.equal(convertHandler.getNum("3.2L"),3.2);
      done();
    });
    
    test('Fractional Input', function(done) {
      assert.equal(convertHandler.getNum("3/2L"),1.5);
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      assert.equal(convertHandler.getNum("6.6/3L"),2.2);
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      assert.equal(convertHandler.getNum("6.6/3/3L"), null);
      done();
    });
    
    test('No Numerical Input', function(done) {
      assert.equal(convertHandler.getNum("L"), null);
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      const input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele) {
        const rand = Math.random() * 5 + ele;
        assert.equal(convertHandler.getUnit(rand), ele)
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      assert.equal(convertHandler.getUnit('what?'), null)
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input  = ['gal',    'l',     'mi',   'km',        'lbs',   'kg'];
      var expect = ['gallons','liters','miles','kilometers','pounds','kilograms'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      assert.approximately(convertHandler.convert(50,'l'), 13.208, 0.01);
      done();
    });
    
    test('Mi to Km', function(done) {
      assert.approximately(convertHandler.convert(35,'mi'), 56.327, 0.01);
      done();
    });
    
    test('Km to Mi', function(done) {
      assert.approximately(convertHandler.convert(203,'km'), 126.138, 0.01);
      done();
    });
    
    test('Lbs to Kg', function(done) {
      assert.approximately(convertHandler.convert(53,'lbs'), 24.0404, 0.01);
      done();
    });
    
    test('Kg to Lbs', function(done) {
      assert.approximately(convertHandler.convert(458,'kg'), 1009.72, 0.01);
      done();
    });
    
  });

});