const fs = require("fs");
let path = require('path');
let filePath = path.join(__dirname, '../model/users.json');

console.log(filePath);
getUserDataAsync = () => {
  return new Promise(function (resolve, reject) {
    fs.readFile(filePath, "utf8", function (err, data) {
      if (err) reject(err);
      resolve(JSON.parse(data));
    });
  });
};


getUserDataSync = () =>{

const data = fs.readFileSync(filePath,"utf8");
return JSON.parse(data);

}

saveUserData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(filePath, stringifyData);
};

module.exports ={saveUserData,getUserDataSync,getUserDataAsync}