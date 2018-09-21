const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: true,
  isConfirmed:false,
  isSuperuser:null,
  isExist:false,
  user: null,
  CustomerType:null,
  errors: {},
};


export default function auth(state=initialState, action) {

  switch (action.type) {
    case 'USER_LOADING':
      return {...state, isLoading: true};
    case 'USER_LOADED':

      return {...state,
      ...action.data,
      isLoading: false,
     };

    case 'LOGIN_SUCCESSFUL':
      localStorage.setItem("token", action.data.token);
    case 'REGISTRATION_SUCCESSFUL':
      return {...state, ...action.data, isLoading: false,  errors: null};

    case 'AUTHENTICATION_ERROR':
    case 'LOGIN_FAILED':
    case 'LOGOUT_SUCCESSFUL':
      localStorage.removeItem("token");
      return {...state, errors: action.data, token: null, user: null,
      isAuthenticated: false, isLoading: false};

    default:
      return state;
  }
}



