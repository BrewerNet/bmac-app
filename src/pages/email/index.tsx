import React, { useState, FormEvent } from 'react';

const EmailForm: React.FC = () => {
  const [toEmail, setToEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ toEmail, subject, content }),
    });

    if (response.ok) {
      alert('Email sent successfully!');
    } else {
      alert('Error sending email.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="toEmail">To Email:</label>
      <input
        type="email"
        id="toEmail"
        value={toEmail}
        onChange={(e) => setToEmail(e.target.value)}
        required
      /><br /><br />

      <label htmlFor="subject">Subject:</label>
      <input
        type="text"
        id="subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
      /><br /><br />

      <label htmlFor="content">Content:</label>
      <textarea
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      /><br /><br />

      <button type="submit">Submit</button>
    </form>
  );
};

export default EmailForm;
