const initState = {
    idToken:null,
    userId:null,
    authenticated:false,
    loading:false,
    error:null
}
const authReducer = (state=initState, action)=>{
    switch(action.type){
        case 'AUTH_SUCCESS':
            return{
                ...state,
                idToken: action.idToken,
                userId: action.userId,
                authenticated:true,
                loading:false,
                error:null
            }
        case "AUTH_LOGOUT":
            return{
                ...state,
                idToken:null,
                userId:null,
                authenticated:false,
                error:null
            }
        case 'AUTH_START':
            return{
                ...state,
                loading:true,
                error:null
            }
        case 'AUTH_FAIL':
                return{
                    ...state,
                    loading:false,
                    error:action.error
                }       
        default:
            return state;
    }
};
export default authReducer;