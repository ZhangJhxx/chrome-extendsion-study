import React, { useEffect, useState, useReducer } from 'react';
import { initialState, reducer } from './popupReducer'
const classNames = require('classnames');
import "./popup.scss"

function Popup() {
  const [bookmark, setBookmark] = useState([]);
  const [hoverObj, setHoverObj] = useState({});
  const [state, dispatch] = useReducer(reducer, initialState);
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

  let index = 0;
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
                      <span>{bm.title}</span>
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
                    <button onClick={() => { dispatch({ type: 'show_edit', payload:{ id:bm.id,title: bm.title
                    
                     }}) }}>edit</button>
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
    <div>
      <div className={classNames("mask", { "show_mask": state.show_del_mask || state.show_edit_mask })}>
        <div className="mask_container">
          <div className={classNames("del_container", { "show_del_container": state.show_del_mask })}>
            <button className="delete_it" onClick={() => { dispatch({ type: 'done_delete' }) }}>Yes,delete it</button>
            <button className="cancel_it" onClick={() => { dispatch({ type: 'cancel' }) }}>Cancel</button>
          </div>
          <div className={classNames("edit_container", { "show_edit_container": state.show_edit_mask })}>
            <div className="col_title">
              <span>Edit Title</span>
              <span className="iconfont icon-close2" onClick={() => { dispatch({ type: 'cancel'})}}></span>
            </div>
            <div className="col_input">
              <input type="text" name="changedTitle" />
            </div>
            <div className="col_edit_btn">
              <button className="edit_it" onClick={() => { dispatch({ type: 'done_edit' }) }}>Save</button>
              <button className="cancel_it" onClick={() => { dispatch({ type: 'cancel' }) }}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
      {generateList(bookmark)}
    </div>
  )
}

export default Popup