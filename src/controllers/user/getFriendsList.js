const User = require("../../modules/User/user")

const getFriendsList = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        
        const userFriendList = user.friends
        console.log(userFriendList)

        const friendsArray = [];

        for (const friends of userFriendList) {
            let otherUserId = friends.toString()

            const otherUser = await User.findById(otherUserId);
            if (!otherUser) {
                console.error(`User not found for userId: ${otherUserId}`);
                continue;
            }

            friendsArray.push({
                username: otherUser.username,
                userId: otherUser._id
            });
        }
        res.status(200).json(friendsArray);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getFriendsList };
