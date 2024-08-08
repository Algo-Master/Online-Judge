import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useLayoutEffect,
} from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const compilerUrl = import.meta.env.VITE_COMPILER_URL;
import { Xheader } from "../Components/Header";
import Dropdown from "../Components/Dropdown";
import { Xfooter } from "../Components/Footer";
import { UserContext } from "../UserData";
import Editor from "@monaco-editor/react";
import {
  dracula,
  monokai,
  solarizedLight,
  vsDark,
  github,
  kimbieDark,
  tomorrowNight,
} from "monaco-themes";
import { ThreeCircles, Bars } from "react-loader-spinner";
import "../Css/Compilerpage.css";

const Compilerpage = () => {
  const user = useContext(UserContext);
  const { problemId } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("C++");
  const [selectedTheme, setSelectedTheme] = useState("solarized");
  const [code, setCode] = useState(`
#include <bits/stdc++.h> 
using namespace std;

int main() {
    cout << "Hello World!";
    return 0;
}`);
  const [manualTestCase, setManualTestCase] = useState("");
  const [output, setOutput] = useState("");
  const [terminal, setTerminal] = useState("");
  const [problemWidth, setProblemWidth] = useState("50%");
  const [activeComponent, setActiveComponent] = useState("description");
  const [activeTab, setActiveTab] = useState("input");
  const underlineRef = useRef(null);
  const descriptionButtonRef = useRef(null);
  const submissionButtonRef = useRef(null);
  const [scrollbarVisible, setScrollbarVisible] = useState(false);
  const scrollbarTimeoutRef = useRef(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get(`${backendUrl}problems/${problemId}`);
        setProblem(response.data.problem);
        if (response.data.redirectUrl) {
          navigate(response.data.redirectUrl);
        }
      } catch (error) {
        console.error("Error fetching problem data:", error);
        toast.error("Error fetching problem data", {
          position: "top-center",
        });
      }
    };

    fetchProblem();
  }, [problemId, navigate]);

  const handleDesSubToggle = (component) => {
    setActiveComponent(component);
  };

  const handleRun = async () => {
    setOutput("");
    setActiveTab("output");
    if (!code.trim() || !manualTestCase.trim()) {
      setOutput("Input data is missing ftend!!");
      return;
    }
    if (!user.user) {
      toast.error("You need to login to proceed further", {
        position: "top-center",
      });
      return;
    }
    const payload = {
      language: selectedLanguage,
      code,
      manualTestCase,
    };
    try {
      const { data } = await axios.post(`${compilerUrl}run`, payload, {
        withCredentials: true, // Ensure credentials (cookies) are included
      });
      setOutput(data.output);
    } catch (error) {
      console.log(error.response);
      setOutput(JSON.stringify(error.response.data.message));
    }
  };

  const handleSubmit = async () => {
    setTerminal("");
    setActiveTab("terminal");
    if (!code.trim()) {
      toast.error("Code cannot be empty!", { position: "top-center" });
      return;
    }
    if (!user.user) {
      toast.error("You need to login to proceed further", {
        position: "top-center",
      });
      return;
    }
    const payload = {
      language: selectedLanguage,
      code,
      problemId,
    };
    try {
      const { data } = await axios.post(`${compilerUrl}submit`, payload, {
        withCredentials: true,
      });
      if (data.success) {
        toast.success(data.verdict, { position: "top-center" });
        setTerminal("Solution Accepted");
      } else {
        toast.error(data.verdict, { position: "top-center" });
        setTerminal(
          `Verdict: ${data.verdict}\nFailed Test Case: ${JSON.stringify(
            data.failedTestCase
          )}`
        );
      }
    } catch (error) {
      console.error("Error during submission:", error);
      // const errorMessage =
      //   error.response?.data?.error || "An unexpected error occurred";
      // toast.error(errorMessage, { position: "top-center" });
      // setOutput(`Error: ${errorMessage}`);
      console.log(error.response);
      setOutput(JSON.stringify(error.response.data.message));
    }
  };

  const resizerRef = useRef(null);

  useEffect(() => {
    const resizer = resizerRef.current;
    let startX;
    let startWidth;

    const onMouseMove = (e) => {
      const newWidth = startWidth + (e.clientX - startX);
      setProblemWidth(`${newWidth}px`);
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    const onMouseDown = (e) => {
      startX = e.clientX;
      startWidth = resizer.previousElementSibling.getBoundingClientRect().width;
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    resizer.addEventListener("mousedown", onMouseDown);

    return () => {
      resizer.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  useLayoutEffect(() => {
    const updateUnderlinePosition = () => {
      const activeButton =
        activeComponent === "description"
          ? descriptionButtonRef.current
          : submissionButtonRef.current;
      const underline = underlineRef.current;
      if (activeButton && underline) {
        underline.style.width = `${activeButton.offsetWidth}px`;
        underline.style.left = `${activeButton.offsetLeft}px`;
      }
    };

    updateUnderlinePosition();
    window.addEventListener("resize", updateUnderlinePosition);

    return () => {
      window.removeEventListener("resize", updateUnderlinePosition);
    };
  }, [activeComponent]);

  useEffect(() => {
    const problemdesc = document.querySelector(".problemdesc");

    const handleScroll = () => {
      setScrollbarVisible(true);
      clearTimeout(scrollbarTimeoutRef.current);
      scrollbarTimeoutRef.current = setTimeout(() => {
        setScrollbarVisible(false);
      }, 1000); // Adjust the timeout as needed
    };

    problemdesc.addEventListener("scroll", handleScroll);

    return () => {
      problemdesc.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const dropdownLanguage = ["C++", "Java", "Python3"];
  // const dropdownTheme = ["Solarized", "Monokai", "VS-dark"];
  const dropdownTheme = [
    "Solarized",
    "Monokai",
    "VS-dark",
    "Dracula",
    "Github",
    "KimbieDark",
    "TomorrowNight",
  ];

  const languageMapping = {
    "C++": "cpp",
    Java: "java",
    Python3: "python", // Using appropriate theme keys based on Monaco Editor's available themes
  };

  const templatecodeMapping = {
    "C++": `
#include <bits/stdc++.h> 
using namespace std;

int main() {
    cout << "Hello World!";
    return 0;
}`,
    Java: `class Solution {
    public static void main(String[] args) {
        System.out.println("Hello World!!");
    }
}`,
    Python3: `print("Hello World!!!")`,
  };

  const handleLanguageSelect = (item) => {
    console.log(`Language selected: ${item}`);
    setSelectedLanguage(item);
    setCode(templatecodeMapping[item]);
  };

  const themeMapping = {
    Solarized: solarizedLight,
    Monokai: monokai,
    "VS-dark": vsDark,
    Dracula: dracula,
    Github: github, // Adjust theme based on actual theme from monaco-themes
    KimbieDark: kimbieDark,
    TomorrowNight: tomorrowNight,
  };

  // const themeMapping = {
  //   // Solarized: "solarized-light",
  //   // Monokai: "monokai",
  //   Solarized: "vs",
  //   Monokai: "hc-black",
  //   "VS-dark": "vs-dark",
  // };

  const handleThemeSelect = (item) => {
    console.log(`Selected Theme: ${item}`);
    setSelectedTheme(item);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="compilerpage">
      <Xheader />
      <div className="compcontent">
        <div
          className={`problemdesc ${
            scrollbarVisible ? "scrollbar-visible" : ""
          }`}
          style={{ width: problemWidth }}
        >
          <div className="dessubtoggle">
            <button
              ref={descriptionButtonRef}
              className={
                activeComponent === "description" ? "active" : "inactive"
              }
              id="nestedpage"
              onClick={() => handleDesSubToggle("description")}
            >
              Description
            </button>
            <div style={{ width: 75 }}></div>
            <button
              ref={submissionButtonRef}
              className={
                activeComponent === "submission" ? "active" : "inactive"
              }
              id="nestedpage"
              onClick={() => handleDesSubToggle("submission")}
            >
              Submission
            </button>
            <div className="underline" ref={underlineRef}></div>
          </div>
          <div className="seperation"></div>
          {activeComponent === "description" &&
            (problem ? (
              <DescriptionComponent problem={problem} />
            ) : (
              <div className="centered-container">
                <ThreeCircles color="blue" radius="9" height="40" width="40" />
              </div>
            ))}
          {activeComponent === "submission" && <SubmissionComponent />}
        </div>
        <div className="resizer" ref={resizerRef}></div>
        <div
          className="codeactivity"
          style={{ width: `calc(100% - ${problemWidth})` }}
        >
          <div className="selector_panel">
            <p className="com01">Code</p>
            <div style={{ width: 25 }} />
            <Dropdown
              items={dropdownLanguage}
              onSelect={(item) => handleLanguageSelect(item)}
              defaultItem={"C++"}
            />
            <div style={{ width: 25 }} />
            <Dropdown
              items={dropdownTheme}
              onSelect={(item) => handleThemeSelect(item)}
              defaultItem={"Solarized"}
            />
          </div>
          <div className="editor-container">
            <Editor
              language={languageMapping[selectedLanguage]}
              theme={themeMapping[selectedTheme]}
              className="MonacoEditor"
              value={code}
              onChange={(value) => setCode(value)}
              options={{
                selectOnLineNumbers: true,
                lineNumbers: "on",
              }}
            />
          </div>
          <div className="ioterminal">
            <button
              className={`comiostyle ${
                activeTab === "input" ? "iotactive" : "iotinactive"
              }`}
              onClick={() => handleTabChange("input")}
            >
              Input
            </button>
            <button
              className={`comiostyle ${
                activeTab === "output" ? "iotactive" : "iotinactive"
              }`}
              onClick={() => handleTabChange("output")}
            >
              Output
            </button>
            <button
              className={`comiostyle ${
                activeTab === "terminal" ? "iotactive" : "iotinactive"
              }`}
              onClick={() => handleTabChange("terminal")}
            >
              Terminal
            </button>
          </div>
          {activeTab === "input" && (
            <textarea
              className="input-area iotarea"
              value={manualTestCase}
              onChange={(e) => setManualTestCase(e.target.value)}
              placeholder="Enter custom input here..."
            />
          )}
          {activeTab === "output" &&
            (output != "" ? (
              <textarea
                className="output-area iotarea"
                value={output}
                readOnly
                placeholder="Output will be shown here..."
              />
            ) : (
              <div className="centered-analyser">
                <Bars color="blue" radius="9" height="40" width="40" />
              </div>
            ))}
          {activeTab === "terminal" && 
            (terminal != "" ? (
              <textarea
                className="terminal-area iotarea"
                value={terminal}
                readOnly
                placeholder="Terminal output will be displayed here..."
              />
            ) : (
              <div className="centered-analyser">
                <Bars color="blue" radius="9" height="40" width="40" />
              </div>
            ))
          }
          <div className="runsub">
            <button className="run" onClick={handleRun}>
              Run
            </button>
            <button className="submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
      <Xfooter />
      <ToastContainer />
    </div>
  );
};

export default Compilerpage;

const DescriptionComponent = ({ problem }) => {
  const formatTextWithLineBreaks = (text) => {
    return text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="problemdetails">
      <div className="problemheading">
        <h2>{problem.title}</h2>
        <h5>time limit per test: {problem.timel} seconds</h5>
        <h5>memory limit per test: {problem.meml} megabytes</h5>
        <h5>input, output: standard</h5>
      </div>
      <p>{formatTextWithLineBreaks(problem.statement)}</p>
      <h3>Input</h3>
      <p>{formatTextWithLineBreaks(problem.inputcriteria)}</p>
      <h3>Output</h3>
      <p>{formatTextWithLineBreaks(problem.outputcriteria)}</p>
      <h4>Examples</h4>
      {problem.examples.map((example, index) => (
        <div key={index}>
          <table className="example-table">
            <tbody>
              <tr>
                <td>input</td>
              </tr>
              <tr>
                <td>{formatTextWithLineBreaks(example.exinput)}</td>
              </tr>
              <tr>
                <td>output</td>
              </tr>
              <tr>
                <td>{formatTextWithLineBreaks(example.exoutput)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
      <h3>Notes :</h3>
      <p>{formatTextWithLineBreaks(problem.notes)}</p>
    </div>
  );
};

const SubmissionComponent = () => {
  return <p>Submission</p>;
};
