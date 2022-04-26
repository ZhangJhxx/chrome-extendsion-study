import React, {  useDeferredValue, useState } from 'react'
import TitleLabel from "./TitleLabel.jsx"
import LiItem from "./LiItem.jsx";

const GenList = ({ bookmark }) => {
  let index = 0;
  const [hoverObj, setHoverObj] = useState({});
  const [moveBookmarkId, setMoveBookmarkId] = useState("");
  const [openList, setOpenList] = useState([]);
  const handleMouseEvent = (idx, bool) => {
    setHoverObj(hoverObj => {
      return { ...hoverObj, [idx]: bool }
    });
  }
  const deferredHoverObj = useDeferredValue(hoverObj, {
    timeoutMs: 500
  });

  const handleSetOpenList = (newOpenList) => {
    setOpenList([...newOpenList]);
  }
  const handleSetMoveBookmark = (newMoveBookmark) => {
    setMoveBookmarkId(newMoveBookmark)
  }

  const generateList = (bookmark) => {
    index++;
    return (
      <ul
        key={bookmark[0] ? bookmark[0].dateAdded : index}
        className="ul_wrapper">
        {
          bookmark.map((bm) => {
            if (bm.children) {
              return (
                bm.title ?
                  (
                    <div key={bm.id}
                      className="folder"
                    >
                      <input type="checkbox" id={bm.title + bm.id} />
                      <TitleLabel
                        bm={bm}
                        openList={openList}
                        moveBookmarkId={moveBookmarkId}
                        deferredHoverObj={deferredHoverObj}
                        handleMouseEvent={handleMouseEvent}
                        handleSetOpenList={handleSetOpenList} />
                      {generateList(bm.children)}
                    </div>
                  ) : generateList(bm.children)
              )
            } else {
              return (
                <LiItem
                  key={bm.id}
                  bm={bm}
                  moveBookmarkId={moveBookmarkId}
                  openList={openList}
                  deferredHoverObj={deferredHoverObj}
                  handleSetMoveBookmark={handleSetMoveBookmark}
                  handleMouseEvent={handleMouseEvent}
                  handleSetOpenList={handleSetOpenList} />
              )
            }
          })
        }
      </ul>
    )
  }

  return (
    <div style={{ marginLeft: "-10px" }}>
      {generateList(bookmark)}
    </div>
  )
}

export default GenList;