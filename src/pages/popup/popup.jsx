import React, { useEffect, useState, useReducer, createContext } from 'react';
import { initialState, reducer } from './popupReducer';
import Edit_Del from '../../components/popup/edit_del.jsx';
import GenerateResultList from '../../components/popup/genResultList.jsx';
import GenList from '../../components/popup/generateList.jsx';
import SearchBar from "../../components/searchBar/index.jsx"
import { useESC } from "../../hooks/useESC.jsx";
import "./popup.scss"

export const Context = createContext(null);

function Popup() {
  const [bookmark, setBookmark] = useState([]);
  const [results, setResults] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);
  useESC(() => dispatch({ type: 'cancel' }));
  useEffect(() => {
    chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
      setBookmark(bookmarkTreeNodes);
    });
  }, [state.notify]);
  
  return (
    <Context.Provider value={{ state, dispatch }}>
      <SearchBar handleSetResult={(queryResult) => setResults(queryResult)} />
      <Edit_Del />
      {results.length > 0 ? <GenerateResultList results={results} /> : <GenList bookmark={bookmark} />}
    </Context.Provider>
  )
}

export default Popup