import {CHANGE_TITLE} from "../reducers/menu";

export const setTitleAction = (title) => {
  return dispatch => {
    dispatch({
      type: CHANGE_TITLE,
      title
    });
  }
};
