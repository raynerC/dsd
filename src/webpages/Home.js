import React from "react";
import Sidebar from '../Sidebar';
import Chat from '../Chat';
import Gamebar from '../Gamebar';
import '../App.css';

function Home() {
    return (
    <div className="app">
        <Sidebar/>
        <Chat/>
        <Gamebar/>
    </div>
    );
}

export default Home;