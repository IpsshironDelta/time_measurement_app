import React             from 'react';
import {BrowserRouter, 
        Switch, 
        Route}            from "react-router-dom"
import MainPage           from './components/MainPage/MainPage';
import RecordInfo         from "./components/RecordeInfo/RecordInfo"
import UserInfo           from "./components/UserInfo/UserInfo"
import UserInfoEdit       from "./components/UserInfoEdit/UserInfoEdit"
import Login              from "./components/Login/Login"
import SignUp             from './components/SignUp/SignUp'
import PasswordReset      from "./components/PasswordReset/PasswordReset"
import DefaultUserSetting from "./components/DefaultUserSetting/DefaultUserSetting"
import './App.css';
function App() {
  return (
    <BrowserRouter>
      <Switch>

        {/* 初期設定画面 */}
        <Route exact path="/setting">
          <DefaultUserSetting />
        </Route>

        {/* ホーム画面 */}
        <Route exact path="/">
          <MainPage />
        </Route>

        {/* ログイン画面 */}
        <Route exact path="/login">
          <Login />
        </Route>

        {/* 新規登録画面 */}
        <Route exact path="/signup">
          <SignUp />
        </Route>

        {/* パスワードリセット画面 */}
        <Route exact path="/passwordreset">
          <PasswordReset />
        </Route>

        {/* 記録閲覧画面 */}
        <Route exact path="/recordinfo">
          <RecordInfo />
        </Route>

        {/* ユーザー情報確認画面 */}
        <Route exact path="/userinfo/:id">
          <UserInfo />
        </Route>

        {/* ユーザー情報編集画面 */}
        <Route exact path="/userinfo/:id/edit">
          <UserInfoEdit />
        </Route>
      
      </Switch>
    </BrowserRouter>
  );
}

export default App;
