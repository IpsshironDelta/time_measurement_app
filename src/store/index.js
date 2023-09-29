import { createStore }  from "redux";
import {UPDATE_FORM,
        UPDATE_RECIPE,} from '../actions/memberAction';

const initialState = {
  measurementDay : "" , // 測定日
  record         : "" , // 計測タイム
  userName       : "" , // ユーザー名
  selectWork     : "" , // 選択した業務
  number         : "" , // 個数
  avarage        : "" , // 平均値
  memo           : "" , // メモ
  loginUserUID   : "" , // UID
  loginUserEmail : "" , // メールアドレス
};

const reducer = (state = initialState ,action) => {
    switch (action.type) {
        case UPDATE_FORM:
            let formState = {...state};
            formState = action.payload;
            return formState;
        case UPDATE_RECIPE:
            let recipeState = {...state};
            recipeState = action.payload;
            return recipeState;
        default:
            return state;
    }
};

const store = createStore(reducer);

export default store;