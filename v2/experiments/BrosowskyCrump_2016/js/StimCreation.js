// There are three possible locations in html "Up", "Down" and "Center"
loc = ["Center"];
//loc = shuffle(loc);


colors = ["red", "blue", "green", "yellow"];
colors = shuffle(colors);
words = colors[1];


//creates training trial array (all words are the same)

trialarray = [];
conArray = [];
incArray = [];
con = [];
for (m = 0; m <=3; m++){
for (i = 0; i <= 1; i++) {
  for (n = 0; n <= 0; n++) {
    if (colors[i] == colors[n]) {
      con = "Con";
      conArray.push([colors[i], colors[n], colors[i][0], colors[n][0], con, loc[0], "Extinction2A","Training"]);
    } else {
      con = "Inc";
      incArray.push([colors[i], colors[n], colors[i][0], colors[n][0], con, loc[0],"Extinction2A","Training"]);
    }
      }
}
}

//conArray = multiplytrials(conArray,3);
// one block = 8 trials
oneBlock = conArray.concat(incArray);
shuffle(oneBlock);
for (i = 1; i <= 12; i++){
  trialarray = trialarray.concat(shuffle(oneBlock));
}


var totTrials = trialarray.length;
var UTrials = trialarray.length;


//creates test trial array (mix of word trials)

trialarray2 = [];
conArray = [];
incArray = [];
con = [];
for (m = 0; m <=1; m++){
for (i = 0; i <= 1; i++) {
  for (n = 0; n <= 0; n++) {
    if (colors[i] == colors[n]) {
      con = "Con";
      conArray.push([colors[i], colors[i], colors[i][0], colors[i][0], "neutral", loc[0], "Extinction2A","Test"]);
    } else {
      con = "Inc";
      incArray.push([colors[i], colors[n], colors[i][0], colors[n][0], "neutral", loc[0],"Extinction2A","Test"]);
    }
      }
}
}

for (m = 0; m <=1; m++){
for (i = 0; i <= 1; i++) {
  for (n = 0; n <= 0; n++) {
    if (colors[i] == colors[n]) {
      con = "Con";
      conArray.push([colors[i], "xxxx", colors[i][0], "xxxx", "neutral", loc[0], "Extinction2A","Test"]);
    } else {
      con = "Inc";
      incArray.push([colors[i], "xxxx", colors[i][0], "xxxx", "neutral", loc[0],"Extinction2A","Test"]);
    }
      }
}
}

//conArray = multiplytrials(conArray,3);
// one block = 8 trials
oneBlock = conArray.concat(incArray);
shuffle(oneBlock);
for (i = 1; i <= 12; i++){
  trialarray2 = trialarray2.concat(shuffle(oneBlock));
}

trialarray = trialarray.concat(trialarray2)
var totTrials = trialarray.length;
var UTrials = trialarray.length;

///////functions//////////
//returns only unique items in array
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
// usage example:
//var a = ['a', 1, 'a', 2, '1'];
//var unique = a.filter( onlyUnique );


//create stims for each group
function createStim(stimGroup, stimLoc, letters) {
  y = [];
  z = [];
  for (i = 0; i < stimGroup[0]; i++) {
    x = [letters[i], stimLoc[0], stimGroup[0]];
    y.push(x);
    x = [letters[i], stimLoc[1], stimGroup[0]];
    y.push(x);
  }


  for (i = stimGroup[0]; i < stimGroup[0] + stimGroup[2]; i++) {
    x = [letters[i], stimLoc[2], stimGroup[2]];
    z.push(x);
  }



  y = multiplytrials(y, ((totTrials / 3) / (y.length / 2)));
  z = multiplytrials(z, ((totTrials / 3) / (z.length)));

  temp = y.concat(z);
  return temp;

}

//copies the array and stacks them into a single array
function multiplytrials(input, ntimes) {
  var temparray = new Array(new Array(''));
  iii = -1;
  for (i = 0; i <= ntimes - 1; i++) {
    for (ii = 0; ii <= input.length - 1; ii++) {
      iii++;
      temparray[iii] = input[ii].concat();
    }
  }
  return temparray;
}


function randomizearray(t) {
  var tt = t;
  var n = 0;
  var a = "";
  var b = "";
  var i = 0;
  for (i = 0; i <= t.length - 1; i++) {
    n = Math.floor(Math.random() * t.length);
    a = tt[i];
    b = tt[n];
    tt[i] = b;
    tt[n] = a;
  }
  return tt;
}


function copy2darray(input) {
  var temp = [''];
  for (var x in input) {
    temp[x] = input[x].concat();
  }
  return temp;
}

function extend2darray() {
  var temp = [''];
  var c = -1;
  for (i = 0; i < arguments.length; i++) {
    for (var x in arguments[i]) {
      c++;
      temp[c] = arguments[i][x].concat();
    }
  }
  return temp;
}

// calculates n!/(n-r)! = all combinations where order matters
function combo_order(n, r) {
  num = n;
  den = n - r;
  y = n - 1;
  x = (n - r) - 1;
  for (i = y; i > 0; i--) {
    num *= i;
  }
  for (m = x; m > 0; m--) {
    den *= m;
  }
  return (num / den);
}

// choose random number from 1 to length of array
function choose_random(x) {
  var rand = Math.floor(Math.random() * x.length);
  return rand;
}

//use to randomize array order
function shuffle(array) {
  var tmp, current, top = array.length;

  if (top)
    while (--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }

  return array;
}
