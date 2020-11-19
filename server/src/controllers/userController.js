const { Router } = require('express');
const express = require('express');
const User = require('../models/user');

const userController = express.Router();


userController.post('/');