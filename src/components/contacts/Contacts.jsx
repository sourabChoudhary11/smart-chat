import { FaRocketchat } from "react-icons/fa"
import Avatar from "../avatar/Avatar"
import { useContext } from "react";
import { UserContext } from "../userContext/UserContext";
import axios from "axios"

const Contacts = ({ onlinePeopleList, selectedUser, setSelectedUser, offlinePeopleList, setWs }) => {

  const { id, setId, loggedInUsername, setLoggedInUsername } = useContext(UserContext);

  const peopleExceptMe = { ...onlinePeopleList };

  delete peopleExceptMe[id];

  const logoutHandler = async () => {
    await axios.get(`${import.meta.env.VITE_BACKEND_URL}/logout`, {
      headers: {
        "Access-Control-Allow-Origin": import.meta.env.VITE_ORIGIN_URL,
        "Access-Control-Allow-Method": "GET",
      },
      withCredentials: true,
    });
    setLoggedInUsername(null);
    setId(null) 
    setWs(null)
  }

  return (
    <div className="w-1/3 text-black flex flex-col">
      <div className='font-medium flex place-items-center justify-center space-x-2 p-5'>

        <FaRocketchat className='text-indigo-500 text-2xl' />

        <h1 className='text-xl text-indigo-500 font-bold'>SmartChat</h1>

      </div>

      <div className="flex-grow">

        {
          Object.keys(peopleExceptMe).map(userId => (
            <div
              key={userId}
              onClick={() => setSelectedUser(userId)}
              className={`flex items-center cursor-pointer space-x-1 p-1 ${selectedUser === userId ? 'bg-indigo-300 pl-10' : ''}`}
            >

              <Avatar
                online={true}
                userId={userId}
                username={peopleExceptMe[userId]} />

              <span className="flex-grow">
                {peopleExceptMe[userId]}
              </span>
            </div>
          ))
        }
        {
          Object.keys(offlinePeopleList).map(userId => (
            <div
              key={userId}
              onClick={() => setSelectedUser(userId)}
              className={`flex items-center cursor-pointer space-x-1 p-1 ${selectedUser === userId ? 'bg-indigo-300 pl-10' : ''}`}
            >

              <Avatar
                online={false}
                userId={userId}
                username={offlinePeopleList[userId].username} />

              <span className="flex-grow">
                {offlinePeopleList[userId].username}
              </span>
            </div>
          ))
        }
      </div>
      <div className="flex items-center justify-between p-5">
        <span className="text-md">{loggedInUsername}</span>
        <button onClick={logoutHandler} className="text-white text-md border-none px-2 py-1 bg-indigo-700 rounded-md active:bg-indigo-600">Logout</button>
      </div>
    </div>
  )
}

export default Contacts