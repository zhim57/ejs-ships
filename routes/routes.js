const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const express = require("express");
const router = express.Router();
const flash = require("connect-flash");
const nodemailer = require("nodemailer");
const createEmail = require("../lib/createemail.js");
const Db_ship = require("../models/db_ship.js");
const Db_ship_big = require("../models/db_ship_big.js");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.SECRET, {
  pbkdf2Iterations: Number(process.env.PBKDF2),
  saltLength: Number(process.env.SALT),
});

// GET ROUTES start here
router.get("/", (req, res) => {
  let searchQuery = { mysql_id:{ $gte: 500, $lte:600 } };

  Db_ship.find(searchQuery) //{"date": {$slice:14}
    .then((ships) => {
      ships.slice(0,200).forEach((ship) => {
        ship.remarks = cryptr.decrypt(ship.remarks);
      });

      req.flash(
        "success_msg",
        "All went well, " + ships.length + " ships fetched"
      );
      res.render("index", { ships: ships });
    })
    .catch((err) => {
      req.flash("error_msg", "ERROR: " + err);
      res.redirect("/");
    });
});
router.get("/vessel", (req, res) => {
  let searchQuery = { name: new RegExp(req.query.name, "i") };
  Db_ship.find(searchQuery)
    .then((ships) => {
      ships.forEach((ship) => {
        ship.remarks = cryptr.decrypt(ship.remarks);
      });
      req.flash(
        "success_msg",
        "All went well, " + ships.length + " ships fetched"
      );
      res.render("index", { ships: ships });
    })
    .catch((err) => {
      req.flash("error_msg", "ERROR: " + err);
      res.redirect("/");
    });
});
router.get("/clean", (req, res) => {
  for (let i = 1010; i < 1011; i++) {
    let searchQuery = { mysql_id: i };
    Db_ship.find(searchQuery)
      .then((ships) => {
        ships.slice(1, 4).forEach((ship) => {
          let name = ship.name;
          let searchQuery = { _id: ship._id };

          Db_ship.deleteOne(searchQuery)
            .then((ship) => {
              console.log("deleted from db" + name);
            })
            .catch((err) => {
              console.log("deleted from db- error" + err);
            });
        });
        req.flash(
          "success_msg",
          "All went well, " + ships.length + " ships fetched"
        );
        // res.render("index", { ships: ships });
      })
      .catch((err) => {
        req.flash("error_msg", "ERROR: " + err);
        // res.redirect("/");
      });
  }
});
router.get("/edit/:id", (req, res) => {
  console.log(req.params.id);
  id = req.params.id;
  let searchQuery = { _id: id };

  Db_ship.find(searchQuery)
    .then((ship) => {
      ship[0].remarks = cryptr.decrypt(ship[0].remarks);
      res.render("edit", { ship: ship[0] });
    })
    .catch((err) => {
      req.flash("error_msg", "ERROR: " + err);
      res.redirect("/");
    });
});
router.get("/details/:id", (req, res) => {
  id = req.params.id;
  let searchQuery1;
  let others = [];
  let ship = {};

  let searchQuery = { _id: id };
  Db_ship.find(searchQuery)
    .then((ship1) => {
      searchQuery1 = { operator: ship1[0].operator };
      ship1[0].remarks = cryptr.decrypt(ship1[0].remarks);
      ship = ship1[0];

      Db_ship.find(searchQuery1).then((others1) => {
        others1.slice(0, 20).forEach((other) => {
          other.remarks = cryptr.decrypt(other.remarks);
          others.push(other);
        });

        res.render("details", { data: { ship: ship, others: others } });
      });
    })

    .catch((err) => {
      req.flash("error_msg", "ERROR: " + err);
      res.redirect("/");
    });
});
router.get("/sendmail/:id", (req, res) => {
  id = req.params.id;
  let msg = "";
  // let searchQuery1;
  let searchQuery = { _id: id };
  Db_ship.find(searchQuery)
    .then((ship1) => {
      ship1[0].remarks = cryptr.decrypt(ship1[0].remarks);
      let data = { id: ship1[0].id, to: ship1[0].remarks, name: ship1[0].name };

      createEmail(data, (cb) => {
        if (cb) {
          let mailObject = cb;
          let to = mailObject.to;
          let id = mailObject.id;
          const output = `<p>${mailObject.message}</p>`;

          // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport({
            host: "smtp.mail.yahoo.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: process.env.NODEMAILER_USER, // generated ethereal user
              pass: process.env.NODEMAILER_PASSWORD, // generated ethereal password
            },
            tls: {
              rejectUnauthorized: false,
            },
          });

          let mailOptions = {
            from: mailObject.name, // sender address
            id: mailObject.id, // sender address

            to: mailObject.to, // list of receivers
            subject: mailObject.subject, // Subject line
            text: mailObject.text, // plain text body
            html: output, // html body,
            attachments: mailObject.attachments,
          };

          // send mail with defined transport object
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL1: %s", info.accepted);

            function update(data1) {
              console.log(data1.id);
              let id = data1.id;
              let o_sent1 = data1.sent;
              let searchQuery = { _id: id };

              Db_ship.updateOne(searchQuery, {
                $set: { o_sent: o_sent1 },
              })
                .then((vessel) => {
                  console.log("o_sent set successfully");
                })
                .catch((err) => {
                  req.flash("error_msg", "ERROR: " + err);
                });
            }
            function addZero(i) {
              if (i < 10) {
                i = "0" + i;
              }
              return i;
            }

            const d = new Date();
            let h = addZero(d.getHours());
            let m = addZero(d.getMinutes());
            let s = addZero(d.getSeconds());
            let dateJa = h + ":" + m + ":" + s;

            msg = dateJa + " email to " + to + " - sent";

            let mo = addZero(d.getMonth() + 1);
            let da = addZero(d.getDate());
            let ye = d.getFullYear();
            let dateSent = mo + "/" + da + "/" + ye;

            let data1 = {};
            data1.id = id;
            data1.sent = dateSent;

            update(data1);
            req.flash("success_msg", " " + msg);
            res.redirect("/details/" + id);
          });
        }
      });
    })
    .catch((err) => {
      req.flash("error_msg", "ERROR: " + err);
      res.redirect("/");
    });
});

// GET  ROUTES end  here

// POST ROUTES start here
router.post("/api/filUpTheDateBaseShips/", (req, res) => {
  let newObj = {
    date: "date of update",
    Tonnage: req.body.Tonnage,
    arrCountry: req.body.arrCountry,
    arrPort: req.body.arrPort,
    beneficialOwnerId: req.body.beneficialOwnerId,
    beneficialOwnerName: req.body.beneficialOwnerName,
    bestContactId: req.body.bestContactId,
    bestContactName: req.body.bestContactName,
    buildYear: req.body.buildYear,
    callSign: req.body.callSign,
    ch_message: req.body.ch_message,
    commercialOperatorId: req.body.commercialOperatorId,
    commercialOperatorName: req.body.commercialOperatorName,
    country: req.body.country,
    eta: req.body.eta,
    ex_name: req.body.ex_name,
    mysql_id: req.body.id,
    imo: req.body.imo,
    ismManagerId: req.body.ismManagerId,
    ismManagerName: req.body.ismManagerName,
    mmsi: req.body.mmsi,
    mt_id: req.body.mt_id,
    name: req.body.name,
    nominalOwnerId: req.body.nominalOwnerId,
    nominalOwnerName: req.body.nominalOwnerName,
    o_accepted: req.body.o_accepted,
    o_sent: req.body.o_sent,
    oneCode: req.body.oneCode,
    sciCode: req.body.sciCode,
    operator: req.body.operator,
    registeredOwnerId: req.body.registeredOwnerId,
    registeredOwnerName: req.body.registeredOwnerName,
    remarks: cryptr.encrypt(req.body.remarks),
    technicalManagerId: req.body.technicalManagerId,
    technicalManagerName: req.body.technicalManagerName,
    thirdPartyOperatorId: req.body.thirdPartyOperatorId,
    thirdPartyOperatorName: req.body.thirdPartyOperatorName,
    v_description: req.body.v_description,
    v_type: req.body.v_type,
    vesselFlag: req.body.vesselFlag,
    vessel_id: req.body.vessel_id,
    vrp_plan: req.body.vrp_plan,
    etaUpdated: "not",
  };

  Db_ship.create(newObj)
    .then((db_ship) => {
      // req.flash('success_msg', 'navigational data added to database successfully.')
      res.redirect("/");
      console.log("added to DB");
    })
    .catch((err) => {
      // req.flash('error_msg', 'ERROR: '+err)
      res.redirect("/");
    });
});


// POST ROUTES end here

//put routes starts here
router.put("/edit/:id", (req, res) => {
  let searchQuery = { _id: req.params.id };

  Db_ship.updateOne(searchQuery, {
    $set: {
      remarks: cryptr.encrypt(req.body.remarks),
      v_type: req.body.v_type,
      name: req.body.name,
      operator: req.body.operator,
     

    },
  })
    .then((vessel) => {
      req.flash("success_msg", "Vessels email address updated successfully.");
      res.redirect("/");
    })
    .catch((err) => {
      req.flash("error_msg", "ERROR: " + err);
      res.redirect("/");
    });
});
router.put("/updatefrombig/:imo", (req, res) => {
  let searchQuery1 = { imo: req.params.imo };

  Db_ship_big.find(searchQuery1)
    .then((vessel1) => {

      if (vessel1 ){

        let vessel=vessel1[0];
   
         console.log(vessel.v_type);
         let updateObject = {
           date: vessel.date,
           beneficialOwnerId: vessel.beneficialOwnerId,
           beneficialOwnerName: vessel.beneficialOwnerName,
           bestContactId: vessel.bestContactId,
           bestContactName: vessel.bestContactName,
           callSign: vessel.callSign,
           commercialOperatorId: vessel.commercialOperatorId,
           commercialOperatorName: vessel.commercialOperatorName,
           ismManagerId: vessel.ismManagerId,
           ismManagerName: vessel.ismManagerName,
           name: vessel.name,
           imo: vessel.imo,
           nominalOwnerId: vessel.nominalOwnerId,
           nominalOwnerName: vessel.nominalOwnerName,
           operator: vessel.ismManagername,
           registeredOwnerId: vessel.registeredOwnerId,
           registeredOwnerName: vessel.registeredOwnerName,
           technicalManagerId: vessel.technicalManagerId,
           technicalManagerName: vessel.technicalManagerName,
           thirdPartyOperatorId: vessel.thirdPartyOperatorId,
           thirdPartyOperatorName: vessel.thirdPartyOperatorName,
           v_description: vessel.v_description,
           v_type: vessel.v_type,
           vesselFlag: vessel.vesselFlag,
         };
   
         let searchQuery = { imo: vessel.imo };
   
         Db_ship.updateOne(searchQuery, {
           $set: {
             date: vessel.date,
             beneficialOwnerId: vessel.beneficialOwnerId,
             beneficialOwnerName: vessel.beneficialOwnerName,
             bestContactId: vessel.bestContactId,
             bestContactName: vessel.bestContactName,
             callSign: vessel.callSign,
             commercialOperatorId: vessel.commercialOperatorId,
             commercialOperatorName: vessel.commercialOperatorName,
             ismManagerId: vessel.ismManagerId,
             ismManagerName: vessel.ismManagerName,
             name: vessel.name,
             imo: vessel.imo,
             nominalOwnerId: vessel.nominalOwnerId,
             nominalOwnerName: vessel.nominalOwnerName,
             operator: vessel.ismManagername,
             registeredOwnerId: vessel.registeredOwnerId,
             registeredOwnerName: vessel.registeredOwnerName,
             technicalManagerId: vessel.technicalManagerId,
             technicalManagerName: vessel.technicalManagerName,
             thirdPartyOperatorId: vessel.thirdPartyOperatorId,
             thirdPartyOperatorName: vessel.thirdPartyOperatorName,
             v_description: vessel.v_description,
             v_type: vessel.v_type,
             vesselFlag: vessel.vesselFlag,
           },
         })
           .then((updated) => {
             req.flash(
               "success_msg",
               "Vessel updated successfully." + updateObject.name +"  -" + updateObject.v_type
             );
             console.log("updated the db");
             res.redirect("/" );
            })
            .catch((err) => {
              req.flash("error_msg", "ERROR: " + err);
              res.redirect("/");
            });
          }
          else {
            req.flash(
              "success_msg",
              "Vessel not in big db." + updateObject.name
            );
             consle.log("vessel not in big db");
            res.redirect("/");
          }

      // req.flash("success_msg", "Vessels email address updated successfully.");
      // res.redirect("/");
    })
    .catch((err) => {
      req.flash("error_msg", "ERROR: " + err);
      res.redirect("/");
    });
});

//put routes ends here

// DELETE routes start here
router.delete("/delete/:id", function (req, res) {
  let id = req.params.id + "1";
  let searchQuery = { _id: id };

  Db_ship.deleteOne(searchQuery)
    .then((ship) => {
      req.flash("success_msg", "Vessel Successfully deleted :");
      res.redirect("/");
    })
    .catch((err) => {
      res.json("error" + err);
      req.flash("error_msg", "Error " + err);
    });
});
// DELETE routes end here

// Export routes for server.js to use.
module.exports = router;
