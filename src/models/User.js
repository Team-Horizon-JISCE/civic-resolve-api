const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role:{
         type: String,
        enum: [
            "citizen",
            "field_officer",
            "ward_admin",
            "super_admin"
        ],
        default: "citizen",
        required: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        default: null
    },
    ward: {
        type: String,
        default: null
    },
    isActive: {
      type: Boolean,
      default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("User", userSchema);