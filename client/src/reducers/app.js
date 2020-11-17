const init = {
  user: {
    isLogin: false
  },
  state:{
    loading: false,
    error: false,
    success: false
  }
};

const App = (prevState = init, action) => {
  switch (action.type) {
  case 'SAVE_USER':
   return {
      ...prevState,
      user: {...prevState.user, ...action.payload.user, isLogin: true},
    };
  case 'SET_STATE_SUCCESS':
    return {
      ...prevState,
      state:{
        success: true,
        error: false,
        loading: false
      },
    };
  case 'SET_STATE_LOADING':
    return {
      ...prevState,
      state:{
        success: false,
        error: false,
        loading: true
      }
    }; 
  case 'SET_STATE_ERROR':
    return {
      ...prevState,
      state:{
        success: false,
        error: true,
        loading: false
      }
    };
  default:
    return prevState;
  }
};

export default App;
