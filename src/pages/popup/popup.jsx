import React, { useEffect, useState, useReducer, createContext } from 'react';
import { initialState, reducer } from './popupReducer';
import Edit_Del from '../../components/popup/edit_del.jsx';
import "./popup.scss"

const classNames = require('classnames');
export const Context = createContext(null);

function Popup() {
  const [bookmark, setBookmark] = useState([]);
  const [hoverObj, setHoverObj] = useState({});
  const [state, dispatch] = useReducer(reducer, initialState);

  let index = 0;
  useEffect(() => {
    chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
      setBookmark(bookmarkTreeNodes);
    });
  }, [state.notify]);
  const handleMouseEvent = (idx, bool) => {
    setHoverObj(hoverObj => {
      return { ...hoverObj, [idx]: bool }
    });
  }

  const generateList = (bookmark) => {
    index++;
    return (
      <ul
        key={bookmark[0] ? bookmark[0].dateAdded : index}
        className="ul_wrapper">
        {
          bookmark.map((bm) => {
            if (bm.children) {
              return (
                bm.title ?
                  (
                    <div key={bm.id}>
                      <input type="checkbox" id={bm.title+bm.id} />
                      <label htmlFor={bm.title+bm.id} className="folder">
                        <span>{bm.title}</span>
                        <i className="iconfont icon-down"></i>
                      </label>
                      {generateList(bm.children)}
                    </div>
                  ) : generateList(bm.children)
              )
            } else {
              return (
                <li key={bm.id}
                  className="li_item"
                  onMouseEnter={() => handleMouseEvent(bm.id, true)}
                  onMouseLeave={() => handleMouseEvent(bm.id, false)}
                >
                  <span>{bm.title}</span>
                  <div className={classNames("default_close", { "show_editBtn": !!hoverObj[bm.id] })}>
                    <button onClick={() => { dispatch({ type: 'show_edit', payload: { id: bm.id, title: bm.title } }) }}>edit</button>
                    <button onClick={() => { dispatch({ type: 'show_delete', payload: bm.id }) }}>delete</button>
                  </div>
                </li>
              )
            }
          })
        }
      </ul>
    )
  }
  return (
    <Context.Provider value={{state, dispatch}}>
      <Edit_Del />
      {generateList(bookmark)}
    </Context.Provider>
  )
}

export default Popup