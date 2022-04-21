import React from 'react'
import "./searchBar.scss"
function SearchBar() {
  return (
    <div class="search bar3">
        <form>
            <input type="text" placeholder="请输入您要搜索的内容..."/>
            <button type="submit"></button>
        </form>
    </div>
  )
}

export default SearchBar