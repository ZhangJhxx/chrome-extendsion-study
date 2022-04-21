import React from 'react';
import { createRoot } from 'react-dom/client';
import "./index.scss"
import "./assects/reset.css"
import "./assects/fonts/iconfont.css"
import Popup from "./pages/popup/popup.jsx";

const container = document.getElementById('app');
const root = createRoot(container); 
root.render(<Popup />);