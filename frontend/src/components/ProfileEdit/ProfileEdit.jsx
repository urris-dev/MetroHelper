import React from 'react';
import ProfileEditForm from './Form.jsx';
import styles from './ProfileEdit.module.css';
import { useProfileEdit } from '../../hooks/profileEdit.js';

const ProfileEdit = () => {
  const { photoPreview, handlePhotoChange, error, loading, handleEdit, handleLogout, isModalOpen, handleCloseModal, passwordType, togglePasswordVisibility } = useProfileEdit();
  return (
    <div className={styles.workspace}>
      <main className={styles.workspace__main}>
        <ProfileEditForm
          photoPreview={photoPreview}
          handlePhotoChange={handlePhotoChange}
          error={error}
          loading={loading}
          handleEdit={handleEdit}
          handleLogout={handleLogout}
          isModalOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          passwordType={passwordType}
          togglePasswordVisibility={togglePasswordVisibility}
        />
      </main>
    </div>
  );
};

export default ProfileEdit;