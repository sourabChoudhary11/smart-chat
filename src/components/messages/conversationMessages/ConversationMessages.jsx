import React, { useContext } from "react";
import { UserContext } from "../../userContext/UserContext";

const ConversationMessages = React.forwardRef(({ selectedUser, messages }, ref) => {

  const {id} = useContext(UserContext);

  return (
    <>
      {
        !selectedUser && <div className="text-xl font-medium text-center text-gray-600 flex-grow flex items-center justify-center">
          &larr; Select user for the conversation
        </div>
      }
      {
        selectedUser && <div className="flex-grow space-y-1 overflow-auto text-sm px-3 py-0">
          {
            messages.length>0 && messages.map(message => (
              <div key={message.id} className={`break-all flex ${message.sender===id ? 'justify-end' : 'justify-start'}`}>
                <span className={`px-2 py-1 rounded-xl ${message.sender===id ? 'bg-blue-600 text-white' : 'bg-white'}`}>
                  {message.text.length>0 && message.text}
                  {message.file && (
                    <a className="underline" target="_blank" href={import.meta.env.VITE_BACKEND_URL+'/uploads/'+message.file}>
                      {message.file}
                    </a>
                  )}
                </span>
              </div>
            )
            )
          }
          <div ref={ref}></div>
        </div>
      }
    </>
  )
})

export default ConversationMessages
