import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../Css/ProblemCompiler.css';
import { UserContext } from '../UserData';

function CompilerPage() {
    const user = useContext(UserContext);
    const { problemId } = useParams();
    const navigate = useNavigate();
    const [problem, setProblem] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState("cpp");
    const [code, setCode] = useState(`
    #include <bits/stdc++.h> 
    using namespace std;

    int main() {
        cout << "Hello World!";
        return 0;  
    }`);
    const [manualTestCase, setManualTestCase] = useState("");
    const [output, setOutput] = useState("");

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const response = await axios.get(`https://compiler.codequest.me/problems/${problemId}`);
                setProblem(response.data.problem);
                if (response.data.redirectUrl) {
                    navigate(response.data.redirectUrl);
                }
            } catch (error) {
                console.error('Error fetching problem data:', error);
                toast.error('Error fetching problem data', {
                    position: "top-center",
                });
            }
        };

        fetchProblem();
    }, [problemId, navigate]);

    const handleLanguageChange = (e) => {
        setSelectedLanguage(e.target.value);
    };

    const handleRun = async () => {
        if (!code.trim() || !manualTestCase.trim()) {
            setOutput("Input data is missing !!");
            return;
        }
        const payload = {
            language: selectedLanguage,
            code,
            manualTestCase,
        };
        try {
            const { data } = await axios.post('https://compiler.codequest.me/problems/run', payload);
            setOutput(data.output);
        } catch (error) {
            console.log(error.response);
            setOutput("Error occurred while running the code.");
        }
    };

    const handleSubmit = async () => {
        if (!code.trim()) {
            toast.error("Code cannot be empty!", { position: "top-center" });
            return;
        }
        const payload = {
            language: selectedLanguage,
            code,
            problemId
        };
        try {
            const { data } = await axios.post('https://compiler.codequest.me/problems/submit', payload);
            if (data.success) {
                toast.success(data.verdict, { position: "top-center" });
                setOutput(data.verdict);
            } else {
                toast.error(data.verdict, { position: "top-center" });
                setOutput(`Verdict: ${data.verdict}\nFailed Test Case: ${JSON.stringify(data.failedTestCase)}`);
            }
        } catch (error) {
            console.error('Error during submission:', error);
            const errorMessage = error.response?.data?.error || "An unexpected error occurred";
            toast.error(errorMessage, { position: "top-center" });
            setOutput(`Error: ${errorMessage}`);
        }
    };

    const onClickProfileBtn = () => {
        console.log('User data from context:', user);
        if (user) {
            console.log('User ID:', user.user._id);
        }
        if (user && user.user._id) { 
          navigate(`/profile/${user.user._id}`); 
        } else {
          console.error('User ID not found Comp');
          toast.error("User ID not found!", {position: "top-center"});
        }
      };

    return (
        <div>
            {/* HEADER */}
            <div className="headerComp">
                <div className="left">
                    <img src="/Assets/logo.png" alt="Logo" />
                </div>
                <div className="right">
                    <Link to="/problemslist">Problems</Link>
                    <button className="cmpBtn" onClick={onClickProfileBtn}>
                        <img src="/Assets/ProfileLogo.png" className="profileLogo" alt="Logo" />
                    </button>
                </div>
            </div>

            {/* CONTENT */}
            <div className="contentCompiler">
                <div className="ProblemDesc">
                    {problem ? (
                        <div>
                            <h1>{`${problem.number}: ${problem.title}`}</h1>
                            <p>{problem.description}</p>
                            <p><strong>Input Format:</strong> <br /> {problem.inputFormat}</p>
                            <p><strong>Output Format:</strong> <br /> {problem.outputFormat}</p>
                            {problem.testCases.slice(0, 2).map((testCase, index) => (
                                <div key={index}>
                                    <h3>{`Test Case ${index + 1}`}</h3>
                                    <p><strong>Input:</strong> {testCase.input}</p>
                                    <p><strong>Output:</strong> {testCase.output}</p>
                                    {testCase.explanation && testCase.explanation.trim() !== '' && (
                                        <p><strong>Explanation:</strong> <br /> {testCase.explanation}</p>
                                    )}
                                </div>
                            ))}
                            <p>{`Acceptance Rate : ${problem.acceptance_rate} %`}</p>
                        </div>
                    ) : (
                        <p>Loading problem...</p>
                    )}
                </div>
                <div className="Comp">
                    <div className="firstTop">
                        <div className="actionButtons">
                            <button className="runButton" onClick={handleRun}>Run</button>
                            <button className="submitButton" onClick={handleSubmit}>Submit</button>
                        </div>
                        <div className="rightSide">
                            <div className="editorial"><Link to="/">Editorials</Link></div>
                            <div className="dropdown">
                                <select id="languageSelect" value={selectedLanguage} onChange={handleLanguageChange}>
                                    <option value="js">JavaScript</option>
                                    <option value="py">Python</option>
                                    <option value="java">Java</option>
                                    <option value="cpp">C++</option>
                                    <option value="cs">C#</option>
                                    <option value="rb">Ruby</option>
                                    <option value="go">Go</option>
                                    <option value="swift">Swift</option>
                                    <option value="kt">Kotlin</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {/* Code Editor */}
                    <div className="codeEditor">
                        <textarea
                            className="codeInput"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Write your code here..."
                        />
                    </div>
                    {/* Input Box */}
                    <div className="manualTestCaseInput">
                        <textarea
                            className="manualTestCase"
                            value={manualTestCase}
                            onChange={(e) => setManualTestCase(e.target.value)}
                            placeholder="Enter your test cases here..."
                        />
                    </div>
                    {/* Output Box */}
                    <div className="outputBox">
                        <textarea
                            className="outputDisplay"
                            value={output}
                            readOnly
                            placeholder="Output will be displayed here..."
                        />
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default CompilerPage;