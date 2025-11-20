import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  message: string;
  reason: string;
  company?: string;
  email?: string;
}

export const ContactEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  message,
  reason,
  company,
  email
}) => (
  <div style={container}>
    <h1 style={header}>
      {name} {company && <span> from {company} reached out</span>}
    </h1>
    <div style={chatbubble}>
      <p style={chatbubbleHeader}>Message from {name}:</p>
      <p style={chatbubbleContent}>{message}</p>
      <p style={chatbubbleContent}>Reason: {reason}</p>
      {/* Email */}
      <p style={chatbubbleContent}>Email: {email}</p>
    </div>
    <hr />
    <br />
  </div>
);

const block: React.CSSProperties = {
  display: 'block',
};

const container: React.CSSProperties = {
  ...block,
  textAlign: 'left',
  padding: '1rem',
  margin: '1rem',
  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: '#ffffff',
  color: '#24292e',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};

const header: React.CSSProperties = {
  ...block,
  fontSize: '1.5rem',
  fontWeight: 'bold',
};

const chatbubble: React.CSSProperties = {
  ...block,
  backgroundColor: '#f9f9f9',
  padding: '1rem',
  borderRadius: '3px',
  borderTopLeftRadius: '0',
  borderBottomLeftRadius: '0',
  borderLeft: '3px solid blue',
  border: '2px solid #ccc',
};

const chatbubbleHeader: React.CSSProperties = {
  ...block,
  fontSize: '1rem',
  fontWeight: 'bold',
  color: '#333',
};

const chatbubbleContent: React.CSSProperties = {
  ...block,
  fontSize: '1rem',
  color: '#333',
};

const footer: React.CSSProperties = {
  ...block,
  paddingTop: '1rem',
  fontSize: '1rem',
  color: '#333',
  borderTop: '2px solid #24292e',
};

const url: React.CSSProperties = {
  color: '#007bff',
  textDecoration: 'none',
};
