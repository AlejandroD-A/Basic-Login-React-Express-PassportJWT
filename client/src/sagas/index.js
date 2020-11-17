import { all } from 'redux-saga/effects'
import { watcherGetNewToken, watcherSilentRefresh} from './authSaga'

export default function* rootSaga(){
    yield all([
        watcherGetNewToken(),
        watcherSilentRefresh()
    ])
}