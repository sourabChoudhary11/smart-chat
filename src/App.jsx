import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import UserContextProvider from "./components/userContext/UserContext"
import ExplicitRoutes from "./Routes"

const App = () => {

  return (
    <>
      <Router>
        <Toaster toastOptions={{
          duration: 3000,
          style: {
            background: '#6366f1',
            color: 'white',
            top: '20px',
          }
        }} />
        <Routes>
          <Route path="/" element={
            <UserContextProvider>
              <ExplicitRoutes />
            </UserContextProvider>
          } />
        </Routes>
      </Router>
    </>

  )
}

export default App