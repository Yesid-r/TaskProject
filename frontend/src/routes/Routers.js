import React,{Component} from "react";
import {Routes, Navigate, Route} from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import NotFound from "../components/NotFound";

class Routers extends Component{
    render(){
        return(
            <Routes>
                <Route path="/" element={<Navigate to="/home"/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        )
    }
}

export default Routers;