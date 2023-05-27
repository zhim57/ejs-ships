require("dotenv").config();

module.exports = {
  makeEmail: function (data) {
    let to = $(this).data("remarks");
    let name = $(this).data("name");
    let imo = $(this).data("imo");

    let mailObject = {
      name: '"Jivko Atanassov" <zhim57@yahoo.com>',
      subject: name + "- sim cards",
      to: to,
      company: "Amicus Shipping LLC",
      email: "zhim57@yahoo.com",
      phone: "+19084720799",
      message: `<!DOCTYPE html>
      <html>

      <head>

      <meta http-equiv="content-type" content="text/html; charset=">
    </head>
  <body>
    <p>
      <meta http-equiv="content-type" content="text/html; charset=">
      We have 3UK Sim cards, <br>
      - free data roaming in 71 countries, <br>
      - available in several ports in USA including Newark.NJ<br>
      <br>
      our cards provide DATA , (voice calls can be done by whatsApp, FB messenger and other apps ) :<br>
      <br>
      1. self activating -3 UK - $20/ 10 GB Data/ 30 days duration,</p>
    <p>2. self activating- 3 UK - $25/ 12GB /30 days ,<br>
    </p>
    <p> 3. self activating- 3 UK - $45/ 12 GB Data/3 months duration.(If this one is used in UK at least once every <br>
      3 months, then the duration is up to 12 months.)
    </p>
    <p> 
      <br>
      In USA the 3 UK cards use the t-mobile 4G, AT&amp;T 4G and Verizon 4G network,<br>
      these are the 3 biggest networks in the country.</p>
    <p>Some phones may not have the 4G bands for USA, we can check by the imei number in advance.<br>
      <br>
    </p>
    <pre class="moz-signature" cols="72">-- 
  Thank you and Best regards
  Jivko Atanassov
    
  Amicus Shipping LLC 
  website: AmicusShippingLLC.com</pre>
  </body>
    </html>`,
    };

    // sendEmail (mailObject, (res) {
    //     req.flash("success_msg", "email sent successfully");
    //     console.log("emails sent");
    // });

    // updateMessageSent(imo, function (res) {
    //     console.log("status updated to- 'message sent'");
    // });
  },

  sendEmail: function (mailObject1, cb) {
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
          console.log("date now");

          console.log("Success: " + msg);
        } else {
          console.log("problem msg wrong , name: " + msg);
        }
      });
  },
};
