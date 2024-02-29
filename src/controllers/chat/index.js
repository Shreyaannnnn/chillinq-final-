const User = require("../../modules/User/user");
const Chat = require("../../modules/Chat/index")

const getChat = async (req, res) => {
  const { chatId} = req.body;

  const chat = await Chat.findById(chatId);

  if (!chat) {
    return res.status(200).json({ message: "Start a new conversation", messages: [] });
  }

  return res.status(200).json({ message: chat.messages });
};



const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;

    if (!senderId|| !receiverId|| !message) {
      return res.status(400).json({ success: false, message: 'Invalid message data' });
    }

    let chat = await Chat.findOne({ $or: [{ user1: senderId, user2: receiverId}, { user1: receiverId, user2: senderId}] });
    console.log("chat", chat)
    const user = await User.findById(senderId);
    
    message.sender = user.username;
    
    console.log("message", message)

    if (!chat) {
      const newChat = new Chat({
        "user1": senderId,
        "user2": receiverId,
        "messages": message
      })
      await newChat.save()
      const user1 = User.findById(senderId);
      const user2 = User.findById(receiverId);

      user1.chatId.push(newChat._id.toString());
      user2.chatId.push(newChat._id.toString());

      await user1.save();
      await user2.save();
      res.status(200).json({ success: true, message: 'Message sent successfully' });

    }
    else {
      chat.messages.push(message)
      await chat.save();
      res.status(200).json({ success: true, message: 'Message sent successfully' });
    }
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ success: false, message: 'Failed to send message' });
  }
}

module.exports = { getChat, sendMessage }