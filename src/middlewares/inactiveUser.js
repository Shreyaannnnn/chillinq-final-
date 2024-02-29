const User = require('../modules/User/user')

const checkInactiveUsers = async () => {
    try {
        const cutoffTime = new Date(Date.now() - (48 * 60 * 60 * 1000)); // 48 hours ago
        const inactiveUsers = await User.find({ lastActive: { $lt: cutoffTime } });

        // inactiveUsers.forEach(user => {
        //     console.log(`User has been inactive for more than 48 hours.`);
        // });
        console.log("FUNCTION UP")

    } catch (err) {
        console.error('Error checking inactive users:', err);
    }
};

module.exports = {
    checkInactiveUsers,
};
