const mongoose = require('mongoose');
const { mongooseInstance } = require('../../../db.config');

const chatSchema = new mongoose.Schema(
    {
        "user1": { type: mongoose.Schema.Types.ObjectId, required: true },
        "user2": { type: mongoose.Schema.Types.ObjectId, required: true },
        "messages": [
            {
                "sender": { type: String, required: true },
                "content": { type: String },
                attachments: [
                    {
                        url: String,
                        type: String
                    },

                ],
                "timestamp": {type: Date, default: Date.now}

            },
        ]
    }
)

const Chat = mongooseInstance.model('Chat', chatSchema);
module.exports = Chat;