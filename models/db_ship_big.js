const mongoose = require('mongoose');
 

let db_ship_bigSchema = new mongoose.Schema({
    date : String,

    Tonnage: String,
    arrCountry: String,
    arrPort: String,
    beneficialOwnerId: String,
    beneficialOwnerName: String,
    bestContactId: String,
    bestContactName: String,
    buildYear: String,
    callSign: String,
    ch_message: String, //????
    commercialOperatorId: String,
    commercialOperatorName: String,
    country: String,
    eta: String,
    ex_name: String, 
    mysql_id: Number,
    imo: String,
    ismManagerId: String,
    ismManagerName: String,
    mmsi: String,
    mt_id: String,
    name: String,
    nominalOwnerId: String,
    nominalOwnerName: String,
    o_accepted: String,
    o_sent: String,
    oneCode: String,
    sciCode: String,
    operator: String,
    registeredOwnerId: String,
    registeredOwnerName: String,
    remarks: String,
    technicalManagerId: String,
    technicalManagerName: String,
    thirdPartyOperatorId: String,
    thirdPartyOperatorName: String,
    v_description: String,
    v_type: String,
    vesselFlag: String,
    vessel_id: String,
    vrp_plan: String , 
    etaUpdated: String  
});

module.exports = mongoose.model('Db_ship_big', db_ship_bigSchema);







