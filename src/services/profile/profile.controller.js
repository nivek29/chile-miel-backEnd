const jwt = require('jsonwebtoken');
const rutJs = require('rut.js');

const config = require('../../config/config');
const Profile = require('../profile/profile.model');
const { asyncHandler } = require('../../middlewares/async');
const HttpError = require('../../errors/http');
const { buildParams } = require('../../utils/controller');

class ProfileControllerClass {
  
  profileList = asyncHandler(async (req, res, next) => {
    
    const list = await Profile.find().populate('_id','');

    return res.status(201).json({ success: true, list });
  });


}

const ProfileController = new ProfileControllerClass();

module.exports = ProfileController;
