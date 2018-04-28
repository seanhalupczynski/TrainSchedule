// $("document").ready(function(){
  // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAOVzSpkU5SSWBeGtL_Cwb2l02E2HAhxbI",
        authDomain: "trainschedule-d1cfb.firebaseapp.com",
        databaseURL: "https://trainschedule-d1cfb.firebaseio.com",
        projectId: "trainschedule-d1cfb",
        storageBucket: "trainschedule-d1cfb.appspot.com",
        messagingSenderId: "289059445286"
    };
    
    firebase.initializeApp(config);

    var database = firebase.database();

    // Button to add a new train
    $("#add-new-train").on("click", function(event){
        event.preventDefault();

        // Sets variables based on user input
        var trainName = $("#new-train").val().trim();
        var destination = $("#new-destination").val().trim();
        var frequency = $("#frequency").val().trim();
        var timeStamp = moment();
        var submitTime = moment(timeStamp).format("hh:mm a");
        var nextTrain = moment(timeStamp).add(frequency, "minutes");
        var trainArrival = moment(nextTrain).format("hh:mm a");
        console.log(timeStamp);
        console.log(nextTrain);
    

        // Alert user if they forgot to enter a value
        if(trainName==""){
            alert("Please enter a train name.")
        };

        if(destination==""){
            alert("Please enter a destination.")
        };
        if(frequency==""){
            alert("Please enter a frequency.")
        };


        // Create object of train data
        var newTrain = {
            name : trainName,
            destination : destination,
            frequency : frequency,
            trainArrival : trainArrival,
            submitTime : submitTime
        };

        // Pushing train data to firebase database
        if(trainName!="" && destination!="" && frequency!=""){
        database.ref().push(newTrain);
        };

        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.frequency);
        console.log(newTrain.trainArrival);

        // Clearing text boxes after submitting data
        $("#new-train").val("");
        $("#new-destination").val("");
        $("#frequency").val("");

        // Modal to inform a new train has been added
        // $('#myModal').on('shown.bs.modal', function () {
        //     $('#myInput').focus()
        // })
    });

    database.ref().on("child_added", function(childSnapshot, prevChildKey){
        console.log(childSnapshot.val());

        var train = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var trainArrival = childSnapshot.val().trainArrival;
        var frequency = childSnapshot.val().frequency;
        console.log(train);
        console.log(destination);
        console.log(frequency);
        console.log(trainArrival);

        // Difference between trains
        var diffTime = moment().diff(moment(trainArrival), "minutes");
        console.log(diffTime);

        // Time of trains apart
        var apartTime = diffTime % frequency;

        // Minutes till the next train
        var minsToNextTrain = frequency - apartTime;

        // Next Arrival Time
        // var nextArrival = moment().add(frequency, "minutes");
        // var nextArrivalPretty = moment(nextArrival).format("hh:mm a");
        
        // Next Departure Time
        // var nextDeparture = moment(trainArrival).add(10, "minutes");
        // console.log(nextDeparture)
        var nextDeparturePretty = moment(trainArrival).add(10, "minutes").format("hh:mm a");
        console.log(nextDeparturePretty)

        // Add the train data into the table
        $("#train-table > tbody").append("<tr><td>" + train + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" +
            trainArrival + "</td><td>" + minsToNextTrain + "</td><td>" + nextDeparturePretty + "</td>");


    })


// });