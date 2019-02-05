import setAuthState , {SET_AUTHENTICATED,SET_PROFILE,SET_REDIRECT,SET_EVENT}  from './actions'
import { combineReducers } from 'redux'

// const initialState = {
//   isAuthenticated: false 
// }

function isAuthenticated(state, action) {
	switch(action.type){
	case SET_AUTHENTICATED:
		return action.isLoggedIn;
	default:
		return localStorage.getItem('auth_token');
	}
}

function accountProfile(state=false, action) {
	switch(action.type){
		case SET_PROFILE:
			return action.profile;
		default:
			return state;
		}
}
function redirectAvailable(state=null, action) {
	switch(action.type){
		case SET_REDIRECT:
			return action.redirect;
		default:
			return state;
		}
}

function appliedEvent(state=false, action) {
	switch(action.type){
		case SET_EVENT:
			return action.event;
		default:
			return state;
		}
}

const mainReducer = combineReducers({
	isAuthenticated,
	accountProfile,
	redirectAvailable,
	appliedEvent
})

export default mainReducer;