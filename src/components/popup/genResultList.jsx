import React from 'react';

const GenerateResultList = ({results}) => {
  return (
    <ul>
      {
        results.map(result => (
          <li className="li_item" key={result.id}>
            <div className="res_item_wrapper">
              <div className="res_item_title">
                <span className="iconfont icon-chrome-line"></span>
                <a href={result.url} target="_blank">{result.title}</a>
              </div>
              <div className="detail">
                <span className="detail_path">
                  「{result.resPath}」
                </span>
                <span className="detail_path">
                  {result.url}
                </span>
              </div>
            </div>
          </li>
        ))
      }
    </ul>
  )
}
export default GenerateResultList