import RegisterAndLogin from "./pages/registerAndLogin/RegisterAndLogin"
import { useContext } from "react"
import { UserContext } from "./components/userContext/UserContext"
import Chat from "./pages/chat/Chat";

const ExplicitRoutes = () => {

    const { loggedInUsername, id } = useContext(UserContext);

    if(loggedInUsername) return <Chat /> ;

    return (
        <>
        <RegisterAndLogin />
        </>
  )
}

export default ExplicitRoutes