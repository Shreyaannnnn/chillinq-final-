const User = require('../../modules/User/user')

const onboardUser = async (req, res) => {

    const { username, number, bio, hometown, gender, hobbies  } = req.body;
    const userId= req.params.userId;

    try{
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.username = username;
        user.number = number;
        user.bio = bio;
        user.hometown = hometown;
        user.gender = gender;
        user.hobbies = hobbies;

        // Save the updated user object to the database
        await user.save();

        return res.status(200).json({ message: 'User details updated successfully', user });
    

    }

    catch(error){

        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    onboardUser,
};