import React, {useContext} from 'react'
const classNames = require('classnames');
import cloneDeep from 'lodash/cloneDeep';
import { Context } from "../../pages/popup/popup.jsx"


function TitleLabel({ bm, openList,moveBookmarkId, deferredHoverObj, handleMouseEvent, handleSetOpenList }) {
  const { _, dispatch } = useContext(Context);
  async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }
  const add = async (bm, event) => {
    event.preventDefault();
    let tab = await getCurrentTab();
    dispatch({
      type: 'show_add_mask', payload: {
        url: tab.url,
        title: tab.title,
        parentId: bm.id
      }
    })
  }
  const handleDragEnter = (bm, e) => {
    e.preventDefault();
    document.getElementById(bm.title + bm.id).checked = true;
    while (openList.length > 0 && openList[openList.length - 1].id !== bm.parentId) {
      let { id, title } = openList.pop();
      const input = document.getElementById(title + id)
      if (input) input.checked = false;
    }
    openList.push({ id: bm.id, title: bm.title });
    handleSetOpenList(cloneDeep(openList));
  }

  const handleDrop = (bm, e) => {
    e.preventDefault();
    dispatch({ type: 'done_move', payload: { id: moveBookmarkId, parentId: bm.id, index: bm.children.length } })
  }

  return (
    <label
      htmlFor={bm.title + bm.id}
      className="folder_label"
      onDragEnter={(e) => { handleDragEnter(bm, e) }}
      onDragOver={(e) => { e.preventDefault() }}
      onDrop={(e) => { handleDrop(bm, e) }}
      onMouseEnter={() => handleMouseEvent(bm.id, true)}
      onMouseLeave={() => handleMouseEvent(bm.id, false)}>
      <span className="folder_title">
        <i className="iconfont icon-right"></i>
        <i className="iconfont icon-folder-fill" style={{ paddingRight: "10px" }}></i>
        <span>{bm.title}</span>
      </span>
      <div className="btn_group">
        <span
          className={classNames("folder_add_btn", { "show_folder_btn": deferredHoverObj[bm.id] })}
          onClick={(e) => add(bm, e)}
        >+
        </span>
        <span
          className={classNames("folder_remove_btn", { "show_folder_btn": deferredHoverObj[bm.id] })}
          onClick={() => dispatch({ type: 'show_delete', payload: { id: bm.id, children: bm.children } })}
        >-
        </span>
      </div>
    </label>
  )
}

export default TitleLabel