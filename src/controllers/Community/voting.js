const CommunityVote = require('../../modules/Community/CommunityVoting');
const  Verification = require('../../modules/Community/Verification');

const vote = async (req, res) => {
    const { postId, userId, choice } = req.body;

    try {
        const vote = await CommunityVote.findById(postId);

        if (!vote) {
            return res.status(404).json({ error: 'Vote not found' });
        }
        if (vote.createdBy.toString() === userId) {
            return res.status(403).json({ error: 'Creator cannot vote for their own post' });
        }

        if (vote.votedBy.includes(userId)) {
            return res.status(400).json({ error: 'User has already voted for this post' });
        }

        if (choice === 'yes') {
            vote.yesVotes += 1;
        } else if (choice === 'no') {
            vote.noVotes += 1;
        } else {
            return res.status(400).json({ error: 'InvalIdchoice' });
        }

        vote.votedBy.push(userId)

        await vote.save();

        return res.status(200).json(vote);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
}


const verificationVote = async (req, res) => {
    const { postId, userId, choice } = req.body;

    try {
        const vote = await Verification.findById(postId);
        console.log(vote)

        if (!vote) {
            return res.status(404).json({ error: 'Vote not found' });
        }
        if (vote.createdBy === userId) {
            return res.status(403).json({ error: 'Creator cannot vote for their own post' });
        }

        if (vote.votedBy.includes(userId)) {
            return res.status(400).json({ error: 'User has already voted for this post' });
        }


        if (choice === 'yes') {
            vote.votes += 1;
        } else if (choice === 'no') {
           vote.votes  -= 1;
        } else {
            return res.status(400).json({ error: 'InvalIdchoice' });
        }

        if( vote.votes <= -1)
        {
            vote.votes = 0;
        }

        vote.votedBy.push(userId)

        await vote.save();

        return res.status(200).json(vote);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
}



module.exports = { vote, verificationVote }
