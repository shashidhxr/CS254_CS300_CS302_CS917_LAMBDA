// const API_BASE = 'http://localhost:5000/api/';

export async function createFunction(func) {
  const res = await fetch("http://localhost:5000/api/functions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(func),
  });
  return res.json();
}

export async function listFunctions() {
  const res = await fetch("http://localhost:5000/api/functions");
  return res.json();
}

// export async function runFunction(name, code) {
//   const res = await fetch("http://localhost:5000/api/functions/run", {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ name, code }),
//   });
//   return res.json();
// }
export async function runFunction(
  name,
  code,
  language = "python",
  timeout = 5
) {
  const res = await fetch("http://localhost:5000/api/functions/run", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name, // optional (if you want to keep it)
      code,
      language, // required by backend
      timeout, // required by backend
    }),
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
}

export async function listExecutions() {
  const res = await fetch("http://localhost:5000/api/executions");
  if (!res.ok) {
    throw new Error("Failed to fetch executions");
  }
  return res.json();
}
