const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    categories: [
      {
        type: String,
        trim: true
      }
    ],

    ward: {
      type: String,
      required: true
    },

    headOfficer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    escalationChain: [
      {
        officer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },

        level: {
          type: Number,
          required: true
        }
      }
    ],

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Department", departmentSchema);