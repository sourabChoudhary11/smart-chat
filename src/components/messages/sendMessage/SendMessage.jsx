import { BiSend } from "react-icons/bi"
import {RiAttachment2} from "react-icons/ri"

const SendMessage = ({ newMessage, setNewMessage, sendMessage }) => {

  const sendFile = (e)=>{
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = ()=>{
      sendMessage(e, {
        name: e.target.files[0].name,
        data: reader.result,
      })
    }
  }
  
  return (
    <form className="flex justify-center p-3" onSubmit={sendMessage}>
      <input
        minLength={1}
        value={newMessage} 
        onChange={
          (e) => setNewMessage(e.target.value)
        }
        className="p-1 flex-grow rounded-l-md outline-none" 
        type="text" 
        placeholder="write message here" />

      <label type="button" className="text-2xl text-gray-500 bg-blue-200 p-1 cursor-pointer active:bg-blue-300">
        <input type="file" className="hidden" onChange={sendFile}/>
        <RiAttachment2 />
      </label>

      <button type="submit" className="rounded-r-md bg-blue-600 px-2 text-white active:bg-blue-500">
        <BiSend />
      </button>

    </form>
  )
}

export default SendMessage