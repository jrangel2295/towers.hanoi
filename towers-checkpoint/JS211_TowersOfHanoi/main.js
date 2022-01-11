'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
function printStacks (){
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
 function movePiece(token, startStack, endStack){
  
 
  // pop out the last piece from the startStack
  startStack.pop(token); 
  
  // push that last piece to the endStack 
  endStack.push(token); 

  //if checkForWin function is true then log the message otherwise return false 
  if(checkForWin()){
    console.log('You won the game!'); 
  }else{
    return false; 
  }

}
function isLegal(startStack, endStack){
  
  // if either the start nor end stack are not strings then return false
  if(typeof startStack !== 'string' || typeof endStack !== 'string'){
    
    return false; 
  }

  //create a for..in loop to iterate over the properties in stacks object
  for(let key in stacks){

    //if the current key you're iterating over does not have an array value then console log the following statement and return false
    if(Array.isArray(stacks[key]) === false){
     console.log('Invalid Data. Each key is supposed to be an array.'); 
     return false; 
    }
  }


  // For white space and any case-sensitivities 
  startStack = startStack.toLowerCase().trim(); 
  endStack = endStack.toLowerCase().trim(); 

  //if the start or end stack input are strings 'a', 'b', and 'c', then log the message and return false
  if((startStack !== 'a' && startStack !== 'b' && startStack !== 'c') || (endStack !== 'a' && endStack !== 'b' && endStack !== 'c')){

    console.log('Must use the three stacks of Towers Of Hanoi which are A, B, and C.');
    return false; 
  }

  //reassign start and end stacks to be object; this will give access to the array values
  startStack = stacks[startStack]; 
  endStack = stacks[endStack]; 

  //startStack and endStack arrays at the last index will give access to whatever element is there and then store in these 2 variables 
  let lastTokenOfStartStack = startStack[startStack.length -1]; 
  let lastTokenOfEndStack = endStack[endStack.length -1];


  //If the endstack array is empty then automatically move piece and return true, otherwise if the last token removed from the start stack array is less than the last token in the end stack array then allow the move (return true), else return false and say illegal move. 
  
  if(endStack.length === 0){ 
    movePiece(lastTokenOfStartStack, startStack, endStack); 
    return true; 
  }else if(lastTokenOfStartStack < lastTokenOfEndStack){
    movePiece(lastTokenOfStartStack, startStack, endStack); 
    return true; 
  }else{
    return false; 
  } 

}

function checkForWin(){
  
  //create a for..in loop that will iterate over the properties of the object and check for a win 
  for(let key in stacks){
    //if the current key you're iterating over has an array value of [4, 3, 2 ,1] then return true
    if(stacks[key][0] === 4 && stacks[key][1] === 3 && stacks[key][2] === 2 && stacks[key][3] === 1){
      return true;  
    }
  }
  //if none of the keys you're iterating over have an array value of [4, 3, 2, 1] then return false 
  return false; 
}


function towersOfHanoi(startStack, endStack){

  //first check to see if the move is legal and if so return true otherwise print out 'illegal move' 
  if(isLegal(startStack, endStack)){
    return true;
  }else{
    console.log('illegal move');
  }
};

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

  describe('isLegal', function(){
    it('should only allow string arguments as the input parameters for isLegal function', function(){
      let actual = isLegal(4, null);
      let expected = false; 
      assert.equal(actual, expected); 
    });

    it('should verify that the value of each key in stacks object is an array',function(){
      stacks = {
        a: [4, 3, 2, 1],
        b: {},
        c: []
      }; 
      let actual = isLegal('a', 'b');
      let expected = false; 
      assert.equal(actual, expected); 
    });

    it('should properly handle uppercase letters with whitespace for the start and end stacks',function(){
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      let actual = isLegal('A   ', '  B');
      let expected = true; 
      assert.equal(actual, expected); 
    });

    it('should check to see that the player is only using A, B, and C as the start and end stack inputs', function(){
      let actual = isLegal('g', 'f');
      let expected = false; 
      assert.equal(actual, expected); 
    });

  });
} else {

  getPrompt();

}