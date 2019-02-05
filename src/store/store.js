import { createStore } from 'redux'
import mainReducer from './reducers'
let store = createStore(mainReducer)

export default store;