   // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAxQFDMWH5baazrwQM3_Uq5DhFunPw7Was",
    authDomain: "train-activity-9553d.firebaseapp.com",
    databaseURL: "https://train-activity-9553d.firebaseio.com",
    projectId: "train-activity-9553d",
    storageBucket: "train-activity-9553d.appspot.com",
    messagingSenderId: "624156453774"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var frequency = "";
  var nextArrival = "";
  var minutesAway = "";


  $("#submit").on("click", function(event) {
      // Don't refresh the page!
      event.preventDefault();

      trainName = $("#train-name").val().trim();
      destination = $("#destination").val().trim();
      frequency = $("#frequency").val().trim();
      // monthlyRate = $("#monthly-rate").val().trim();

      console.log(trainName);

      database.ref().push({
          trainName: trainName,
          destination: destination,
          frequency: frequency,
          // monthlyRate: monthlyRate
      });

      $("#train-name-display").text(trainName);
      $("#destination-display").text(destination);
      $("#frequency-display").text(frequency);
      // $("#monthly-rate-display").text(monthlyRate);

      var todayDate = new Date();

  });

  database.ref().on("child_added", function(snapshot) {
      var user = snapshot.val();
      var startTime = user.startTime;
      var timeFormat = "HH:mm";
      var convertedTime = moment(startTime, timeFormat);
      console.log(convertedTime)
      var timeDiff = moment().diff(convertedTime, "month")
      var totalBill = timeDiff * user.monthlyRate;
      var row = $("<tr>")
      var td1 = $("<td>")
      var td2 = $("<td>")
      var td3 = $("<td>")
      var td4 = $("<td>")
      var td5 = $("<td>")
      // var td6 = $("<td>")
      td1.append(user.trainName)
      console.log(user.trainName);
      td2.append(user.destination)
      console.log(user.destination);
      td3.append(user.frequency)
      console.log(user.frequency);
      td4.append(timeDiff)
      td5.append(user.monthlyRate)
      // td6.append("$" + totalBill)
      row.append(td1)
      row.append(td2)
      row.append(td3)
      row.append(td4)
      row.append(td5)
      // row.append(td6)
      $("#tBody").append(row)

      // $("#employee-name-display").text(user.employeeName);
      // $("#role-display").text(user.role);
      // $("#start-date-display").text(user.startDate);
      // $("#monthly-rate-display").text(user.monthlyRate);
  }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
  });



  // button id = submit
  //