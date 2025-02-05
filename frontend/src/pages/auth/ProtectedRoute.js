// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "./AuthContext";

// const ProtectedRoute = ({ allowedRoles, children }) => {
//   const { user } = useAuth();

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   if (!allowedRoles.includes(user.role)) {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// export default ProtectedRoute;

// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "./AuthContext";

// const ProtectedRoute = ({ allowedRoles, children }) => {
//   const { user } = useAuth();

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   if (!allowedRoles.includes(user.role)) {
//     return <Navigate to="/dashboard" />;
//   }

//   return children;
// };

// export default ProtectedRoute;

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user } = useAuth();

  if (!user) {
    // Redirect to login if no user is logged in
    return <Navigate to="/login" />;
  }

  // Role-based redirection
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    switch (user.role) {
      case "member":
        return <Navigate to="/dashboard" />;
      case "trainer":
        return <Navigate to="/trainer" />;
      case "dietitian":
        return <Navigate to="/dietitian" />;
      case "gym-assistant":
        return <Navigate to="/assistant" />;
      default:
        return <Navigate to="/" />;
    }
  }

  // Render children if the role is allowed
  return children;
};

// export default ProtectedRoute;
// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "./AuthContext";

// const ProtectedRoute = ({ allowedRoles, children }) => {
//   const { user } = useAuth();

//   if (!user) {
//     // Redirect to login if no user is logged in
//     return <Navigate to="/login" />;
//   }

//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     // Redirect based on the user's role if not authorized
//     const rolePaths = {
//       member: "/dashboard",
//       trainer: "/trainer",
//       dietitian: "/dietitian",
//       "gym-assistant": "/assistant",
//       admin: "/admin",
//     };

//     const fallbackPath = rolePaths[user.role] || "/";
//     return <Navigate to={fallbackPath} />;
//   }

//   // Render children if the role is allowed
//   return children;
// };

export default ProtectedRoute;
