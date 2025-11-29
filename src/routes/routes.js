import './../App.css';
import { AuthContext } from '../context/AuthContext';
import "./../styles/globals.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from './../pages/signup/signup';
import Login from './../pages/login/login';
import Chatpage from './../pages/chatpage/chatpage';
import { useContext } from 'react';
import Navbar from '../components/Navbar/navbar';
import { ChatContextProvider } from '../context/ChatContext';

export default function Routing() {
    const { user } = useContext(AuthContext)
    return (
        <BrowserRouter>
            <ChatContextProvider user={user}>
                <Navbar />
                <Routes>
                    <Route path='/' element={user ? <Chatpage /> : <Login />}></Route>
                    <Route path='/Signup' element={<Signup />}></Route>
                    <Route path='/Chatpage' element={user ? <Chatpage /> : <Login />}></Route>
                </Routes>
            </ChatContextProvider>
        </BrowserRouter>
    );
}