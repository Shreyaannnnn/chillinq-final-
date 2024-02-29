const User = require('../../modules/User/user')

const editUserField = async (req, res) => {

    const userId = req.params.userId;
    const { username, about } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, { username, about, bio }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(201).json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    editUserField,
};
