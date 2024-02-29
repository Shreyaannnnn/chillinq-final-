const User = require('../../modules/User/user')

const addFriend = async (req, res) => {

    const { sendersUserId, RecieversUserId, message } = req.body;

    try {
        const reciever = await User.findById(RecieversUserId)

        const sendersNotifications = await User.findById(sendersUserId)

        reciever.notifications.push({
            type: {
                type: "FRIEND_REQUEST"
            },
            sender: sendersNotifications,
            message: message,
            createdAt: new Date()
        });

        reciever.save()


        res.status(200).json({ message: 'Notification added successfully', user: reciever.username });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};


const acceptFriendRequest = async (req, res) => {

    const { senderId, userId } = req.body;
    try {

        const user = await User.findById(userId)
        const newFriend = await User.findById(senderId)

        user.friends.push(senderId);
        newFriend.friends.push(user);

        user.save()
        newFriend.save()
        // remove notification

        res.status(200).json({ message: 'Friends Added' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    addFriend,
    acceptFriendRequest
};
