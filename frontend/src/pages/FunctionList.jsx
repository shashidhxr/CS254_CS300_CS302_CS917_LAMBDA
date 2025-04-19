import { useEffect, useState } from 'react';
import { listFunctions } from '../api/api';

export default function FunctionList() {
  const [functions, setFunctions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await listFunctions();
      setFunctions(data);
    }
    fetchData();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>All Deployed Functions</h2>
      {functions.length === 0 ? (
        <p>No functions deployed.</p>
      ) : (
        <ul>
          {functions.map((f) => (
            <li key={f._id}>
              <strong>{f.name}</strong> – Language: {f.language} – Timeout: {f.timeout}ms
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
