/*
 * Every item in trialArray represents a single trial
 * trialArray properties include any information needed to present the stim and
 * any trial information needed for data analysis
 */


//////////////// Stim & Trial Array Creation //////////////////////////////////

/* Set the colors for the task.
 * You can change the number of colors used and all the functions will run properly.
 * The block sizes however, will change according to the number of incongruent combinations
 */

colors = ["red", "blue", "green", "yellow"];

/* creates arrays of the congruent and incongruent color-word combinations */
conSet = [];
incSet = [];
colorLength = (colors.length - 1);
for (n = 0; n <= colorLength; n++) {
    for (m = 0; m <= colorLength; m++) {
        if (colors[n] == colors[m]) {
            conSet.push([colors[n], colors[m], "congruent"]);
        } else {
            incSet.push([colors[n], colors[m], "incongruent"]);
        }
    }
}

/* Multiply the congruent set to have an equal number of items as the incongruent set
 * and move to the allStim variable */
conSet = multiplyArray(conSet, (incSet.length / conSet.length));


/* add inc items to allStim variable */
allStim = [];
allStim = allStim.concat(incSet, conSet);

/* Creates the trial array
 * Each block is 24 trials and the nblocks = number of blocks
 * Each trial is stored in an array with the accompanying properties
 * e.g., trialArray[25].color refers to the 26th trial color
 */
trialArray = [];
for (nblocks = 0; nblocks <= 0; nblocks++) {
    block = [];
    for (n = 0; n <= allStim.length - 1; n++) {
        block[n] = {
            color: allStim[n][0],
            word: allStim[n][1],
            cResponse: allStim[n][0][0],
            congruency: allStim[n][2]
        };
    }
    shuffle(block);
    trialArray = trialArray.concat(block);
}

//////////////////////////////////////////////////////////////////////


////////////// Trial Events ////////////////////////////////////////////

/* set trial intervals in milliseconds */
var blankLength = 250;
var fixateLength = 1000;
var feedbackLength = 1000;

/* initialize necessary variables */
var response; /* temporary response container */
var accuracy; /* temporary accuracy container */
var data = [
    []
]; /* empty data array */
var trialCount = 0; /* trial counter / keeps track of which trial the subject is on */
var keytest = 0; /* enables and disables keypress effects / only allows responses when keytest == 1 */
var subject = new Date().getTime(); /* creates timestamp for unique subject identifier */
var conRTs = []; /* keep track of correct congruent RTs */
var incRTs = []; /* keep track of correct incongruent RTs */

/* trial events in chronological order */

/* 1. blank screen */
function blank() {
    keytest = 0; /* disable keypresses */
    $(".targetDisplay").hide(); /* hide display */
    $(".feedbackDisplay").hide();

    /* run function fixate after "blankLength" milliseconds */
    setTimeout(fixate, blankLength);
}

/* 2. fixation */
function fixate() {

    /* display fixation cross */
    $(".targetDisplay").hide();
    $(".targetDisplay").html("+");
    $(".targetDisplay").css("color", "black");
    $(".targetDisplay").show();

    /* run function blank2 after "fixateLength" milliseconds */
    setTimeout(blank2, fixateLength);
}

/* 3. blank screen */
function blank2() {
    $(".targetDisplay").hide(); /* hide display */

    /* run function blank2 after "blankLength" milliseconds */
    setTimeout(trial, blankLength);
}

/* 4. stim presentation / present until response */
function trial() {
    /* allow responses */
    keytest = 1;

    /* update counter display */
    $(".countDisplay").html((trialCount + 1) + " /" + trialArray.length + " trials");

    /* present target stim */
    $(".targetDisplay").hide();
    $(".targetDisplay").html(trialArray[trialCount].word); /* display word */
    $(".targetDisplay").css("color", trialArray[trialCount].color); /* change color of word */
    $(".targetDisplay").show();

    /* get timestamp for stim presentation */
    time1 = new Date().getTime();
}

/* collect response on keypress / ends trial / only when keytest == 1 */
$(document).keypress(function(event) {

    if (keytest == 1) {

        keytest = 0; /* disable keypresses */
        time2 = new Date().getTime(); /* get timestamp for response */

        /* collect response / force to lower case */
        response = String.fromCharCode(event.which);
        response = response.toLowerCase();

        /* determine accuracy */
        if (response == trialArray[trialCount].cResponse) {
            accuracy = 1;
        } else {
            accuracy = 0;
        }

        /* run data collection function that adds trial info to data array */
        dataCollection();

        /* display feedback */
        $(".targetDisplay").hide();
        $('.targetDisplay').css("color", "black");

        if (response == trialArray[trialCount].cResponse) {
            /* When response is correct... */
            $('.feedbackDisplay').html("correct");
            $(".feedbackDisplay").show();

            /* if response was correct and < 2000 ms, then add RT to the average */
            if (time2 - time1 < 2000) {
                if (trialArray[trialCount].congruency == "congruent") {
                    conRTs.push(
                        time2 - time1
                    );
                } else(
                    incRTs.push(
                        time2 - time1
                    )
                );
            }
        } else {
            /* when response is incorrect... */
            $('.feedbackDisplay').html("incorrect");
            $(".feedbackDisplay").show();
        }

        /* continue to next trial if trialCount < total number of trials, otherwise go to exit page */
        if (trialCount != trialArray.length - 1) {
            trialCount++; /* increase trial counter by one */
            /* automatically starts next trial / run function blank after "feedbackLength" milliseconds */
            setTimeout(blank, feedbackLength);
        } else {
            /* END OF EXPERIMENT */
            /* calculat the average response time from each condition */
            var conAVG = calcAVG(conRTs).toFixed();
            var incAVG = calcAVG(incRTs).toFixed();

            /* hide all other displays */
            $(".targetDisplay").hide();
            $(".feedbackDisplay").hide();
            $(".top").hide();

            /* insert the results into each result div and show exitDisplay */
            $(".results-1").html("<strong>Congruent trials:</strong> <br /> Average response time = " + conAVG + " ms <br />" + "Accuracy = " + ((conRTs.length / conSet.length) * 100).toFixed() + " %");
            $(".results-2").html("<strong>Incongruent trials:</strong> <br /> Average response time =  " + incAVG + " ms <br />" + "Accuracy = " + ((incRTs.length / incSet.length) * 100).toFixed() + " %");
            $(".results-3").html("<strong>Your stroop effect was </strong>" + (incAVG - conAVG) + " ms");
            $(".exitDisplay").show();

        }


    }
});

////////////// Set up initial display & button functions //////////////////////////////////////
/* These functions need to run after document has loaded
* So you must run this function in the header using document.ready or in the body of html (where it is now)
*/
function initiateDisplay() {
    /* initial display */
    $(".targetDisplay").hide();
    $(".top").hide();
    $(".exitDisplay").hide();
    $(".fixateDisplay").hide();
    $(".instructionDisplay").show();

    /* button functions */

    /* end instructions and begin experiment */
    $("#beginExp").click(function() {
        $(".instructionDisplay").hide();
        $(".countDisplay").html(trialCount + " / " + trialArray.length + " trials");
        $(".top").show();
        blank();
    });

    /* download data file */
    $("#downloadCSV").click(function() {
        /* adds header row to beginning of array and saves csv file */
        data.unshift(["subject", "trial", "word", "color", "correct-response", "congruency", "reaction-time", "response", "accuracy"]);
        exportToCsv('stroop - ' + subject + '.csv', data);
    });


    /* Disable the backspace key / can add other keys if necessary */
    $(function() {
        /*
         * this swallows backspace keys on any non-input element.
         * stops backspace -> back
         */
        var rx = /INPUT|SELECT|TEXTAREA/i;

        $(document).bind("keydown keypress", function(e) {
            if (e.which == 8) { // 8 == backspace
                if (!rx.test(e.target.tagName) || e.target.disabled || e.target.readOnly) {
                    e.preventDefault();
                }
            }
        });
    });
}

/////////////////// Generic Functions /////////////////////////////////

/* compute average of array */
function calcAVG(array) {
    var total = 0;
    for (var i = 0; i < array.length; i++) {
        total += array[i];
    }
    var avg = total / array.length;
    return (avg);
}



/* shuffle an array */
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

/* multiply an array */

//copies the array and stacks them into a single array
function multiplyArray(input, ntimes) {
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

/* Data Collection / generic function that puts all the trial information into data array*/
/* Must have variables: subject, trialCount, trialArray, time1, time2, response, and accuracy
/*
e.g.,
data [
  subject identifier,
  trial number,
  ...
  all trialArray properties,
  ...
  reaction time (time2-time1),
  response,
  accuracy
]
*/

function dataCollection() {
    /* creates new row in data array for current trial that includes subject identifier and trial number */
    data[trialCount] = [subject, (trialCount + 1)];

    /* loops through object properties and pushes all property values into data array */
    for (var propName in trialArray[trialCount]) {
        data[trialCount].push(trialArray[trialCount][propName]);
    }

    /* pushes the time stamps and response into data array */
    data[trialCount].push(
        time2 - time1,
        response,
        accuracy
    );
}



/* save array as csv file */
function exportToCsv(filename, rows) {
    var processRow = function(row) {
        var finalVal = '';
        for (var j = 0; j < row.length; j++) {
            var innerValue = row[j] === null ? '' : row[j].toString();
            if (row[j] instanceof Date) {
                innerValue = row[j].toLocaleString();
            }
            var result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0)
                result = '"' + result + '"';
            if (j > 0)
                finalVal += ',';
            finalVal += result;
        }
        return finalVal + '\n';
    };

    var csvFile = '';
    for (var i = 0; i < rows.length; i++) {
        csvFile += processRow(rows[i]);
    }

    var blob = new Blob([csvFile], {
        type: 'text/csv;charset=utf-8;'
    });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}


/* Example:

exportToCsv('export.csv', [
	['name','description'],
  ['david','123'],
  ['jona','""'],
  ['a','b'],
]);

*/
