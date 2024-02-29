const User = require('../../modules/User/user')

const getUserProfile = async (req, res) => {

    const {userId, profileId} = req.body;
    try {
        const user = await User.findById(profileId).populate('verification');
        if (!user) {
            throw new Error('User not found');
        }
        
        let votes = 0;

        if (user.verification) {
            votes = user.verification.votes;
        }
        
        let isFriends = user.friends.includes(userId);
        
        console.log(user);
        
        const userDetails = {
            username: user.username,
            bio: user.bio,
            images: user.images,
            gender: user.gender,
            hometown: user.hometown,
            votes: votes,
            isFriend: isFriends
        };
        console.log(userDetails);

        res.status(200).json(userDetails);

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports = {
    getUserProfile,
};

