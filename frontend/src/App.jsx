import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import dotenv from "dotenv";
// dotenv.config();
import "./App.css";

import Landingpage from "./Pages/Landingpage";
import Loginpage from "./Pages/Loginpage";
import Registrationpage from './Pages/Registrationpage';
import Problemlist from './Pages/Problemlist';
import AddProblemPage from './Pages/AddProblemPage';
import Compilerpage from './Pages/Compilerpage';
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
            <Route path="/problemslist" element={<Problemlist />} />/
            <Route path="/problems/add-problem" element={<AddProblemPage />} />
            <Route path="/problems/:problemId" element={<Compilerpage />} />
            {/* <Route path="profile/:userId" element={<ProfilePage/>} /> */}
          </Routes>
        </UserProvider>
      </Router>

      {/* <ProfilePage/> */}
    </div>
  );
};

export default App;
