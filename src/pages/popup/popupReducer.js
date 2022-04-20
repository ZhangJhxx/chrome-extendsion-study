export const initialState = {
  deleteBookmarkId: 0,
  editBookmarkId: 0,
  show_del_mask: false,
  show_edit_mask: false,
  notify: true,
  edit_value: ""
}
export function reducer(state, action) {
  switch (action.type) {
    case "show_delete":
      return {
        ...state,
        show_del_mask: true,
        deleteBookmarkId: action.payload
      }
    case "show_edit":
      return {
        ...state,
        show_edit_mask: true,
        editBookmarkId: action.payload
      }
    case "done_delete":
      chrome.bookmarks.remove(String(state.deleteBookmarkId));
      return {
        ...state,
        show_del_mask: false,
        notify: !state.notify
      }
    case "cancel":
      return {
        ...state,
        show_del_mask: false,
        show_edit_mask:false,
      }
    case "done_edit":
      return {
        ...state,
        show_edit_mask: false,
      }
    default:
      return state;
  }
}

