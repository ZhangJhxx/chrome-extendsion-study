import React from 'react'

function ButtonBar({ msg, doneFunc, closeEvent }) {
  return (
    <div className="col_edit_btn">
      <button className="funcType" onClick={ doneFunc }>{ msg }</button>
      <button className="cancel_it" onClick={ closeEvent }>Cancel</button>
    </div>
  )
}

export default ButtonBar