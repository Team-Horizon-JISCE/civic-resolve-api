const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    // =========================
    // BASIC INFORMATION
    // =========================

    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true,
      trim: true
    },

    // =========================
    // MEDIA
    // =========================

    images: [
      {
        type: String
      }
    ],

    // =========================
    // LOCATION
    // =========================

    location: {
      address: {
        type: String,
        required: true
      },

      latitude: {
        type: Number,
        required: true,
        min: -90,
        max: 90
      },

      longitude: {
        type: Number,
        required: true,
        min: -180,
        max: 180
      }
    },

    // =========================
    // STATUS
    // =========================

    status: {
      type: String,

      enum: [
        "pending",
        "assigned",
        "in_progress",
        "resolved",
        "closed",
        "rejected"
      ],

      default: "pending"
    },

    // =========================
    // PRIORITY
    // =========================

    priority: {
      type: String,

      enum: [
        "low",
        "medium",
        "high",
        "critical"
      ],

      default: "medium"
    },

    // =========================
    // ASSIGNMENT
    // =========================

    assignedDepartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      default: null
    },

    assignedOfficer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    // =========================
    // REPORTER
    // =========================

    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // =========================
    // SLA
    // =========================

    slaDeadline: {
      type: Date,
      default: null
    },

    slaStatus: {
      type: String,

      enum: [
        "within_sla",
        "warning",
        "breached",
        "sla_branch"
      ],

      default: "within_sla"
    },

    // =========================
    // ESCALATION
    // =========================

    escalationLevel: {
      type: Number,
      default: 0
    },

    escalatedAt: {
      type: Date,
      default: null
    },

    // =========================
    // UPVOTES
    // =========================

    upvotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    // =========================
    // DUPLICATE FLAGGING
    // =========================

    flaggedAsDuplicate: {
      type: Boolean,
      default: false
    },

    duplicateOf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complaint",
      default: null
    },

    duplicateFlags: [
      {
        flaggedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },

        reason: String,

        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ],

    // =========================
    // STATUS HISTORY
    // =========================

    statusHistory: [
      {
        oldStatus: {
          type: String
        },

        newStatus: {
          type: String,
          required: true
        },

        changedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },

        remarks: {
          type: String
        },

        changedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],

    // =========================
    // RESOLUTION PROOF
    // =========================

    resolutionProof: {
      imageUrl: {
        type: String,
        default: null
      },

      note: {
        type: String,
        default: null
      },

      uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
      },

      uploadedAt: {
        type: Date,
        default: null
      }
    },

    // =========================
    // CITIZEN RATING
    // =========================

    citizenRating: {
      score: {
        type: Number,
        min: 1,
        max: 5,
        default: null
      },

      feedback: {
        type: String,
        default: null
      },

      ratedAt: {
        type: Date,
        default: null
      }
    }
  },

  {
    timestamps: true
  }
);


// =========================
// INDEXES
// =========================

complaintSchema.index({
  category: 1,
  priority: 1
});

complaintSchema.index({
  assignedDepartment: 1,
  status: 1
});

complaintSchema.index({
  assignedOfficer: 1,
  status: 1
});

complaintSchema.index({
  slaDeadline: 1,
  slaStatus: 1
});

complaintSchema.index({
  reportedBy: 1,
  createdAt: -1
});


module.exports = mongoose.model(
  "Complaint",
  complaintSchema
);