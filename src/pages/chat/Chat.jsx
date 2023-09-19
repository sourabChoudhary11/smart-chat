import React, { useContext, useEffect, useRef, useState } from 'react'
import Contacts from '../../components/contacts/Contacts'
import Messages from '../../components/messages/Messages'
import { UserContext } from '../../components/userContext/UserContext';
import axios from 'axios';

const Chat = () => {

  const [ws, setWs] = useState(null);
  const { id } = useContext(UserContext);
  const [onlinePeopleList, setOnlinePeopleList] = useState({});
  const [offlinePeopleList, setOfflinePeopleList] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([])
  const scrollRef = useRef();
  scrollRef.scrollTop = scrollRef.scrollHeight;

  useEffect(() => {
    connectToWs();
  }, [selectedUser]);

  function connectToWs() {
    const ws = new WebSocket(`wss://${import.meta.env.VITE_BACKEND_URL.split('//')[1]}`);
    setWs(ws);

    ws.addEventListener('message', (e) => {
      const people = JSON.parse(e.data);
      if ('online' in people) {
        onlinePeople(people.online);
      }
      else if ('text' in people) {
        if (people.sender === selectedUser) {
          setMessages(prev => [...prev, { ...people }])
        }
      }
    })
    ws.addEventListener('close', () => {
      connectToWs();
    })
  }

  function onlinePeople(people) {
    const availablePeople = {};
    people.forEach(({ username, userId }) => {
      if (userId && username) {
        availablePeople[userId] = username;
      }
    })
    setOnlinePeopleList(availablePeople);
  }

  const sendMessage = async (e, file = null) => {
    e.preventDefault();
    ws.send(JSON.stringify({
      message: {
        recipient: selectedUser,
        text: newMessage,
        file,
      }
    }))

    let fileName;

    try {
      const fileParts = file?.name.split('.');
      const ext = fileParts[fileParts.length - 1];
      fileName = Date.now() + "." + ext;
    } catch (error) {
      console.log(error)
    }

    setNewMessage("");
    setMessages(prev => [...prev, {
      text: newMessage,
      isOur: true,
      sender: id,
      file: fileName,
      recipient: selectedUser,
      id: Date.now(),
    }]);

    if (file) {
      const fetchingMessages = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/messages/${selectedUser}`, {
        headers: {
          "Access-Control-Allow-Origin": import.meta.env.VITE_ORIGIN_URL,
          "Access-Control-Allow-Method": "GET",
        },
        withCredentials: true,
      });
      setMessages(fetchingMessages.data)
    }
  }

  useEffect(() => {
    let divScroll = scrollRef.current;
    if (divScroll) {
      divScroll.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/people`, {
      headers: {
        "Access-Control-Allow-Origin": import.meta.env.VITE_ORIGIN_URL,
        "Access-Control-Allow-Method": "GET",
      },
      withCredentials: true,
    }).then(res => {
      const offlinePeopleArr = res.data
        .filter(p => p._id !== id)
        .filter(op => !Object.keys(onlinePeopleList).includes(op._id));
      const offlinePeople = {};
      offlinePeopleArr.forEach(p => {
        offlinePeople[p._id] = p;
      })
      setOfflinePeopleList(offlinePeople);
    })
  }, [onlinePeopleList])


  useEffect(() => {
    async function getMessages() {
      if (selectedUser) {
        const fetchingMessages = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/messages/${selectedUser}`, {
          headers: {
            "Access-Control-Allow-Origin": import.meta.env.VITE_ORIGIN_URL,
            "Access-Control-Allow-Method": "GET",
          },
          withCredentials: true,
        });
        setMessages(fetchingMessages.data)
      }
    }
    getMessages();
  }, [selectedUser])

  return (
    <div className='flex w-full h-[100vh]'>
      <Contacts onlinePeopleList={onlinePeopleList} selectedUser={selectedUser} setSelectedUser={setSelectedUser} offlinePeopleList={offlinePeopleList} setWs={setWs} />

      <Messages ref={scrollRef} selectedUser={selectedUser} newMessage={newMessage} setNewMessage={setNewMessage} messages={messages} sendMessage={sendMessage} />
    </div>
  )
}

export default Chat
