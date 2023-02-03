$// wrapped to ensure code isn't run until HTML is rendered
$(function () {
    // when save button is clicked, the element id and block description are saved to local storage
    $(".saveBtn").on("click", function () {
      var hour = $(this).parent().attr("id");
      var description = $(this).siblings(".description").val();
      localStorage.setItem(hour, description);
    });
  

    function checkTime() {
      var currentTime = parseInt(dayjs().format("H"));
      $(".time-block").each(function () {
        var timeElement = parseInt($(this).attr("id").split("hour-").pop());
        if (timeElement < currentTime) {
          $(this).removeClass("present");
          $(this).removeClass("future");
          $(this).addClass("past");
        } else if (timeElement > currentTime) {
          $(this).removeClass("past");
          $(this).removeClass("present");
          $(this).addClass("future");
        } else {
          $(this).removeClass("past");
          $(this).removeClass("future");
          $(this).addClass("present");
        }
      });
    }
  
    // retrieves local storage values and assigns them to the correct element using the element ID
    function retrieveBlockItem() {
      for (let hour = 9; hour <= 17; hour++) {
        const elID = "hour-" + [hour];
        var loopTime = localStorage.getItem(elID);
        $("#" + elID + " .description").val(loopTime);
      }
    }
    // displays current day to the page header
    $("#currentDay").text(dayjs().format("MMMM D, YYYY"));
    // function calls
    checkTime();
    retrieveBlockItem();
  });