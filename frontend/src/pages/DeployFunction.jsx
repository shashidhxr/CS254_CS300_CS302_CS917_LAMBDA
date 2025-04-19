import { useState } from 'react';
import { createFunction } from '../api/api';

export default function DeployFunction() {
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('python');
  const [timeout, setTimeout] = useState(5000);
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await createFunction({ name, language, timeout });
      setMessage(`Function "${res.name}" created.`);
    } catch (err) {
      console.log(err)
      setMessage('Failed to create function.');
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Deploy New Function</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Function Name</label><br />
          <input value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label>Language</label><br />
          <select value={language} onChange={e => setLanguage(e.target.value)}>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
          </select>
        </div>
        <div>
          <label>Timeout (ms)</label><br />
          <input type="number" value={timeout} onChange={e => setTimeout(e.target.value)} />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>Deploy</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
