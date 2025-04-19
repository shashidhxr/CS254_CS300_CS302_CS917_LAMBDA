import { useState } from "react";
import { runFunction } from "../api/api";

export default function RunFunction() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("python");

  async function handleRun(e) {
    e.preventDefault();
    setError("");
    try {
      const res = await runFunction(name, code);
      // Handle both response formats:
      const result = res.output || res;
      if (result.error) {
        setError(result.error);
        setOutput("");
      } else {
        setOutput(result.output || result);
      }
    } catch (err) {
      console.error("Execution error:", err);
      setError(err.message || "Execution failed");
    }
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Run Function</h2>
      <form onSubmit={handleRun}>
        <div>
          <label>Function Name</label>
          <br />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Language</label>
          <br />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
          </select>
        </div>
        <div>
          <label>Code</label>
          <br />
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={10}
            cols={60}
            placeholder={`print("Hello from Lambda")`}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "1rem" }}>
          Run
        </button>
      </form>

      {output && (
        <div style={{ marginTop: "1rem" }}>
          <strong>Output:</strong>
          <pre>{output}</pre>
        </div>
      )}
      {error && (
        <div style={{ marginTop: "1rem", color: "red" }}>
          <strong>Error:</strong>
          <pre>{error}</pre>
        </div>
      )}
    </div>
  );
}
