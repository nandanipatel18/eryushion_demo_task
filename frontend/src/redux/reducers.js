const initialState = {
  students: [],
  admin: null,
  user: null,
  error: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'LOGIN_FAILURE':
      return { ...state, error: action.error, isAuthenticated: false };
    case 'REGISTER_SUCCESS':
      return { ...state, user: action.payload };
    case 'REGISTER_FAILURE':
      return { ...state, error: action.error };
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false };
    default:
      return state;
  }
};

export const studentReducer = (state = initialState, action) => {
  console.log(action)
  console.log(state)
  switch (action.type) {
    case 'FETCH_STUDENTS_SUCCESS':
      return { ...state, student: action.payload };
    case 'FETCH_STUDENTS_FAILURE':
      return { ...state, error: action.error };
    case 'UPDATE_STUDENT_SUCCESS':
      return {
        ...state,
        students: state.students.map((student) =>
          student.id === action.payload.id ? action.payload : student
        ),
        student: state.student && state.student.id === action.payload.id ? action.payload : state.student
      };
    case 'DELETE_STUDENT_SUCCESS':
      return {
        ...state,
        students: state.students.filter((student) => student.user_id !== action.payload),
      };
    default:
      return state;
  }
};


export const adminsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ADMINS_SUCCESS':
      return { ...state, admins: action.payload };
    case 'UPDATE_ADMIN_SUCCESS':
      return {
        ...state,
        admins: state.admins.map((admin) =>
          admin.id === action.payload.id ? action.payload : admin
        ),
      };
    case 'DELETE_ADMIN_SUCCESS':
      console.log(state.admins)
      console.log(action.payload)
      return {
        ...state,
        admins: state.admins.filter((admin) => admin.user_id !== action.payload),
      };
    default:
      return state;
  }
};
