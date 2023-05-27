const express= require("express");
const router= express.Router();

const flash = require("connect-flash");
const Db_ship = require('../models/db_ship.js');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.SECRET, { pbkdf2Iterations: Number(process.env.PBKDF2), saltLength: Number(process.env.SALT) });


// const encryptedString = cryptr.encrypt('bacon');
// const decryptedString = cryptr.decrypt(encryptedString);

// GET ROUTES start here
router.get("/", (req, res) => {
  let searchQuery = {mysql_id:{$gte:1, $lte:10}};


  Db_ship.find(searchQuery) //{"date": {$slice:14}
    .then((ships) => {
        console.log(ships);
        let ships1 =[];
        ships.forEach((ship) =>{
           let ship1 = ship;
            ship.remarks = cryptr.decrypt(ship.remarks);
            ships1.push(ship1);
        })
      // req.flash("success_msg", "All went well, tides fetched");
      res.render("index", { ships: ships1 });
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
      etaUpdated: "not"
    
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
// POST ROUTES start here

  

  
  
  
  
  
  // Export routes for server.js to use.
module.exports =router;