const Verification = require('../../modules/Community/Verification');
const User = require('../../modules/User/user');

const verifyUser = async (req, res) => {
    const { userId } = req.body;
    const image = req.file;

    // s3 function to upload the files and get a link.
    try {

        const user = await User.findById(userId);

        if (!user.verificationStatus) {

            const verification = new Verification({
                createdBy: userId,
                imageOne: "",
                imageTwo: "",
            })
            await verification.save();

            const user = await User.findByIdAndUpdate(userId, { verificationStatus: true, verification: verification._id }, { new: true });
            user.save()

            res.status(200).json({ message: 'User verification setup successfully' });
        }
        else
        {
            res.status(201).json({ message: 'User cannot create profile verification more than once' });
        }

        } catch (error) {
            console.error('Error creating verification:', error);
            throw error;
        }
    };


    module.exports = {
        verifyUser
    };
