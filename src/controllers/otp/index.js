const twilio = require('twilio');


const accountId= 'AC2fc2d53806ad248d72e1c44bef6958e6'
const authToken = '9147b3f97c6ded41e1b09bb7cebcaea3'
const twilioPhoneNumber = '+12133256895'

const client = twilio(accountId, authToken);


// Generate random OTP
const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

// Send OTP via Twilio SMS
const sendOTP = async(req,res) => {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
        return res.status(400).json({ error: 'Phone number is required' });
    }
    const otp = generateOTP();
    const expirationTime = Date.now() + 2 * 60 * 1000; // 2 minutes expiration
    
    client.messages.create({
        body: `Your OTP for verification is: ${otp}`,
        from: twilioPhoneNumber,
        to: phoneNumber
    })
    .then(message => console.log('OTP sent successfully!'))
    .catch(error => console.error('Error sending OTP:', error));

    res.status(200).json(
        {otp: otp,
        expirationTime:expirationTime
        })

}

// Verify OTP
const verifyOTP = (req, res) => {
    const { otp, userInput, expirationTime } = req.body;
    if (!otp || !userInput) {
        return res.status(400).json({ error: 'Both OTP and user input are required' });
    }
    if( Date.now() > expirationTime)
    {
        return res.status(400).json({ error: 'OTP Expired' });
    }
    if (userInput === otp) {
        return res.status(200).json({ message: 'OTP verified successfully' });
    } else {
        return res.status(400).json({ error: 'InvalIdOTP' });
    }
};

module.exports = {
    sendOTP,
    verifyOTP
};
