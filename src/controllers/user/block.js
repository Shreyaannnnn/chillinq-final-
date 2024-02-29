const User = require('../../modules/User/user')

const blockProfile = async (req, res) => {

    const { userId, profileId } = req.body;
    console.log("userId", userId)
    console.log("profileId", profileId)

    try {
        // For "This user has blocked..."
        const user = await User.findById(userId);
        
        if ( user.blockedUsers.includes(profileId))
        {
            res.status(403).json({error: ' This user is already in block list.'})
        }
        
        user.blockedUsers.push(profileId)


        // For "This profile is blocked by..."
        const profile = await User.findById(profileId);
        profile.blockedBy.push(userId)

        user.save();

        profile.save();
        res.status(201).json({msg:" user has been blocked"});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};


const unblockProfile = async (req, res) => {

    const { userId, profileId } = req.body;

    try {
        // For "This user has blocked..."
        const user = await User.findById(userId);
        if ( !user.blockedUsers.includes(profileId))
        {
            res.status(403).json({error: ' This user does not exist in block list.'})
        }
        user.blockedUsers.pop(profileId)

        // For "This profile is blocked by..."
        const profile = await User.findById(profileId);
        profile.blockedBy.pop(userId)

        user.save();
        profile.save();
        res.status(201).json({msg:" user has been unblocked"});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    blockProfile,
    unblockProfile
};

