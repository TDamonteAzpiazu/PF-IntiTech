import React from "react";

interface ButtonProps {
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <div>
      <button 
        onClick={onClick} 
        style={{
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: '#FFF',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        BUTTON GOOGLE
      </button>
    </div>
  );
};

export default Button;
