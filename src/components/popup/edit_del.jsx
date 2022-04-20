import React, { useContext } from 'react'
const classNames = require('classnames');
import { Context } from "../../pages/popup/popup.jsx"

function Edit_Del() {
  const { state, dispatch } = useContext(Context);

  return (
    <div className={classNames("mask", { "show_mask": state.show_del_mask || state.show_edit_mask })}>
      <div className="mask_container">
        <div className={classNames("del_container", { "show_del_container": state.show_del_mask })}>
          <div className="col_title">
            <span>Delete Item</span>
            <span className="iconfont icon-close2" onClick={() => { dispatch({ type: 'cancel' }) }}></span>
          </div>
          <div className="col_edit_btn">
            <button className="delete_it" onClick={() => { dispatch({ type: 'done_delete' }) }}>Yes,delete it</button>
            <button className="cancel_it" onClick={() => { dispatch({ type: 'cancel' }) }}>Cancel</button>
          </div>
        </div>
        <div className={classNames("edit_container", { "show_edit_container": state.show_edit_mask })}>
          <div className="col_title">
            <span>Edit Title</span>
            <span className="iconfont icon-close2" onClick={() => { dispatch({ type: 'cancel' }) }}></span>
          </div>
          <div className="col_input">
            <input type="text" name="changedTitle"
              value={state.edit_value}
              onChange={(event) => dispatch({ type: 'change_edit_value', payload: event.target.value })} />
          </div>
          <div className="col_edit_btn">
            <button className="edit_it" onClick={() => { dispatch({ type: 'done_edit' }) }}>Save</button>
            <button className="cancel_it" onClick={() => { dispatch({ type: 'cancel' }) }}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit_Del