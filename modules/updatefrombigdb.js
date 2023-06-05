const Db_ship = require("../models/db_ship.js");
const Db_ship_big = require("../models/db_ship_big.js");




const updateFromBigDb = function (imo){
let imo1=imo
    let searchQuery = { imo:imo1 };
   
    Db_ship_big.find(searchQuery) //{"date": {$slice:14}
    .then((vessel1) => {
       
if (vessel1[0]){
    let vessel=vessel1[0];
   

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
      operator: vessel.operator || vessel.ismManagername,
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
        operator: updateObject.operator,
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
        console.log(
                   "Vessel updated successfully." + updateObject.name +"  -" + updateObject.v_type
        );
        console.log("updated the db");
      
       })
       .catch((err) => {
        console.log("error_msg", "ERROR: " + err);
   
       });


}
else{

    console.log(
        "success_msg",
        "Vessel not found in big db." + imo  
      );
      console.log("no changes in the db");
     



};
        

})
.catch((err) => {
    console.log("error_msg", "ERROR: " + err);
  
});

} ;   

module.exports =updateFromBigDb;