const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: true,
  isConfirmed:false,
  isSuperuser:null,
  isExist:false,
  success:false,
  user: null,
  ConfirmCompReq:null,
  CustomerType:null,
  errors: {},
  emailTxt:"",
  UIDTxt:"",
  TokenTxt:"",
  NewPassTxt:"",
  CompanyNo:"",
  CountRSC:0,
  ReqCompisLoading:true
};


export default function auth(state=initialState, action) {
  switch (action.type) {
    case 'ERRORS_RESET':
     return {...state, errors: {},success:false};
    case 'USER_LOGINNING':
    case 'USER_LOADING':
    case 'EMAILSENDING_LOADING': //test
    case 'PASSCONFIRM_LOGINNING':
      return {...state, isLoading: true, success:false};
    case 'USER_LOADED':
      return {...state,
      ...action.data,
      isLoading: false,
     };
    case 'PASSWORD_RESETTED':
    case 'PASSCONFIRM_SUCCESSFUL':
    return {...state,isLoading:false,success:true,emailTxt:"",UIDTxt:"",TokenTxt:"",NewPassTxt:""}
    case 'LOGIN_SUCCESSFUL':
      localStorage.setItem("token", action.data.token);

    case 'REGISTRATION_SUCCESSFUL':
      return {...state, ...action.data, isLoading: false,  errors: null};

    case 'REGISTRATION_PROCESSING':
      return {...state, isLoading: true};
    case 'FETCH_CountRSC':
      return {...state, CountRSC: action.CountRSC};

    case 'FETCHING_ConfirmCompReq':
            return {...state, ReqCompisLoading: true};

    case 'FETCH_ConfirmCompReq':
      return {...state, ConfirmCompReq: action.ConfirmCompReq,ReqCompisLoading:false};
    case 'CONFIRMRSC_RECIEVED':
      return {...state, ConfirmCompReq: action.data};


    case 'PASSWORDRESET_ERROR':
    case 'PASSCONFIRM_FAILED':
      return {...state, errors: action.data, isLoading: false,success:false};
    case 'AUTHENTICATION_ERROR':
    case 'LOGIN_FAILED':
    case 'REGISTRATION_FAILED':
    case 'LOGOUT_SUCCESSFUL':
      localStorage.removeItem("token");
      return {...state, errors: action.data, token: null, user: null,
      isAuthenticated: false, isLoading: false,success:false};
    case 'SET_LOADING_PER_COMP_REQ':
      let CompReq=state.ConfirmCompReq[action.id];
          CompReq.loading=true;
         state.ConfirmCompReq.splice(action.id,1,CompReq);
          return {...state,ConfirmCompReq:state.ConfirmCompReq};

    case 'SET_EMAIL_TXT':
       return {...state, emailTxt:action.data};
    case 'SET_UID_TXT':
       return {...state, UIDTxt:action.data};
    case 'SET_TOKEN_TXT':
       return {...state, TokenTxt:action.data};
    case 'SET_NEWPASS_TXT':
       return {...state, NewPassTxt:action.data};
    case 'PASS_CONFIRM_SUCCESS':
       return {...state, UIDTxt:"",TokenTxt:"",NewPassTxt:""};
    default:
      return state;
  }
}



