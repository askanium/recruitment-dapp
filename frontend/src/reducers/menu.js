export const CHANGE_TITLE = 'menu/CHANGE_TITLE';

const initialState = {
  title: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TITLE:
      return {
        ...state,
        title: action.title
      };

    default:
      return state
  }
}
