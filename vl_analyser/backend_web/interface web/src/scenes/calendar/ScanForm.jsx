import React, { useState } from 'react';
import { InputBase, Button } from '@mui/material';

export default function ScanForm({ onSubmit }) {
  const [tool, setTool] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (  !url) return alert('Please fill in both fields.');
    onSubmit({ tool, url });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem' }}>
      <InputBase placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} />
      <Button variant="contained" type="submit">Start</Button>
    </form>
  );
}