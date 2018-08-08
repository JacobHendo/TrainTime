$( document ).ready(function() {
    //configure and initialize
    var config = {
        apiKey: "AIzaSyCCLj2AiVrjAmmJZxYY4GwR_wYwVz2cS1Y",
        authDomain: "train-time-sheet-6ee7b.firebaseapp.com",
        databaseURL: "https://train-time-sheet-6ee7b.firebaseio.com",
        projectId: "train-time-sheet-6ee7b",
        storageBucket: "train-time-sheet-6ee7b.appspot.com",
        messagingSenderId: "834368727827"
      };
      firebase.initializeApp(config);
      var database = firebase.database();
     
    //onclick for submit button
      $("#add-train").on("click", function(event) {

        event.preventDefault();
        console.log("submit has been clicked");
    //get user data from form
        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var firstTime = moment($("#firstTime").val().trim(), "HH:mm").format("X")
        var frequency = $("#frequency").val().trim();
        
        var trainDoc = {
            trainName: trainName,
            destination: destination,
            firstTime: firstTime,
            frequency: frequency
        };
        console.log("here is the traindoc " +  JSON.stringify(trainDoc));
        database.ref().push(trainDoc);
        //empty input values
        $("#trainName").val("");
        $("#destination").val("");
        $("#firstTime").val("");
        $("#frequency").val("");
          //end of on click
      });
    database.ref().on("child_added", function(childSnapshot) {
        var trainName = childSnapshot.val().trainName;
        var destination = childSnapshot.val().destination;
        var firstTime = childSnapshot.val().firstTime;
        var frequency = parseInt(childSnapshot.val().frequency);
        console.log(trainName);       
//  firstTime conv
  var theTime = moment(firstTime, "HH:mm").subtract(1, "years");
  //current time
  var current = moment();
  //current time to hero
  var actualTime = moment(current).format("HH:mm");
  $("#actualTime").text("Current Time: " + actualTime);
    //perform js logic on user data to fill out the table
    // with next arrival and minutes til
    var timeDiff = moment().diff(moment(theTime), "minutes");
    var timeLeft = timeDiff % frequency;
    var eta = frequency - timeLeft;
    var nextArrive = moment().add(eta, "minutes").format("HH:mm");
  // make new row
  var nextRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency + " minutes"),
    $("<td>").text(nextArrive),
    $("<td>").text(eta + " minutes"),
  );

  $("#theLastRow").append(nextRow);

})
});


