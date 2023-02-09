import React from 'react';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#EFF3F4',
    color: 'black',
    fontStyle: 'italic',
    fontSize: 16,
    maxWidth: '100%',
    border: '2px solid grey',
    marginTop: 10
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>React Notebook Application, Saquib Mehmood (C) 2023</em>
    </div>
  )
}

export default Footer