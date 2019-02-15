/*
*
*
*       Complete the handler logic below
*       
*       
*/

function multiply(a, b, pre = 5) {
  const factor = Math.pow(10, pre)
  const mult = a * b * factor
  const round = Math.trunc(mult) / factor;
  return round;
}

function divide(a, b, pre = 5) {
  const factor = Math.pow(10, pre)
  const div = (a * factor)/ (b * factor)
  const round = Math.trunc(div * factor) / factor;
  return round;
}

function stringToNum(input) {
  const [numeratorStr, denominatorStr, other] = input.split('/');
  if(other != undefined) return null;
  var numerator = parseFloat(numeratorStr);
  var denominator = parseFloat(denominatorStr);
  numerator = !isNaN(numerator)? numerator : null;
  denominator = !isNaN(denominator)? denominator : 1;
  if(numerator == null || denominator == null) {
    return null;
  }
  return divide(numerator, denominator);
}

function splitInput(input) {
  const split = input.split(/(?=[A-Za-z])/);
  var initNum = split.shift();
  var initUnit = split.join('');
  var num = stringToNum(initNum)
  if(num == null && initNum.match(/[^a-z^A-Z]/) == null) {
    initUnit = initNum + initUnit;
  }
  return [num, initUnit];
}

function ConvertHandler() {
  
  this.getNum = (input) => (splitInput(input)[0]);
  
  this.getUnit = (input) => {
    const unit = splitInput(input)[1]
    const retUnit = this.getReturnUnit(unit)
    if(retUnit == null) return null;
    return unit;
  }
  
  this.getReturnUnit = function(initUnit) {
    if(initUnit==null) return null;
    return {
      'gal': 'l', 'l': 'gal',
      'mi': 'km', 'km': 'mi',
      'lbs': 'kg', 'kg': 'lbs'
    }[initUnit.toLowerCase()] || null;
  };

  this.spellOutUnit = function(unit) {
    if(unit==null) return null;
    switch(unit.toLowerCase()) {
      case 'gal': return 'gallons';
      case 'lbs': return 'pounds';
      case 'mi': return 'miles';
      case 'l': return 'liters';
      case 'kg': return 'kilograms'
      case 'km': return 'kilometers';
      default: return null;
    }
  };

  this.convert = function(initNum, initUnit) {
    if(initNum==null|| initUnit==null) return null;
    const factor = {
      'gal': 3.78541, 'l': 0.264172,
      'lbs': 0.453592, 'kg': 2.20462,
      'mi': 1.60934, 'km': 0.621371
    }[initUnit.toLowerCase()]
    return multiply(initNum,factor);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const spelledInitOutUnit = this.spellOutUnit(initUnit);
    const spelledReturnUnit = this.spellOutUnit(returnUnit);
    return `${initNum} ${spelledInitOutUnit} converts to ${returnNum} ${spelledReturnUnit}`;
  };
  
}

module.exports = ConvertHandler;
