import React, { useState } from 'react';


const HkeyChart = ({ node }) => {
  // State for managing whether the node is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // State for managing the zoom level of the node
  const [zoomLevel, setZoomLevel] = useState(1);

  // State for managing whether to show the "Click this box for Expand" text
  const [showExpandText, setShowExpandText] = useState(false);

  // Function to toggle the open/closed state of the node
  const toggleNode = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle zooming in
  const handleZoomIn = () => {
    setZoomLevel(Math.min(zoomLevel + 0.1, 2));
  };

  // Function to handle zooming out
  const handleZoomOut = () => {
    setZoomLevel(Math.max(zoomLevel - 0.1, 0.5));
  };

  // Function to handle mouse enter event
  const handleMouseEnter = () => {
    // Show the "Click this box for Expand" text if node has children
    if (node.children && node.children.length > 0) {
      setShowExpandText(true);
    }
  };

  // Function to handle mouse leave event
  const handleMouseLeave = () => {
    // Hide the "Click this box for Expand" text
    setShowExpandText(false);
  };

  // Recursive function to calculate the total number of employees in hierarchy
  const getEmployeeNumber = (node) => {
    let count = 1;
    if (node.children && node.children.length > 0) {
      count += node.children.reduce((acc, child) => acc + getEmployeeNumber(child), 0);
    }
    return count;
  };

  // Calculate the total number of employees for the current node's hierarchy
  const EmployeeNumber = getEmployeeNumber(node) - 1;

  return (
    <div
      className="tree-node"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ transform: `scale(${zoomLevel})` }}
    >
      <div className='zoom-buttons'>
        <button onClick={handleZoomIn}>Zoom In</button>
        <button onClick={handleZoomOut}>Zoom Out</button>
      </div>
      <div onClick={toggleNode}>
        <div className='total-container'>
          <div className="container">
            <div className="name">
              <h2 className='employee-name'>{node.name}</h2>
            </div>
            <div className="designation">
              <h4 className='designation-title'>({node.position})</h4>
            </div>
            <div className="email">
              <h4 className="email-address">{node.email}</h4>
            </div>
            <div className="employeenumber">
              <h4 className="employee-count">No. of Employee: {EmployeeNumber}</h4>
            </div>
          </div>
        </div>
      </div>
      {showExpandText && (
        <div className="expand-text">Click this box for Expand</div>
      )}
      {isOpen && node.children.map((child) => (
        <div key={child.id}>
          <HkeyChart node={child} />
        </div>
      ))}
    </div>
  );
};

export default HkeyChart;
