
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });



module.exports = function (mailObject1, cb) {
    let mailObject = {};

    mailObject = mailObject1;

    $.ajax("/send", {
      type: "POST",
      data: mailObject,
    })
      .then((response) => {
        let dudu = response;
        if (response === undefined) {
          console.log("problem with sending");
        }

        if (dudu != undefined) {
          console.log(" web api send email received ");
          cb(dudu);
        } else {
          console.log("bad response");
        }
      })
      .then(() => {
        console.log("now we can send emails");
        let msg = "todo";
        if (msg.length === 4) {
         

          console.log("Success: " + msg);
        } else {
          console.log("problem msg wrong , name: " + msg);
        }
      });
  };

