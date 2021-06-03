const jwt = require('jsonwebtoken');
const rutJs = require('rut.js');

const config = require('../../config/config');
const User = require('../user/user.model');
const Profile = require('../profile/profile.model');
const { asyncHandler } = require('../../middlewares/async');
const HttpError = require('../../errors/http');
const { buildParams } = require('../../utils/controller');

class AuthControllerClass {
  _validParamsUser = [
    'name',
    'lastName',
    'email',
    'rut',
    'isActive',
    'password',
  ];
  _validParamsProfile = [
    '_id',
    'fradaId',
    'fradaRef',
    'phone',
    'company',
    'description',
    'gender',
    'activity',
    'region',
    'twitter',
    'facebook',
    'instagram',
  ];


  _sendToken = (user, status, res) => {
    const token = user.getToken();

    res.status(status).json({ data: token });
  };

  create = asyncHandler(async (req, res, next) => {
    const { email } = req.body;

    let user = await User.findOne({ email });
    if (user) return next(new HttpError('UserAlreadyExists', 422));

    req.body.rut = rutJs.clean(req.body.rut);

    user = new User(buildParams(this._validParamsUser, req.body));

    await user.save();

    let profileUser = await User.findOne({ email });
    
    let profile = new Profile(buildParams(this._validParamsProfile, req.body));
    profile._id = profileUser._id;
    await profile.save();
    

    return res.status(201).json({ success: true });
  });

  login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    let user = await User.findOne({ email }).select('+password');

    if (!user) return next(new HttpError('InvalidCredentials', 422));

    if (!(await user.matchPassword(password))) {
      return next(new HttpError('InvalidCredentials', 422));
    }

    this._sendToken(user, 200, res);
  });
}

const AuthController = new AuthControllerClass();

module.exports = AuthController;
