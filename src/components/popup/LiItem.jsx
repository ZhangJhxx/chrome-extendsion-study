import React, { useContext } from 'react'
const classNames = require('classnames');
import cloneDeep from 'lodash/cloneDeep';
import { Context } from "../../pages/popup/popup.jsx"

function LiItem({ bm, openList,moveBookmarkId, deferredHoverObj, handleMouseEvent,handleSetMoveBookmark, handleSetOpenList }) {
  
  const { _, dispatch } = useContext(Context);

  const handleDragEnterChild = (bm, e) => {
    e.preventDefault();
    e.target.classList.add("chosen");
    while (openList.length > 0 && openList[openList.length - 1].id !== bm.parentId) {
      openList.pop();
    }
    openList.push({ id: bm.id, title: bm.title });
    handleSetOpenList(cloneDeep(openList));
  }
  const handleDragLeaveChild = (e) => {
    e.preventDefault();
    e.target.classList.remove("chosen")
  }

  const handleDropChildren = (bm, e) => {
    e.preventDefault();
    e.target.classList.remove("chosen")
    console.log(bm);
    console.log(moveBookmarkId);
    dispatch({ type: 'done_move', payload: { id: moveBookmarkId, parentId: bm.parentId, index: bm.index + 1 } })
  }

  return (
    <li
      className="li_item"
      draggable="true"
      onDragEnter={(e) => { handleDragEnterChild(bm, e) }}
      onDragLeave={(e) => { handleDragLeaveChild(e) }}
      onDragOver={(e) => { e.preventDefault() }}
      onDrop={(e) => { handleDropChildren(bm, e) }}
      onDragStart={(e) => { handleSetMoveBookmark(bm.id) }}
      onMouseEnter={() => handleMouseEvent(bm.id, true)}
      onMouseLeave={() => handleMouseEvent(bm.id, false)}
    >
      {
        deferredHoverObj[bm.id] ?
          <i className="iconfont icon-open" style={{ paddingRight: "5px", color: "red" }}></i> :
          <i className="iconfont icon-bookmarks" style={{ paddingRight: "5px" }}></i>
      }
      <a href={bm.url} target="_blank">{bm.title}</a>
      <div className={classNames("default_close", { "show_editBtn": deferredHoverObj[bm.id] })}>
        <button
          onClick={() => dispatch({ type: 'show_edit', payload: { id: bm.id, title: bm.title } })}
          className="operate_btn edit_btn">
          edit
        </button>
        <button
          onClick={() => dispatch({ type: 'show_delete', payload: { id: bm.id, children: [] } })}
          className="operate_btn delete_btn"
        >
          delete
        </button>
      </div>
    </li>
  )
}

export default LiItem