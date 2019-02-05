export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
export const SET_PROFILE = 'SET_PROFILE';
export const SET_REDIRECT = 'SET_REDIRECT';
export const SET_EVENT = 'SET_EVENT';

export function setAuthState(isLoggedIn) {
  return {
    type: SET_AUTHENTICATED,
    isLoggedIn
  }
}
export function setProfile(profile) {
  return {
    type: SET_PROFILE,
    profile: profile
  }
}
export function setRedirection(redirect) {
  return {
    type: SET_REDIRECT,
    redirect:redirect
  }
}
export function setEvent(event) {
  return {
    type: SET_EVENT,
    event:event
  }
}



