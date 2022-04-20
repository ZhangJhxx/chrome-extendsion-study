export const initialState = {
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
        editBookmarkId: action.payload
      }
    case "show_edit":
      return {
        ...state,
        show_edit_mask: true,
        editBookmarkId: action.payload['id'],
        edit_value: action.payload['title'],
      }
    case "done_delete":
      chrome.bookmarks.remove(String(state.editBookmarkId));
      return {
        ...state,
        show_del_mask: false,
        notify: !state.notify
      }
    case "cancel":
      return {
        ...state,
        show_del_mask: false,
        show_edit_mask: false,
      }
    case "change_edit_value":
      return {
        ...state,
        edit_value: action.payload,
      }
    case "done_edit":
      chrome.bookmarks.update(String(state.editBookmarkId), {
        title: state.edit_value
      });
      return {
        ...state,
        show_edit_mask: false,
        notify: !state.notify
      }
    default:
      return state;
  }
}

