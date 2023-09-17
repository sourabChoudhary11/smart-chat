import { forwardRef } from "react"
import ConversationMessages from "./conversationMessages/ConversationMessages"
import SendMessage from "./sendMessage/SendMessage"

const Messages = forwardRef(({selectedUser, newMessage, setNewMessage, sendMessage, messages}, ref) => {

  return (
    <div className="w-2/3 flex flex-col bg-indigo-300 p-2">
        <ConversationMessages selectedUser={selectedUser} messages={messages} newMessage={newMessage} ref={ref} />
        {
          selectedUser && <SendMessage newMessage={newMessage} setNewMessage={setNewMessage} sendMessage={sendMessage} />
        }
    </div>
  )
})

export default Messages