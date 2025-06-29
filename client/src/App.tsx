import Register from "./pages/user/Register"
import Login from "./pages/user/Login"
import {BrowserRouter, Routes,Route} from 'react-router-dom'
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/user/signup" element={<Register/>}/>
      <Route path="/user/Login" element={<Login/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
