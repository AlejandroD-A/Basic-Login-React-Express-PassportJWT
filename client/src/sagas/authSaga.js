import { call, put ,takeLatest} from 'redux-saga/effects';
import { getRefreshToken } from '../api/authApi';
import actions from '../actions'


export function* watcherGetNewToken(){
    yield takeLatest("GET_NEW_TOKEN", getNewTokenSaga)
}

export function* getNewTokenSaga(){
    try{
        yield put(actions.App.setStateLoading)

        let user = yield call(getRefreshToken);
        yield put(actions.App.saveUser(user))
        yield put(actions.App.setStateSuccess)

    }catch(err){
        yield put(actions.App.setStateError)

    }
}


export function* watcherSilentRefresh(){
    yield takeLatest("GET_NEW_SILENT_REFRESH", getNewSilentRefreshSaga)
}

export function* getNewSilentRefreshSaga(){
    try{
        let user = yield call(getRefreshToken);
        yield put(actions.App.saveUser(user));
    }catch(err){
        yield put(actions.App.setStateError);

    }
}