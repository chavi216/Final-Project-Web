import React from 'react';
import VideoManager from '../../components/Trainer/VideoManager';
import TrainerVideoLibrary from '../../components/Trainer/TrainerVideoLibrary';

const TrainerVideosPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>ניהול ספריית הסרטונים 🎥</h1>

      <VideoManager role="trainer" />

      <hr style={{ margin: '30px 0' }} />

      <TrainerVideoLibrary />
    </div>
  );
};

export default TrainerVideosPage;