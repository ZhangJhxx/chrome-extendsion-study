import React, { useContext } from 'react'
const classNames = require('classnames');
import { Context } from "../../pages/popup/popup.jsx"
import HeadBar from "../headCom/index.jsx"
import ButtonBar from "../buttonCom/index.jsx"
import "./edit_del.scss"

function Edit_Del() {
  const { state, dispatch } = useContext(Context);
  const handleEdit = (event) => {
    if (event.keyCode === 13) {
      dispatch({ type: 'done_edit', payload: event.target.value })
    }
  }
  return (
    <div className={classNames("mask", { "show_mask": state.show_del_mask || state.show_edit_mask || state.show_add_mask })}>
      <div className="mask_container">
        <div className={classNames("container", { "show_container": state.show_del_mask })}>
          <HeadBar title="Delete Item" closeEvent={() => dispatch({ type: 'cancel' })} />
          <ButtonBar
            msg="Yes, Delete it"
            doneFunc={() => dispatch({ type: 'done_delete' })}
            closeEvent={() => dispatch({ type: 'cancel' })} /
          >
        </div>
        <div className={classNames("container", { "show_container": state.show_edit_mask })}>
          <HeadBar title="Edit Title" closeEvent={() => dispatch({ type: 'cancel' })} />
          <div className="col_input">
            <input type="text" name="changedTitle"
              value={state.bookmark ? state.bookmark['title'] : ""}
              onKeyUp={(event) => handleEdit(event)}
              onChange={(event) => dispatch({ type: 'change_edit_value', payload: event.target.value })} />
          </div>
          <ButtonBar
            msg="Save"
            doneFunc={() => dispatch({ type: 'done_edit' })}
            closeEvent={() => dispatch({ type: 'cancel' })} /
          >
        </div>
        <div className={classNames("container", { "show_container": state.show_add_mask })}>
          <HeadBar title="add a new bookmark" closeEvent={() => dispatch({ type: 'cancel' })} />
          <div className="col_input">
            <input type="text" name="addTitle"
              value={ state.add_bookmark_title }
              onChange={(event) => dispatch({ type: 'change_add_title', payload: event.target.value })} />
          </div>
          <div className="col_input">
            <input type="text" name="addTitle"
              value={state.add_bookmark_url}
              onChange={(event) => dispatch({ type: 'change_add_url', payload: event.target.value })} />
          </div>
          <ButtonBar
            msg="Add"
            doneFunc={() => dispatch({ type: 'done_add' })}
            closeEvent={() => dispatch({ type: 'cancel' })} 
          />
        </div>
      </div>
    </div>
  )
}

export default Edit_Del