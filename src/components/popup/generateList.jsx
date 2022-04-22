import React, { useContext, useDeferredValue, useState } from 'react'
const classNames = require('classnames');
import { Context } from "../../pages/popup/popup.jsx"

const GenList = ({bookmark}) => {
  let index = 0;
  const [hoverObj, setHoverObj] = useState({});
  const { state, dispatch } = useContext(Context);
  const handleMouseEvent = (idx, bool) => {
    setHoverObj(hoverObj => {
      return { ...hoverObj, [idx]: bool }
    });
  }
  const deferredHoverObj = useDeferredValue(hoverObj, {
    timeoutMs: 500
  });

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
                    <div key={bm.id} className="folder">
                      <input type="checkbox" id={bm.title + bm.id} />
                      <label
                        htmlFor={bm.title + bm.id}
                        className="folder_label"
                        onMouseEnter={() => handleMouseEvent(bm.id, true)}
                        onMouseLeave={() => handleMouseEvent(bm.id, false)}>
                        <span className="folder_title">
                          <span>{bm.title}</span>
                          <span className={classNames("folder_add_btn", { "show_folder_add_btn": !!deferredHoverObj[bm.id] })}>+</span>
                        </span>
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
                  <a href={bm.url} target="_blank">{bm.title}</a>
                  <div className={classNames("default_close", { "show_editBtn": !!deferredHoverObj[bm.id] })}>
                    <button
                      onClick={() => { dispatch({ type: 'show_edit', payload: { id: bm.id, title: bm.title } }) }}
                      className="operate_btn edit_btn">
                      edit
                    </button>
                    <button
                      onClick={() => { dispatch({ type: 'show_delete', payload: bm.id }) }}
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
    <>
      {generateList(bookmark)}
    </>
  )
}

export default GenList;