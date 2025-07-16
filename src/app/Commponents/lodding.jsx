import React from 'react';
import '../commponents.css/lodding.css';

export default function Lodding() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">جارٍ التحميل...</p>
    </div>
  );
}
