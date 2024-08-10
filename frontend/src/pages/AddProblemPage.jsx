import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Xheader } from "../Components/Header";
import { Xfooter } from "../Components/Footer";
import Dropdown from "../Components/Dropdown";
import "react-toastify/dist/ReactToastify.css";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
import "../Css/AddProblemPage.css";

function AddProblemPage() {
  const [problemData, setProblemData] = useState({
    title: "",
    timel: 0,
    meml: 0,
    rating: 0,
    difficulty: "Easy",
    statement: "",
    inputcriteria: "",
    outputcriteria: "",
    examples: [{ exinput: "", exoutput: "" }],
    testcases: [{ testinput: "", testoutput: "" }],
    notes: "",
    solvers: 0, // Initialize solvers to 0
    acceptance: 0, // Initialize acceptance to 0
  });

  const navigate = useNavigate(); // GET THE NAVIGATION FUNCTION

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProblemData({
      ...problemData,
      [name]: value,
    });
  };

  const handleDifficulty = (item) => {
    const diff = item; // Assuming difficulty is a property of the item object
    setProblemData({
      ...problemData,
      difficulty: diff, // Update difficulty property
    });
  };

  const handleExampleChange = (index, e) => {
    const { name, value } = e.target;
    const newExamples = [...problemData.examples];
    newExamples[index][name] = value;
    setProblemData({ ...problemData, examples: newExamples });
  };

  const handleTestCaseChange = (index, e) => {
    const { name, value } = e.target;
    const newTestcases = [...problemData.testcases];
    newTestcases[index][name] = value;
    setProblemData({ ...problemData, testcases: newTestcases });
  };

  const addexample = () => {
    setProblemData({
      ...problemData,
      examples: [...problemData.examples, { exinput: "", exoutput: "" }],
    });
  };

  const removexample = () => {
    if (problemData.examples.length > 0) {
      setProblemData({
        ...problemData,
        examples: problemData.examples.slice(0, -1),
      });
    }
  };

  const addtestcase = () => {
    setProblemData({
      ...problemData,
      testcases: [...problemData.testcases, { testinput: "", testoutput: "" }],
    });
  };

  const removetestcase = () => {
    if (problemData.testcases.length > 0) {
      setProblemData({
        ...problemData,
        testCases: problemData.testcases.slice(0, -1),
      });
    }
  };

  const handleSubmit = async (e) => {
    console.log(problemData.examples[problemData.examples.length - 1].exinput);
    if (
      problemData.examples[problemData.examples.length - 1].exinput === "" ||
      problemData.examples[problemData.examples.length - 1].exoutput === ""
    ) {
      toast.error("Fill up the examples", { position: "top-center" });
      return;
    }
    if (
      problemData.testcases[problemData.testcases.length - 1].testinput ===
        "" ||
      problemData.testcases[problemData.testcases.length - 1].testoutput === ""
    ) {
      toast.error("Fill up the testcases", { position: "top-center" });
      return;
    }
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backendUrl}problems/add-problem`,
        problemData,
        {
          withCredentials: true, // Ensure credentials (cookies) are included
        }
      );
      toast.success("Problem added successfully", { position: "top-center" });
      console.log("Problem added:", response.data);
      // Reset form
      setProblemData({
        title: "",
        timel: 0,
        meml: 0,
        rating: 0,
        difficulty: "Easy",
        statement: "",
        inputcriteria: "",
        outputcriteria: "",
        examples: [{ exinput: "", exoutput: "" }],
        testcases: [{ testinput: "", testoutput: "" }],
        notes: "",
        solvers: 0, // Initialize solvers to 0
        acceptance: 0, // Initialize acceptance to 0
      });
    } catch (error) {
      toast.error("Error adding problem", { position: "top-center" });
      console.error("Error adding problem:", error.message);
    }
  };

  const dropdownDifficulty = ["Easy", "Medium", "Hard"];

  return (
    <div>
      <Xheader />
      <div className="body">
        <div className="table" id="customers_table">
          <section className="table__header">
            <h1>Add your Custom Problem</h1>
          </section>
          <section className="table__body">
            <div className="problempart">
              <p>Title</p>
              <input
                className="expandable-input"
                type="text"
                name="title"
                placeholder="Enter title"
                value={problemData.title}
                onChange={(e) => handleChange(e)}
                required
              />
              <p className="linespace">Time limit per test</p>
              <input
                className="smallinput expandable-input"
                type="number"
                name="timel"
                placeholder="seconds"
                value={problemData.timel}
                onChange={(e) => handleChange(e)}
                required
              />
              <p className="linespace">Memory limit per test</p>
              <input
                className="smallinput expandable-input"
                type="number"
                name="meml"
                placeholder="megabytes"
                value={problemData.meml}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className="problempart">
              <p className="alignall">Problem Statement</p>
              <textarea
                className="destarea"
                type="text"
                name="statement"
                placeholder="Enter your Problem Statement"
                value={problemData.statement}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className="problempart">
              <p className="alignall">Input Criteria</p>
              <textarea
                className="destarea"
                type="text"
                name="inputcriteria"
                placeholder="Enter your Input Conditions"
                value={problemData.inputcriteria}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className="problempart">
              <p className="alignall">Output Criteria</p>
              <textarea
                className="destarea"
                type="text"
                name="outputcriteria"
                placeholder="Enter your Output Conditions"
                value={problemData.outputcriteria}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className="problempart">
              <div className="problempart">
                <p className="alignall">Example Input</p>
                <textarea
                  className="ioarea"
                  type="text"
                  name="exinput"
                  placeholder="Enter your Input for example"
                  value={
                    problemData.examples[problemData.examples.length - 1]
                      .exinput
                  }
                  onChange={(e) =>
                    handleExampleChange(problemData.examples.length - 1, e)
                  }
                  required
                />
              </div>
              <div className="problempart">
                <p className="alignall linespace">Example Output</p>
                <textarea
                  className="ioarea"
                  type="text"
                  name="exoutput"
                  placeholder="Enter your Output for example"
                  value={
                    problemData.examples[problemData.examples.length - 1]
                      .exoutput
                  }
                  onChange={(e) =>
                    handleExampleChange(problemData.examples.length - 1, e)
                  }
                  required
                />
              </div>
            </div>
            <div className="problempart">
              <button className="create" onClick={addexample}>
                Create Example
              </button>
              <button className="delete" onClick={removexample}>
                Delete Example
              </button>
            </div>
            <div className="problempart">
              <div className="problempart">
                <p className="alignall">Input Testcase</p>
                <textarea
                  className="ioarea"
                  type="text"
                  name="testinput"
                  placeholder="Enter your Input for testcases"
                  value={
                    problemData.testcases[problemData.testcases.length - 1]
                      .testinput
                  }
                  onChange={(e) =>
                    handleTestCaseChange(problemData.testcases.length - 1, e)
                  }
                  required
                />
              </div>
              <div className="problempart">
                <p className="alignall linespace">Output Testcase</p>
                <textarea
                  className="ioarea"
                  type="text"
                  name="testoutput"
                  placeholder="Enter your Output for testcases"
                  value={
                    problemData.testcases[problemData.testcases.length - 1]
                      .testoutput
                  }
                  onChange={(e) =>
                    handleTestCaseChange(problemData.testcases.length - 1, e)
                  }
                  required
                />
              </div>
            </div>
            <div className="problempart">
              <button className="create" onClick={addtestcase}>
                Create Testcase
              </button>
              <button className="delete" onClick={removetestcase}>
                Delete Testcase
              </button>
            </div>
            <div className="problempart">
              <div className="problempart">
                <p className="alignall">Notes for contestants</p>
                <textarea
                  className="ioarea"
                  type="text"
                  name="notes"
                  placeholder="Enter your Notes"
                  value={problemData.notes}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
              <div className="problempart">
                <p className="alignall linespace">Problem Rating</p>
                <input
                  className="customrating"
                  type="number"
                  name="rating"
                  placeholder="Rating"
                  value={problemData.rating}
                  onChange={(e) => handleChange(e)}
                  required
                />
                <p className="diffwidth alignall">Difficulty</p>
                <Dropdown
                  items={dropdownDifficulty}
                  onSelect={handleDifficulty}
                  defaultItem={"Easy"}
                />
              </div>
            </div>
            <div className="problempart">
              <button className="addproblem" onClick={handleSubmit}>
                Add Problem
              </button>
            </div>
            {/* <ToastContainer position="top-center" /> */}
          </section>
        </div>
      </div>
      <div className="tablefooterspace"></div>
      <Xfooter />
    </div>
  );
}

export default AddProblemPage;
