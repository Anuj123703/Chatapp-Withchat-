import Conversation from "../models/conversation.model.js";
import Message from "../models/message.modal.js";
import uploadCloudinary from "../config/Cloudinary.js";
import {io, getReceiverSocketId } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    let sender = req.userid;
    let receiver = req.params.receiverid;
    let { message } = req.body;
    let image = req.file
      ? await uploadCloudinary(req.file.path)
      : null;

    let conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] }
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sender, receiver],
        messages: []
      });
    }

    let newMessage = await Message.create({
      conversationId: conversation._id,
      sender: sender,
      receiver: receiver,
      message: message,
      image: image
    });

    conversation.messages.push(newMessage._id);
    await conversation.save();
    const receiverSocketId = getReceiverSocketId(receiver);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);

  } catch (error) {
    console.log("SEND MESSAGE ERROR:", error);
    res.status(500).json({ message: error.message });  }
};

export const getMessages = async (req, res) => {
  try {
    let conversation = await Conversation.findOne({
      participants: {
        $all: [req.userid, req.params.receiverid]
      }
    }).populate("messages");

    if (!conversation) {
      return res.status(404).json({
        message: "Conversation not found"
      });
    }

    res.status(200).json(conversation.messages);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};