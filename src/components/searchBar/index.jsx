import React,{ useState, useEffect  } from 'react'
import { useDebounce } from "../../hooks/useDebounce.jsx"
import PinyinMatch from 'pinyin-match'
import "./searchBar.scss" 

function SearchBar({handleSetResult}) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);
  useEffect(()=>{
    if(debouncedQuery.length>0){
      chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
        handleSetResult(getPath(bookmarkTreeNodes,debouncedQuery));
      });
    }
  },[debouncedQuery]);
  const getPath = (bookmarks,query) =>{
    const reg = new RegExp(query,"i");
    const res = [];
    const path = [];
    function dfs(bookmark){
      for(let i = 0; i < bookmark.length; i++){
        if(bookmark[i].children && bookmark[i].children.length>0){
          if(bookmark[i].title.trim().length>0){
            path.push(bookmark[i].title);
          }
          dfs(bookmark[i].children);
          path.pop();
        }else{
          if(reg.test(bookmark[i].title) || PinyinMatch.match(bookmark[i].title, query) !== false){
            const resItem = {
              id:bookmark[i].id,
              title:bookmark[i].title,
              url:bookmark[i].url,
              resPath: path.slice().join("-")
            }
            res.push(resItem);
          }
        }
      }
    }
    dfs(bookmarks);
    return res;
  }
  const handleSubmit = (e)=>{ 
    e.preventDefault();
  }
  const handleOnChange = (e)=>{
    setQuery(e.target.value);
  }
  return (
    <div className="search_container">
        <form className="search_form" onSubmit={ handleSubmit }>
            <input 
              type="text" 
              className="searchbar_input"
              value={ query }
              onChange={ handleOnChange }
              placeholder="bookmark search..."/>
            <button className="searchbar_submit" type="submit" />
        </form>
    </div>
  )
}

export default SearchBar