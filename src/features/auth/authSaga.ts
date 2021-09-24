import { takeEvery } from "@redux-saga/core/effects";
import { authActions } from "./authSlice";

function* watchUserClick() {
  console.log("USER CLICK!!!!");
}

export function* authSaga() {
  yield takeEvery(authActions.testAuth.type, watchUserClick);
}
