const CommunityVoting = require('../../modules/Community/CommunityVoting')


const allPosts = async (req, res) => {
    try {
        const posts = await CommunityVoting.find({});

        return res.status(200).json({ posts });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

const createPost = async (req, res) => {
    const { createdBy, description } = req.body;
    try {
        
        
    const newCommunityVotePost = new CommunityVoting({
        createdBy,
        description,
    });

        await newCommunityVotePost.save();

        return res.status(200).json({msg: "Post Created"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }

}


const deletePost = async (req, res) => {
    try {
        const { postId, userId} = req.body;

        const vote = await CommunityVote.findById(postId);

        if (!vote) {
            return res.status(404).json({ error: 'Vote not found' });
        }

        if (vote.createdBy.toString() !== userId) {
            return res.status(403).json({msg:"Only owner can delete the post they have created."});
        }

        await CommunityVoting.deleteOne(postId)
        return res.status(200).json({msg:"Post Deleted Successfully"});

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};


module.exports = { createPost, allPosts, deletePost }