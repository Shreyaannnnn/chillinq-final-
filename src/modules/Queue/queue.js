const mongoose = require('mongoose');
const { connectDatabase, mongooseInstance } = require('../../../db.config');
connectDatabase()
    .then(() => {
        const queueSchema = new mongoose.Schema({
            maker: {
                type: String,
                required: true
            },
            waitingList: {
                type: Array
            },
            activeMember: {
                type: mongoose.Schema.Types.ObjectId
            },
            activeMemberEndTime: {
                type: Date
            },
            members: {
                type: Array
            }
        });
        console.log("QUEUE SCHEMA")

        const Queue = mongooseInstance.model('Queue', queueSchema);
        module.exports = Queue;

    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });