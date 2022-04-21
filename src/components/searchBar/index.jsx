import React,{ useState, useEffect  } from 'react'
import { useDebounce } from "../../hooks/useDebounce.jsx"
import "./searchBar.scss" 

function SearchBar({handleSetResult}) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);
  useEffect(()=>{
    chrome.bookmarks.search(debouncedQuery,(results)=>{
      handleSetResult(results);
      console.log(results);
    })
  },[debouncedQuery])
  const handleSubmit = (e)=>{ 
    e.preventDefault();
  //   chrome.bookmarks.search(query,(results)=>{
  //     console.log(results);
  //   })
  }
  const handleOnChange = (e)=>{
    setQuery(e.target.value)
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