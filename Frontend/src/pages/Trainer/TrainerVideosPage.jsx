// import React from 'react';
// import VideoManager from '../../components/Trainer/VideoManager';
// import TrainerVideoLibrary from '../../components/Trainer/TrainerVideoLibrary';

// const TrainerVideosPage = () => {
//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>ניהול ספריית הסרטונים 🎥</h1>

//       <VideoManager role="trainer" />

//       <hr style={{ margin: '30px 0' }} />

//       <TrainerVideoLibrary />
//     </div>
//   );
// };

// export default TrainerVideosPage;


import React from 'react';
import VideoManager from '../../components/Trainer/VideoManager';
import TrainerVideoLibrary from '../../components/Trainer/TrainerVideoLibrary';
import './Styles/TrainerVideos.css'; // ✅ ייבוא קובץ ה-CSS החדש

const TrainerVideosPage = () => {
  return (
    <div className="trainer-videos-container">
      <h1 className="trainer-videos-title">ניהול ספריית הסרטונים 🎥</h1>

      <VideoManager role="trainer" />

      <hr className="trainer-videos-divider" />

      <TrainerVideoLibrary />
    </div>
  );
};

export default TrainerVideosPage;