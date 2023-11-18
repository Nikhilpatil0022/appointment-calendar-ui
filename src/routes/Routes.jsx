import React from "react";
import { Routes, Route } from "react-router-dom";

import Auth from "../pages/auth/Auth";

const RoutesConfig = () => {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Auth />} />
        {/* <Route path="/chat-room" exact element={<PrivateRoute />}>
            <Route path="/chat-room" exact element={<ChatRoom />} />
          </Route>
          <Route path="/add-friends" exact element={<PrivateRoute />}>
            <Route path="/add-friends" exact element={<AddFriends />} />
          </Route>
          <Route path="*" element={<Navigate to="/chat-room" />} /> */}
      </Routes>
    </div>
  );
};

export { RoutesConfig };
