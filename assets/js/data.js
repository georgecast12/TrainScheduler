// Initialize Firebase
var config = {
  apiKey: "AIzaSyCK1zdiF5MkkLddWo5ZEOD7URmGbdSKpNo",
  authDomain: "trainschedule-e7a21.firebaseapp.com",
  databaseURL: "https://trainschedule-e7a21.firebaseio.com",
  projectId: "trainschedule-e7a21",
  storageBucket: "trainschedule-e7a21.appspot.com",
  messagingSenderId: "60411451132"
};
firebase.initializeApp(config);

// Assign the reference to the database to a variable named 'database'
// var database = ...
var database = firebase.database();

// Button for adding traine routes
$("#addTrain").on("click", function(event) {
  event.preventDefault();

  //  Store input in variables
  var trainName = $("#nameInput")
    .val()
    .trim();
  var destination = $("#destinationInput")
    .val()
    .trim();
  var startTime = $("#timeInput");
  var frequency = $("#frequencyInput");
  var currentTime = moment().format("HH:mm");

  //   console.log(trainName);
  //   console.log(destination);
  //   console.log(startTime);
  //   console.log(frequecy);
  //   console.log(currentTime);

  //Upload all inputs to Firebase
  var newTrain = {
    TrainName: trainName,
    Destination: destination,
    StartTime: startTime,
    Frequency: frequency,
    CurrentTime: currentTime
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  //   //   Logs everything to console
  //   console.log(newTrain.TrainName);
  //   console.log(newTrain.Destination);
  //   console.log(newTrain.StartTime);
  //   console.log(newTrain.Frequency);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#nameInput").val("");
  $("#destination").val("");
  $("#timeInput").val("");
  $("#frequency").val("");

  // Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var name = childSnapshot.val().TrainName;
    var dest = childSnapshot.val().Destination;
    var freq = childSnapshot.val().Frequency;

    //set difference from now and the trains start time and convert into minutes
    var timeDifference = moment().diff(
      moment(childSnapshot.val().StartTime),
      "m"
    );
    // get remainder of difference when divided by frequency
    var timeRemainder = timeDifference % freq;

    //subtract frequency and timeRemainder to get minutes away
    var minutesAway = freq - timeRemainder;

    // add minutes away to current time and convert into "HH:mm"
    var nextArrrival = moment()
      .add(minutesAway, "m")
      .format("HH:mm");

    var current = moment().format("HH:mm");

    // Employee Info
    //   console.log(name);
    //   console.log(dest);
    console.log(timeDifference);
    console.log(timeRemainder);
    console.log(minutesAway);
    console.log(nextArrrival);
    console.log(current);

    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(name),
      $("<td>").text(dest),
      $("<td>").html(freq),
      $("<td>").text(nextArrrival),
      $("<td>").text(minutesAway)
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
});
