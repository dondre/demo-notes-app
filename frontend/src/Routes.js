import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenicatedRoute";

import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
// import Dashboard from './containers/Dashboard';
import Gifts from "./containers/Gifts";
import NewGift from "./containers/NewGift";
import Settings from "./containers/Settings";
import NotFound from "./containers/NotFound";

export default function Links() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/login" element={
                <UnauthenticatedRoute><Login /></UnauthenticatedRoute>
            } />
            <Route path="/signup" element={
                <UnauthenticatedRoute><Signup /></UnauthenticatedRoute>
            } />
            <Route path="/settings" element={
                <AuthenticatedRoute><Settings /></AuthenticatedRoute>
            } />
            <Route path="/gifts/new" element={
                <AuthenticatedRoute><NewGift /></AuthenticatedRoute>
            } />
            <Route path="/gifts/:id" element={
                <AuthenticatedRoute><Gifts /></AuthenticatedRoute>
            } />
            <Route path="*" element={<NotFound />} />;
        </Routes>
    );
}