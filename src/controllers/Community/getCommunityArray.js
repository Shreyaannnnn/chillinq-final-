const CommunityVoting = require('../../modules/Community/CommunityVoting')
const  Verification = require('../../modules/Community/Verification');


const communityPostsArray = async (req, res) => {

    try {
        const { userId } = req.body;

        const postArray = await CommunityVoting.find({ votedBy: { $ne: userId } });

        if (!postArray) {
            res.status(201).json({ msg: "No Posts available currently" })
        }

        res.status(200).json(postArray);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }


}



const verificationPostsArray = async (req, res) => {

    try {
        const { userId } = req.body;

        const postArray = await Verification.find({ votedBy: { $ne: userId } });

        if (!postArray) {
            res.status(201).json({ msg: "No Verification Posts available currently" })
        }

        res.status(200).json(postArray);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }


}

module.exports = { communityPostsArray, verificationPostsArray }