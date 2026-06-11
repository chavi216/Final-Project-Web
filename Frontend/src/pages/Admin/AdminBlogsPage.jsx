// import React, { useState, useEffect } from 'react';
// import { apiService } from '../../api/api';
// import Button from '../../components/common/Button';

// const AdminBlogsPage = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ text: '', type: '' });

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       setLoading(true);
//       try {
//         const data = await apiService.admin.getContent('blog');
//         setBlogs(data);
//       } catch (error) {
//         setMessage({ text: 'שגיאה בטעינת הבלוגים', type: 'error' });
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBlogs();
//   }, []);

//   const handleDeleteBlog = async (blogId, title) => {
//     if (!window.confirm(`האם אתה בטוח שברצונך למחוק את הבלוג "${title}"?`)) return;

//     try {
//       await apiService.admin.deleteContent('blog', blogId);
//       setMessage({ text: 'הבלוג נמחק בהצלחה', type: 'success' });
//       setBlogs(blogs.filter(b => b.blog_ID !== blogId));
//     } catch (error) {
//       setMessage({ text: 'מחיקת הבלוג נכשלה', type: 'error' });
//     }
//   };

//   return (
//     <div style={{ padding: '30px', maxWidth: '1000px', margin: '0 auto', direction: 'rtl' }}>
//       <h1 style={{ marginBottom: '20px' }}>ניהול בלוגים</h1>
      
//       {message.text && (
//         <div style={{ padding: '10px', marginBottom: '15px', backgroundColor: message.type === 'success' ? '#e6f4ea' : '#fce8e6', color: message.type === 'success' ? '#137333' : '#c5221f' }}>
//           {message.text}
//         </div>
//       )}

//       {loading ? <p>טוען נתונים...</p> : (
//         <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
//           <thead>
//             <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6', textAlign: 'right' }}>
//               <th style={{ padding: '12px' }}>מזהה</th>
//               <th style={{ padding: '12px' }}>כותרת</th>
//               <th style={{ padding: '12px' }}>פורסם על ידי</th>
//               <th style={{ padding: '12px' }}>קהל יעד</th>
//               <th style={{ padding: '12px', textAlign: 'center' }}>פעולות</th>
//             </tr>
//           </thead>
//           <tbody>
//             {blogs.map(blog => (
//               <tr key={blog.blog_ID} style={{ borderBottom: '1px solid #dee2e6' }}>
//                 <td style={{ padding: '12px' }}>{blog.blog_ID}</td>
//                 <td style={{ padding: '12px', fontWeight: 'bold' }}>{blog.Title}</td>
//                 <td style={{ padding: '12px' }}>{blog.author_name}</td>
//                 <td style={{ padding: '12px' }}>{blog.audience_type}</td>
//                 <td style={{ padding: '12px', textAlign: 'center' }}>
//                   <Button onClick={() => handleDeleteBlog(blog.blog_ID, blog.Title)} style={{ backgroundColor: '#dc3545', color: '#fff', padding: '5px 10px', fontSize: '12px' }}>
//                     מחק
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default AdminBlogsPage;

import React, { useState, useEffect } from 'react';
import { apiService } from '../../api/api';
import '.Styles/AdminBlogs.css'; // ✅ ייבוא קובץ העיצוב החדש

const AdminBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const data = await apiService.admin.getContent('blog');
        setBlogs(data);
      } catch (error) {
        setMessage({ text: 'שגיאה בטעינת הבלוגים', type: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleDeleteBlog = async (blogId, title) => {
    if (!window.confirm(`האם אתה בטוח שברצונך למחוק את הבלוג "${title}"?`)) return;

    try {
      await apiService.admin.deleteContent('blog', blogId);
      setMessage({ text: 'הבלוג נמחק בהצלחה', type: 'success' });
      setBlogs(blogs.filter(b => b.blog_ID !== blogId));
    } catch (error) {
      setMessage({ text: 'מחיקת הבלוג נכשלה', type: 'error' });
    }
  };

  return (
    <div className="admin-blogs-container">
      <h1 className="admin-blogs-title">ניהול בלוגים</h1>
      
      {message.text && (
        <div className={`admin-message ${message.type}`}>
          {message.text}
        </div>
      )}

      {loading ? <p>טוען נתונים...</p> : (
        <div className="admin-table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>מזהה</th>
                <th>כותרת</th>
                <th>פורסם על ידי</th>
                <th>קהל יעד</th>
                <th className="center">פעולות</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map(blog => (
                <tr key={blog.blog_ID}>
                  <td>{blog.blog_ID}</td>
                  <td className="bold">{blog.Title}</td>
                  <td>{blog.author_name}</td>
                  <td>{blog.audience_type}</td>
                  <td className="center">
                    {/* השתמשתי בכפתור HTML רגיל כדי שיקבל את העיצוב הייעודי והקומפקטי של טבלת אדמין במקום Button כללי */}
                    <button 
                      className="admin-btn-delete" 
                      onClick={() => handleDeleteBlog(blog.blog_ID, blog.Title)}
                    >
                      מחק
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminBlogsPage;