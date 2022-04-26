export const initialState = {
  bookmark: null,
  parentId: 0,
  show_del_mask: false,
  show_edit_mask: false,
  show_add_mask: false,
  add_bookmark_url: "",
  add_bookmark_title: "",
  notify: true,
}
export function reducer(state, action) {
  switch (action.type) {
    case "show_delete":
      return {
        ...state,
        show_del_mask: true,
        bookmark: { ...state.bookmark, ...action.payload }
      }
    case "show_edit":
      return {
        ...state,
        show_edit_mask: true,
        bookmark: { ...state.bookmark, ...action.payload },
      }
    case "show_add_mask":
      return {
        ...state,
        show_add_mask: true,
        parentId: action.payload['parentId'],
        add_bookmark_url: action.payload['url'],
        add_bookmark_title: action.payload['title'],
      }

    case "change_add_url":
      return {
        ...state,
        add_bookmark_url: action.payload,
      }
    case "change_add_title":
      return {
        ...state,
        add_bookmark_title: action.payload,
      }
    case "change_edit_value":
      return {
        ...state,
        bookmark: { ...state.bookmark, title: action.payload },
      }
    case "done_delete":
      state.bookmark.children.length ? 
      chrome.bookmarks.removeTree(state.bookmark.id) :
      chrome.bookmarks.remove(String(state.bookmark.id));
      return {
        ...state,
        show_del_mask: false,
        notify: !state.notify
      }
    case "done_add":
      chrome.bookmarks.create({
        parentId: String(state.parentId),
        url: state.add_bookmark_url,
        title: state.add_bookmark_title
      })
      return {
        ...state,
        show_add_mask: false,
        notify: !state.notify
      }
    case "done_edit":
      chrome.bookmarks.update(String(state.bookmark.id), {
        title: state.bookmark.title
      });
      return {
        ...state,
        show_edit_mask: false,
        notify: !state.notify
      }
    case "done_move":
      chrome.bookmarks.move(
        action.payload['id'],{
          parentId: action.payload['parentId'],
          index: action.payload['index']
        }
      );
      return {
        ...state,
        notify: !state.notify
      }

    case "cancel":
      return {
        ...state,
        show_del_mask: false,
        show_edit_mask: false,
        show_add_mask: false,
      }
    default:
      return state;
  }
}