const config = require('config');
const fs     = require('fs-extra');

const logger = require('./modules/logger.js');
const XLSX   = require('xlsx');

const dataConfig = config.get('data');

//let file_name = dataConfig.location + "/DSXPushRptPowerBI-TestAccountFoodLionGA-014243May222018.xlsx";

let file_name = dataConfig.location + "/airport_data.xlsx";

// ************************* Promises Promises ********************************

function Spreadsheet(fname) {
    return new Promise(function(resolve) {
        let buf = fs.readFileSync(fname);
        let workbook = XLSX.read(buf);

        let sheet = workbook.SheetNames[0];
        let worksheet = workbook.Sheets[sheet];

        let result = [];

        try {
            var arr = XLSX.utils.sheet_to_json( worksheet, {
                header:['line','name','city','country','call','call2','lat','lon','sea','gmt','tz']
            });
            resolve(arr);
        }
        catch (err) {
            reject(err);
        }
    })
}

Spreadsheet(file_name).then( function(output) {
    logger.info( "output: " + JSON.stringify(output));
})
.catch(function(err) {
    logger.error(err);
})
