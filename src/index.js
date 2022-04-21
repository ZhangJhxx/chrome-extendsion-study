import React from 'react';
import { createRoot } from 'react-dom/client';
import Popup from "./pages/popup/popup.jsx";
import "./assects/reset.css"
import "./assects/fonts/iconfont.css"
import "./index.scss"

const container = document.getElementById('app');
const root = createRoot(container); 
root.render(<Popup />);