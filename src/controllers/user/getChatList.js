const Chat = require("../../modules/Chat/index")
const User = require("../../modules/User/user")

const getChatList = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userChats = await Chat.find({ $or: [{ user1: userId }, { user2: userId }] });


        const usersArray = [];

        for (const chat of userChats) {
            let otherUserId;
            if (chat.user1.toString() === userId) {
                otherUserId = chat.user2;
            } else {
                otherUserId = chat.user1;
            }

            const otherUser = await User.findById(otherUserId);
            if (!otherUser) {
                console.error(`User not found for userId: ${otherUserId}`);
                continue;
            }

            usersArray.push({
                username: otherUser.username,
                userId: otherUser._id
            });
        }
    
        // Send the response
        res.status(200).json(usersArray);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getChatList };
