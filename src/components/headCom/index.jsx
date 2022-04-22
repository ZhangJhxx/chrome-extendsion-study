import React from 'react'

function HeadBar({title, closeEvent}) {
  return (
    <div className="col_title">
      <span>{title}</span>
      <span className="iconfont icon-close2" onClick={ closeEvent }></span>
    </div>
  )
}

export default HeadBar