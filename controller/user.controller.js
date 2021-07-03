const {
  saveUserData,
  getUserDataSync,
  getUserDataAsync,
} = require("../Utils/readwriteJson");

// res.status(200).send("Hello Nitesh");

//sync
// const data = getUserDataSync();
// console.log(data);
// res.send(data);

//async
exports.getData = (req, res) => {
  getUserDataAsync()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((e) => {
      res.send(e.message);
    });
  console.log("I printed last");
};

exports.getUserById = (req, res) => {
  const users = getUserDataSync();
  const fetchedList = users.filter((u) => req.params.username === u.username);

  if (fetchedList.length === 0) res.status(409).send("user does not exist");

  res.status(200).send(fetchedList);
};

exports.addUser = (req, res) => {
  const users = getUserDataSync();
  const newUser = req.body;

  //findExist

  const findExist = users.find((u) => u.username === req.body.username);
  if (findExist) return res.status(409).send("user name already exist");

  users.push(newUser);

  saveUserData(users);
  res.send({ success: true, msg: "User data added successfully" });
};

exports.editUser = (req, res) => {
  const username = req.params.username;

  const datatoUpdate = req.body;
  const existingData = getUserDataSync();

  const findExist = existingData.find((u) => u.username === username);
  if (!findExist) return res.status(409).send("username does not exist");
  //filter the userdata
  const updateUser = existingData.filter((user) => user.username !== username);
  //push the updated data
  updateUser.push(datatoUpdate);
  //finally save it
  saveUserData(updateUser);
  res.send({ success: true, msg: "User data updated successfully" });
};

exports.deleteUser = (req, res) => {
  const username = req.params.username;
  const allusers = getUserDataSync();

  const ifExist = allusers.find((u) => username === u.username);
  if (!ifExist) return res.status(409).send("user does notexist");

  const filterUsers = allusers.filter((u) => u.username !== username);
  saveUserData(filterUsers);
  res.send({ success: true, message: "user deleted successfully" });
};
