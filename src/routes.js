import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from "./components/App";
import HomePage from "./components/home/HomePage";
import SignUp from "./components/auth/signup/SignUp";
import Login from "./components/auth/login/Login";
import Bucketlist from "./components/bucketlist/Bucketlist";
import BucketlistItems from "./components/bucketlist_items/BucketlistItems";
import Logout from "./components/auth/logout/Logout";
import SingleBucket from "./components/bucketlist/SingleBucket";




export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage}/>
        <Route path="login" component={Login}/>
        <Route path="logout" component={Logout}/>
        <Route path="signup" component={SignUp}/>
        <Route path="bucketlist" component={Bucketlist}/>
        <Route path="bucketlist/:id" component={SingleBucket}/>
        <Route path="bucketlist/:id/items" component={BucketlistItems}/>

    </Route>
);
