const mongoose = require('mongoose');
const { mongooseInstance } = require('../../../db.config');
const currentQueue = require("../Queue/queue");
const Chat = require('../Chat');
const Verification = require('../Community/Verification');


const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    socket: { type: String, default:""},
    number: { type: String, unique: true, required: true },
    bio: String,
    hometown: String,
    gender: { type: String, enum: ['male', 'female', 'other'] },
    hobbies: [String],
    images: [String],
    blockedUsers: [String],
    blockedBy: [String],
    chillinqWallet: { type: Number, default: 0 },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    myQueue: { type: mongoose.Schema.Types.ObjectId, ref: 'Queue' },
    currentQueue: [{ type: mongoose.Schema.Types.ObjectId, ref: currentQueue }],
    queueHistory: [{ type: String}],
    chatId: [{ type: mongoose.Schema.Types.ObjectId, ref:Chat}],
    verificationStatus: { type: Boolean, default:false},
    verification: { type: mongoose.Schema.Types.ObjectId, ref: Verification},
    notifications: [{
        type: {
            type: { enum: ['FRIEND_REQUEST', 'message', 'other'], type: String },
        },
        createdAt: { type: Date, default: Date.now }
    }]

});
const User = mongooseInstance.model('User', userSchema);
module.exports = User;