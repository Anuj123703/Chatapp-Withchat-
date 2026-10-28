import React from 'react'
import { FaArrowLeft } from "react-icons/fa";
import dp from '../assets/dp.png'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setselectedUser } from '../Redux/userSlice';
import { BsEmojiSmile } from "react-icons/bs";
import { FaRegImage } from "react-icons/fa6";
import { BsSendFill } from "react-icons/bs";
import EmojiPicker from 'emoji-picker-react';
import { useState, useEffect, useRef } from 'react'; 
import SenderMessage from './SenderMessage.jsx';
import ReceiverMessage from './ReceiverMessage.jsx';
import { API_URL } from '../config';
import axios from 'axios';
import { setMessage } from '../Redux/message_slice';

const MessageArea = () => {
  let { selectedUser, userData, socket } = useSelector(state => state.user)
  let [showemojiPicker, setshowemojiPicker] = useState(false)
  let [selectedEmoji, setSelectedEmoji] = useState("");
  let [frontendImage, setFrontendImage] = useState(null);
  let [backendImage, setBackendImage] = useState(null);
  let [isSending, setIsSending] = useState(false);
  let image = useRef(null);
  let { messages } = useSelector(state => state.message);
  let dispatch = useDispatch();

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedUser) return;

      try {
        const result = await axios.get(
          `${API_URL}/api/messages/messages/${selectedUser._id}`,
          { withCredentials: true }
        );

        dispatch(setMessage(result.data));

      } catch (error) {
        console.log(error.response?.data);
        dispatch(setMessage([]));
      }
    };

    getMessages();
  }, [selectedUser]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (selectedEmoji.trim().length === 0 && !backendImage) {
      return;
    }
    try {
      setIsSending(true);
      let formData = new FormData();

      formData.append("message", selectedEmoji);

      if (backendImage) {
        formData.append("image", backendImage);
      }

      let result = await axios.post(
        `${API_URL}/api/messages/send/${selectedUser._id}`,
        formData,
        { withCredentials: true }
      );
      dispatch(setMessage([...messages, result.data]));

      setSelectedEmoji("");
      setBackendImage(null);
      setFrontendImage(null);
    } catch (error) {
      console.log("SEND MESSAGE ERROR:", error);
      console.log("SERVER ERROR:", error.response?.data);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (mess) => {
      dispatch(setMessage([...messages, mess]));
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, messages, dispatch]);

  const handleImage = (e) => {
    let file = e.target.files[0];

    if (!file) return;

    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  return (
    <div className={`md:w-[70%] w-full 
      ${selectedUser ? "flex" : "hidden md:flex"} `}
    >
      {selectedUser &&
        <div className="relative flex-1 flex flex-col h-full bg-slate-50 border-l-2 border-white"
        >
          {/* header */}
          <div className="w-full h-[80px] shrink-0 bg-blue-400 rounded-b-[30px] shadow-2xl p-[20px] flex items-center gap-[20px] ">
            <FaArrowLeft
              className="w-[20px] h-[20px] cursor-pointer text-white hover:text-black  "
              onClick={() => dispatch(setselectedUser(null))}
            />
            {/* DP */}
            <div className="w-[50px] h-[50px] rounded-full bg-white overflow-hidden">
              <img
                src={selectedUser?.image || dp}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>

            <h1
              className="font-bold text-white text-[20px]"
            >
              {selectedUser?.name || "User"}
            </h1>
          </div>
          {/* Sender Messages */}
          <div className="flex-1 overflow-y-auto p-4 pb-[90px]">
            {messages?.map((mess) => {

              console.log("MESSAGE RENDERING:", mess);
              console.log("IMAGE:", mess.image);
              console.log("SENDER:", mess.sender);
              console.log("MY ID:", userData?._id);

              if (String(mess.sender) === String(userData?._id)) {
                return (
                  <SenderMessage
                    key={mess._id}
                    image={mess.image}
                    message={mess.message}
                  />
                );
              }

              return (
                <ReceiverMessage
                  key={mess._id}
                  image={mess.image}
                  message={mess.message}
                />
              );
            })}
          </div>

          {/** showslectedImage **/}
          {frontendImage && (
            <div className="flex justify-center items-center absolute bottom-20 left-0 w-full h-[100px] bg-white/80 border-t-2 border-blue-500">
              <img
                src={frontendImage}
                alt="Selected"
                className="w-[80px] h-[80px] rounded-lg object-cover"
              />
            </div>
          )}
          {/* Message Input */}
          <div className="absolute bottom-0 left-0 w-full bg-white p-4  ">
            <form 
            className="relative w-full"
            onSubmit={handleSendMessage}
            >

              {/* Input */}
              <input
                type="text"
                placeholder="Type a message..."
                value={selectedEmoji}
                onChange={(e) => setSelectedEmoji(e.target.value)}
                className="w-full border border-blue-500 rounded-full py-3 pl-12 pr-32"
              />
              {/* Emoji */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2">
                <BsEmojiSmile
                  onClick={(e) => setshowemojiPicker(!showemojiPicker)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 text-xl cursor-pointer"
                />
                {/* showslectedImage */}
                <input
                  type="file"
                  onChange={handleImage}
                  accept="image/*"
                  ref={image}
                  hidden
                />
                {showemojiPicker && (
                  <div className="absolute bottom-14 left-0 z-50 border-2 border-blue-500 rounded-lg">
                    <EmojiPicker
                      onEmojiClick={(emojiObject) => {
                        setSelectedEmoji((prev) => prev + emojiObject.emoji);
                        setshowemojiPicker(false);
                      }}
                      emojiStyle="native"
                      width={320}
                      height={400}
                    />
                  </div>
                )}
            
              </div>


              {/* Image */}
              <FaRegImage
                className="absolute right-20 top-1/2 -translate-y-1/2 text-blue-500 text-xl cursor-pointer"
                onClick={() => image.current.click()}
              />
              {/* Send */}
              {(selectedEmoji.trim().length > 0 || backendImage) && (
                <button type="submit" disabled={isSending}>
                  <BsSendFill
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-blue-500 text-xl cursor-pointer"
                  />
                </button>
              )}
              
            </form>
          </div>

        </div>
      }
      {/* not chat selected */}
      {!selectedUser && (
        <div className="flex h-full w-full items-center justify-center bg-slate-50/50 p-6 border-2 border-black">
          <div className="flex max-w-sm flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-white/80 p-8 text-center shadow-sm backdrop-blur-sm">
            {/* CSS-only pulsing status indicator */}
            <div className="relative mb-4 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-indigo-500"></span>
            </div>

            <h2 className="text-xl font-semibold text-slate-800 tracking-tight">
              No Chat Selected
            </h2>

            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
              Choose a contact from your list on the left to start messaging.
            </p>
          </div>
        </div>
      )
      }
    </div>
  )
}

export default MessageArea