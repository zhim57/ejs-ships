var emailSendAudio = new Audio("../assets/sound/ringtone.mp3");
let types = [];
let vesselTypeAndSizes = [];
let vesselsCleaned = [];


$(document).ready(function () {
  $("#dataTable").DataTable( {
    "pageLength": 500,
        scrollY: 400,
        "order": [[ 0, 'desc' ], [ 1, 'asc' ]],
      })


 

  $(".sendMail").on("click", function (event) {
    emailSendAudio.play();
  });

 
});
