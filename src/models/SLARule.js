const mongoose = require("mongoose");

const slaRuleSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true
    },

    priority: {
      type: String,
      enum: [
        "low",
        "medium",
        "high",
        "critical"
      ],
      required: true
    },

    resolutionHours: {
      type: Number,
      required: true,
      min: 1
    },

    escalationIntervalHours: {
      type: Number,
      required: true,
      min: 1
    },

    reminderBeforeHours: {
      type: Number,
      default: 6,
      min: 0
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

slaRuleSchema.index(
  { category: 1, priority: 1 },
  { unique: true }
);

module.exports = mongoose.model("SLARule", slaRuleSchema);