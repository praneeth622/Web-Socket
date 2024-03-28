import React, { useEffect, useState } from 'react';
import { Container, TextField, Button } from '@mui/material';
import { io } from 'socket.io-client';

export default function App() {
  const socket = io('http://localhost:3000');

  const [message, setMessage] = useState('');

  // Edited handleSubmit function to prevent default form submission behavior
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    socket.emit('message', message);
    setMessage('');
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected', socket.id);
    });
    socket.on('receive-massage',(msg)=>{
      console.log('recived', msg)
    })

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <Container maxWidth="sm">
        {/* Wrapped TextField and Button components inside a form element */}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter Text"
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <Button
            variant="contained"
            type="submit"
            color="primary"
          >
            Submit
          </Button>
        </form>
      </Container>
    </div>
  );
}
