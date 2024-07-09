import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import dotenv from "dotenv";
// dotenv.config();
import "./App.css";

import Landingpage from "./Pages/Landingpage";
import Loginpage from "./Pages/Loginpage";
import Registrationpage from "./Pages/Registrationpage";
import Problemlist from "./Pages/Problemlist";
import AddProblemPage from "./Pages/AddProblemPage";
import Compilerpage from "./Pages/Compilerpage";
import Educational from "./Pages/Educational";
// import ProfilePage from './pages/ProfilePage';
import InProgress from "./InProgress";
import NotFoundPage from "./NotFoundPage";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Registrationpage />} />
          <Route path="/problemslist" element={<Problemlist />} />/
          <Route path="/edu/*" element={<Educational />} />/
          <Route path="/problems/add-problem" element={<AddProblemPage />} />
          <Route path="/problems/:problemId" element={<Compilerpage />} />
          {/* <Route path="profile/:userId" element={<ProfilePage/>} /> */}
          {/* Experimental feature waiting to be launched */}
          <Route path="/inprogress" element={<InProgress />} />
          {/* Catch-all route for 404 Not Found page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>

      {/* <ProfilePage/> */}
    </div>
  );
};

export default App;
