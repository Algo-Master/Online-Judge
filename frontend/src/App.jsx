import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import dotenv from "dotenv";
// dotenv.config();
import "./App.css";

import Landingpage from "./Pages/Landingpage.jsx";
import Loginpage from "./Pages/Loginpage.jsx";
import Registrationpage from "./Pages/Registrationpage.jsx";
import Problemlist from "./Pages/Problemlist.jsx";
import AddProblemPage from "./Pages/AddProblemPage.jsx";
import Compilerpage from "./Pages/Compilerpage.jsx";
import Educational from "./Pages/Educational.jsx";
// import ProfilePage from "./pages/ProfilePage.jsx";
import InProgress from "./InProgress.jsx";
import NotFoundPage from "./NotFoundPage.jsx";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Landingpage />} /> */}
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
