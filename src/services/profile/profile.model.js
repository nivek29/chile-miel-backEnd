const { Schema, model } = require('mongoose');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const config = require('../../config/config');
const { IActivity, IGender } = require('./profile.interface');

const schemaProfile = new Schema(
  {
    _id:{
      type: Schema.Types.ObjectId,
      index:true,
      unique:true,
      ref: "User"
    },
    fradaId: {
      type: String,
      required: [true, 'FieldIsRequired'],
      default: " "
    },
    fradaRef: {
      type: String,
      required: [true, 'FieldIsRequired'],
    },
    phone: {
      type: Number,
      required: [true, 'FieldIsRequired'],
      min: [100000000, 'FieldIsNotValid'],
      max: [999999999, 'FieldIsNotValid'],
      unique: true,
      sparse: true,
    },
    company: {
      type: String,
      trim: true,
      required: [true, 'FieldIsRequired'],
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'FieldIsRequired'],
      max: [5000, 'FieldIsNotValid'],
    },
    gender: {
      type: Number,
      enum: Object.keys(IGender)
        .filter((e) => !Number.isNaN(Number(IGender[e])))
        .map((e) => Number(IGender[e])),
    },
    activity: {
      type: [Number],
      required: [true, 'FieldIsRequired'],
      enum: Object.keys(IActivity)
        .filter((e) => !Number.isNaN(Number(IActivity[e])))
        .map((e) => Number(IActivity[e])),
    },
    region: {
      type: String,
      trim: true,
      required: [true, 'FieldIsRequired'],
      max: [32, 'FieldIsNotValid'],
      min: [2, 'FieldIsNotValid'],
    },
    commune: {
      type: String,
      trim: true,
      max: [32, 'FieldIsNotValid'],
      min: [2, 'FieldIsNotValid'],
    },
    street: {
      type: String,
      trim: true,
      max: [32, 'FieldIsNotValid'],
      min: [2, 'FieldIsNotValid'],
    },
    additonalInfo: {
      type: String,
      trim: true,
      max: [32, 'FieldIsNotValid'],
      min: [2, 'FieldIsNotValid'],
    },
    social: {
      twitter: String,
      facebook: String,
      instagram: String,
    },
  },

  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);



const Profile = model('Profile', schemaProfile);

module.exports = Profile;
