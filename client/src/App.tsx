import Register from "./pages/user/Register"
import Login from "./pages/user/Login"
import Home from "./pages/user/Home"
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import RequireAuth from "./features/Protect/RequireAuth"
import Profile from "./pages/user/Profile"
import { ToastContainer } from "react-toastify";
import IsLogout from "./features/Protect/isLogut"
import Dashboard from "./pages/admin/Dashboard"
import AdminLogin from "./pages/admin/Login"
import "react-toastify/dist/ReactToastify.css";
import RequireAdmin from "./features/Protect/RequireAdmin"
import IsLogoutAdmin from "./features/Protect/isLogoutAdmin"
import Counter from "./components/user/Counter"
function App() {

  return (
    <>
    <BrowserRouter>
    <ToastContainer position="top-right" autoClose={3000} />
    <Routes>
      <Route path='/user/counter' element={<Counter/>}/>
      <Route path="/user/signup" element={<IsLogout><Register/></IsLogout>}/>
      <Route path="/user/Login" element={<IsLogout><Login/></IsLogout>}/>
      <Route path='/user/home' element={<RequireAuth><Home/></RequireAuth>}/>
      <Route path='/user/profile' element={<RequireAuth><Profile/></RequireAuth>}/>
      <Route path='/admin/dashboard' element={<RequireAdmin><Dashboard/></RequireAdmin>}/>
      <Route path='/admin/login' element={<IsLogoutAdmin><AdminLogin/></IsLogoutAdmin>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
