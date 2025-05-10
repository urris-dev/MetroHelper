import React, { useState, useEffect } from 'react';
import styles from './Workspace.module.css';
import Homepage from '../Homepage/Homepage.jsx';
import CreateRequest from '../CreateRequest/CreateRequest.jsx';
import ProfileEdit from '../ProfileEdit/ProfileEdit.jsx';
import Rating from './Rating';
import Navigation from './Navigation';


const Workspace = () => {
  const userType = localStorage.getItem('userType');
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('activeTab') || 'openHomepage';
  });

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'openHomepage':
        return <Homepage userType={userType} />;
      case 'createRequest':
        return <CreateRequest />;
      case 'editUserProfile':
        return <ProfileEdit />;
      case 'checkRating':
        return <Rating />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.workspace}>
      <main className={styles.workspace__main}>{renderContent()}</main>
      <Navigation userType={userType} activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Workspace;