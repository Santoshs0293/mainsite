import {takeEvery,put} from "redux-saga/effects"
import { addCartAPI, deleteCartAPI, getCartAPI, updateCartAPI } from "../Services/CartService"
import {ADD_CART,ADD_CART_RED, DELETE_CART, DELETE_CART_RED, GET_CART, GET_CART_RED, UPDATE_CART, UPDATE_CART_RED} from "../Constants"

function* addCartSaga(action){   //executer
    var response = yield addCartAPI(action.payload)
    yield put({type:ADD_CART_RED,data:response.data})
}
function* getCartSaga(){   //executer
    var response = yield getCartAPI()
    yield put({type:GET_CART_RED,data:response.data})
}
function* deleteCartSaga(action){   //executer
    yield deleteCartAPI(action.payload)
    yield put({type:DELETE_CART_RED,data:action.payload})
}
function* updateCartSaga(action){   //executer
    yield updateCartAPI(action.payload)
    yield put({type:UPDATE_CART_RED,data:action.payload})
}
export function* cartSaga(){    //watcher
    yield takeEvery(ADD_CART,addCartSaga)
    yield takeEvery(GET_CART,getCartSaga)
    yield takeEvery(DELETE_CART,deleteCartSaga)
    yield takeEvery(UPDATE_CART,updateCartSaga)
}