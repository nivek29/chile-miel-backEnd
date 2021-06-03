const { Schema, model } = require('mongoose');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const config = require('../../config/config');
//const { IActivity, IGender } = require('./user.interface');

const schema = new Schema(
  {

    name: {
      type: String,
      trim: true,
      required: [true, 'FieldIsRequired'],
      max: [32, 'FieldIsNotValid'],
      min: [2, 'FieldIsNotValid'],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, 'FieldIsRequired'],
      max: [32, 'FieldIsNotValid'],
      min: [2, 'FieldIsNotValid'],
    },
    rut: {
      type: String,
      unique: true,
      required: [true, 'FieldIsRequired'],
      uppercase: true,
      match: [/^\d{1,2}\d{3}\d{3}(\d|k|K)$/, 'FieldIsNotValid'],
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'FieldIsRequired'],
      max: [32, 'FieldIsNotValid'],
      min: [2, 'FieldIsNotValid'],
      unique: true,
      lowercase: true,
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'FieldIsNotValid',
      ],
    },
    password: {
      type: String,
      max: [20, 'FieldIsTooLong'],
      min: [6, 'FieldIsTooShort'],
      select: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    }
  },

  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

schema.index({ email: 1 });

schema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await argon2.hash(this.password, {
      type: argon2.argon2id,
      parallelism: +config.argon.parallelism,
      memoryCost: 2 ** 16,
      hashLength: +config.argon.length,
      timeCost: +config.argon.time_cost,
    });
  }

  next();
});

schema.methods.getToken = function () {
  return jwt.sign({ id: this._id }, config.jwt.secret, {
    expiresIn: config.jwt.life,
  });
};

schema.methods.matchPassword = async function (password) {
  return await argon2.verify(this.password, password);
};

const User = model('User', schema);

module.exports = User;
