const mongoose = require('mongoose');
const { mongooseInstance } = require('../../../db.config');
const User = require('../User/user')

const CommunityVotingSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User, 
        required: true
    },
    description: { type: String},
    yesVotes: {
        type: Number,
        default: 0
    },
    noVotes: {
        type: Number,
        default: 0
    },
    votedBy: {
        type: [String]
    },
    createdAt: { type: Date, default: Date.now },
    type: {
        type: String,
        enum: 'COMMUNITY'
    }
    // Have to add field for Images/Media
});
console.log
const CommunityVoting = mongooseInstance.model('CommunityVoting', CommunityVotingSchema);
module.exports = CommunityVoting;


