const initState = {
    text:''
}
const filterReducer = (state=initState, action)=>{
    switch(action.type){
        case "BY_TITLE":
            return{
                ...state,
                text: action.text
            }
        default:
            return state;
    }
};
export default filterReducer;