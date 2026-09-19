const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    complaint: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complaint",
      default: null
    },

    type: {
      type: String,

      enum: [
        "complaint_created",
        "complaint_assigned",
        "status_updated",
        "sla_warning",
        "sla_breached",
        "complaint_escalated",
        "complaint_resolved",
        "duplicate_flagged"
      ],

      required: true
    },

    message: {
      type: String,
      required: true
    },

    read: {
      type: Boolean,
      default: false
    },

    readAt: {
      type: Date,
      default: null
    }
  },

  {
    timestamps: true
  }
);

notificationSchema.index({
  user: 1,
  read: 1,
  createdAt: -1
});

module.exports = mongoose.model(
  "Notification",
  notificationSchema
);