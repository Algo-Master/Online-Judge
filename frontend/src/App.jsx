import { Route, Routes } from "react-router-dom";
import Login from './ComponentsFrontend/Login';
import Home from './ComponentsFrontend/Home';
import Signup from './ComponentsFrontend/Signup';
import './App.css'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/create" element={<CreateProblem />} /> */}
        {/* <Route path="/problems" element={<ProblemList />} /> */}
        {/* <Route path="/getproblem/:id" element={<Problemdetails />} /> */}
        {/* <Route path="/compiler" element={<Compiler />} /> */}
        {/* <Route path="/update/:id" element={<Update />} /> */}
        {/* <Route path="/leaderboard" element={<Leaderboard/>} /> */}
      </Routes>
    </div>
  )
}

export default App