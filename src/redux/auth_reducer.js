const initialState = {
    name: '',
    userid: 0,
  };
  
  const UPDATE_USER = "UPDATE_USER";
  
  export function updateUser(user) {
    console.log('update user fired!')
    return {
      type: UPDATE_USER,
      payload: user
    };
  }
  
  export default function authReducer(state = initialState, action) {
    switch (action.type) {
      case UPDATE_USER:
          const { name, userid } = action.payload;
          return { ...state, name, userid };
      
      default:
        // console.log('its screwed')
        return state;
    }
  }