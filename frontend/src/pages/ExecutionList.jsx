import { useEffect, useState } from 'react';
import { listExecutions } from '../api/api';

export default function ExecutionsList() {
  const [executions, setExecutions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await listExecutions();
        setExecutions(data);
      } catch (err) {
        console.error(err);
        setError('Could not load executions.');
      }
    }

    fetchData();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Execution Metrics</h2>

      {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

      {executions.length === 0 ? (
        <p>No executions found.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {executions.map((exec) => (
            <div
              key={exec._id}
              style={{
                padding: '1rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                backgroundColor: exec.success ? '#e6ffed' : '#fff4f4',
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              }}
            >
              <p><strong>ID:</strong> <code>{exec._id}</code></p>
              <p><strong>Language:</strong> {exec.language}</p>
              <p><strong>Status:</strong> <span style={{ color: exec.success ? 'green' : 'red' }}>{exec.success ? 'Success ✅' : 'Failed ❌'}</span></p>
              <p><strong>Duration:</strong> {exec.duration}ms</p>
              <p><strong>Timestamp:</strong> {new Date(exec.timestamp).toLocaleString()}</p>
              
              {exec.output && (
                <details style={{ marginTop: '0.5rem' }}>
                  <summary><strong>Output</strong></summary>
                  <pre style={{ background: '#f6f8fa', padding: '0.5rem', borderRadius: '4px' }}>{exec.output}</pre>
                </details>
              )}

              {exec.error && (
                <details style={{ marginTop: '0.5rem' }}>
                  <summary><strong>Error</strong></summary>
                  <pre style={{ background: '#fff5f5', padding: '0.5rem', borderRadius: '4px', color: '#c00' }}>{exec.error}</pre>
                </details>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
