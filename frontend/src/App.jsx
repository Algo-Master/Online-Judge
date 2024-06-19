import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import dotenv from "dotenv";
// dotenv.config();
import "./App.css";

import Landingpage from "./pages/Landingpage";
import Loginpage from "./pages/Loginpage";
import Registrationpage from './pages/Registrationpage';
// import ProblemsPage from './pages/ProblemsPage';
// import AddProblemPage from './pages/AddProblemPage';
// import CompilerPage from './pages/CompilerPage';
// import ProfilePage from './pages/ProfilePage';
import { UserProvider } from "./UserData";
const App = () => {
  return (
    <div>
      <Router>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Landingpage />} />
            <Route path="/login" element={<Loginpage />} />
            <Route path="/register" element={<Registrationpage />} />
            {/* <Route path="/problemslist" element={<ProblemsPage />} />
            <Route path="/problems/add-problem" element={<AddProblemPage />} />
            <Route path="/problems/:problemId" element={<CompilerPage />} />
            <Route path="profile/:userId" element={<ProfilePage/>} /> */}
          </Routes>
        </UserProvider>
      </Router>

      {/* <ProfilePage/> */}
    </div>
  );
};

export default App;
