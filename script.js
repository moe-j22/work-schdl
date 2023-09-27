$(function () {
  function createTimeBlocks() {
    // Get the current date and time using Day.js
    var currentDate = dayjs();
    var currentHour = currentDate.hour();

    // Clear existing content
    $(".container-fluid").empty();

    //create time blocks
    for (var hour = 9; hour <= 17; hour++) {
      var timeBlockDate = currentDate.hour(hour).minute(0).second(0);
      
      var timeBlock = $("<div>").addClass("row time-block");
      var timeLabel = $("<div>")
        .addClass("col-2 col-md-1 hour text-center py-3")
        .text(timeBlockDate.format("hA"));
      var textArea = $("<textarea>")
        .addClass("col-8 col-md-10 description")
        .attr("id", "hour-" + hour);

      //past, present, or future class
      if (timeBlockDate.isBefore(currentDate, "hour")) {
        textArea.addClass("past");
      } else if (timeBlockDate.isSame(currentDate, "hour")) {
        textArea.addClass("present");
      } else {
        textArea.addClass("future");
      }

      // Retrieve from local storage
      var savedEvent = localStorage.getItem("hour-" + hour);
      if (savedEvent) {
        textArea.val(savedEvent);
      }

      var saveButton = $("<button>")
        .addClass("btn saveBtn col-2 col-md-1")
        .attr("aria-label", "save")
        .html('<i class="fas fa-save" aria-hidden="true"></i>');

      // Append elements
      timeBlock.append(timeLabel, textArea, saveButton);

      // Append the time 
      $(".container-fluid").append(timeBlock);
    }
  }

  // Save event to local storage when the save button is clicked
  $(".container-fluid").on("click", ".saveBtn", function () {
    var hourId = $(this).siblings(".description").attr("id");
    var eventText = $(this).siblings(".description").val();
    localStorage.setItem(hourId, eventText);
  });

  //current date in the header
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

  createTimeBlocks();
});
