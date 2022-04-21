import React, { useEffect, useState, useReducer, createContext, useDeferredValue } from 'react';
import { initialState, reducer } from './popupReducer';
import Edit_Del from '../../components/popup/edit_del.jsx';
import { useESC } from "../../hooks/useESC.jsx";
import "./popup.scss"

const classNames = require('classnames');
export const Context = createContext(null);

function Popup() {
  const [bookmark, setBookmark] = useState([]);
  const [hoverObj, setHoverObj] = useState({});
  const deferredHoverObj = useDeferredValue(hoverObj, {
    timeoutMs: 500
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  useESC(() => dispatch({ type: 'cancel' }));

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
                      <input type="checkbox" id={bm.title + bm.id} />
                      <label htmlFor={bm.title + bm.id} className="folder">
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
                  <div className={classNames("default_close", { "show_editBtn": !!deferredHoverObj[bm.id] })}>
                    <button
                      onClick={() => { dispatch({ type: 'show_edit', payload: { id: bm.id, title: bm.title } })}}
                      className="operate_btn edit_btn">
                      edit
                    </button>
                    <button
                      onClick={() => { dispatch({ type: 'show_delete', payload: bm.id })}}
                      className="operate_btn delete_btn"
                    >
                      delete
                    </button>
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
    <Context.Provider value={{ state, dispatch }}>
      <Edit_Del />
      {generateList(bookmark)}
    </Context.Provider>
  )
}

export default Popup