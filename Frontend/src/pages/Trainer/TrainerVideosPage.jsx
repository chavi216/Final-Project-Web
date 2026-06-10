import React from 'react';
import VideoManager from '../../components/Trainer/VideoManager'; // שימי לב: בלי {}

const TrainerVideosPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>ניהול ספריית הסרטונים 🎥</h1>
      <VideoManager role="trainer" />
    </div>
  );
};

export default TrainerVideosPage;