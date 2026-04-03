import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Result from "./pages/Result";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import Analytics from "./pages/Analytics";
import UserDashboard from "./pages/UserDashboard";

function AppContent() {
  const location = useLocation();

  // Hide navbar on login/signup pages
  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          }
        />

        <Route
          path="/result"
          element={
            <ProtectedRoute>
              <Result />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter-dashboard"
          element={
            <ProtectedRoute>
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;

// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   useLocation,
//   Navigate,
// } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import ProtectedRoute from "./components/ProtectedRoute";

// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Dashboard from "./pages/Dashboard";
// import Upload from "./pages/Upload";
// import Result from "./pages/Result";
// import RecruiterDashboard from "./pages/RecruiterDashboard";
// import Analytics from "./pages/Analytics";
// import UserDashboard from "./pages/UserDashboard";

// // Protected Route Component
// function ProtectedRoute({ children }) {
//   const token = localStorage.getItem("token");

//   return token ? children : <Navigate to="/login" replace />;
// }

// function AppContent() {
//   const location = useLocation();

//   // Hide navbar on auth pages
//   const hideNavbar =
//     location.pathname === "/" ||
//     location.pathname === "/login" ||
//     location.pathname === "/signup";

//   return (
//     <>
//       {!hideNavbar && <Navbar />}

//       <Routes>
//         {/* Auth Pages */}
//         <Route path="/" element={<Login />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         {/* Protected Pages */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/upload"
//           element={
//             <ProtectedRoute>
//               <Upload />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/result"
//           element={
//             <ProtectedRoute>
//               <Result />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/recruiter-dashboard"
//           element={
//             <ProtectedRoute>
//               <RecruiterDashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/analytics"
//           element={
//             <ProtectedRoute>
//               <Analytics />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/user-dashboard"
//           element={
//             <ProtectedRoute>
//               <UserDashboard />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </>
//   );
// }

// function App() {
//   return (
//     <BrowserRouter>
//       <AppContent />
//     </BrowserRouter>
//   );
// }

// export default App;