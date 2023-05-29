
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
var request = require('request');


module.exports = function (mailObject1,cb) {
    let mailObject = {};

    mailObject = mailObject1;



    request.post('/send',  mailObject , function (error, response, body) {
            if (!error && response.statusCode == 201) {
                console.log(body);
                cb("now we can send emails");
            }
        });
      }; 