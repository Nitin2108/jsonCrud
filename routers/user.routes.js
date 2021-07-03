const express = require("express");
const Router = express.Router();
const user = require('../controller/user.controller');

Router.get("/list", user.getData);

Router.get("/:username",user.getUserById);

Router.post("/create", user.addUser);

Router.patch("/update/:username", user.editUser);

Router.delete("/delete/:username",user.deleteUser);

module.exports = Router;
