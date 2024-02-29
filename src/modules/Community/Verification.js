const mongoose = require('mongoose');
const { mongooseInstance } = require('../../../db.config');
const User = require("../User/user");
const VerificationSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    votes: {
        type: Number,
        default: 0
    },
    votedBy: {
        type: [String]
    },
    imageOne: {
        type: String,
    },
    imageTwo: {
        type: String,
    },
    createdAt: { type: Date, default: Date.now },
    type: {
        type: String,
        enum: 'VERIFICATION'
    }
    // Have to add field for Images/Media
});
console.log
const Verification = mongooseInstance.model('Verification', VerificationSchema);
module.exports = Verification;


