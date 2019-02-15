/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

function sendResponse(res, data) {
  if(data.initNum == null && data.initUnit == null) {
    return res.status(400).json({error: 'invalid number and unit'})
  }
  if(data.initNum == null) {
    return res.status(400).json({error: 'invalid number'})
  }
  if(data.initUnit == null) {
    return res.status(400).json({error: 'invalid unit'})
  }
  return res.json(data);
}

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      const input = req.query.input;
      const initNum = convertHandler.getNum(input);
      const initUnit = convertHandler.getUnit(input);
      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      const fullData = {
        initNum: initNum, 
        initUnit: initUnit, 
        returnNum: returnNum, 
        returnUnit: returnUnit, 
        string: toString
      }
      sendResponse(res, fullData);
    });
    
};
