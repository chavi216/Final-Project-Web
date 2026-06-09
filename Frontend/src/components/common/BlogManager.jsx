import React, { useState, useEffect } from 'react';
import { apiService } from '../../api/api';
import Button from './Button';

const BlogManager = ({ role }) => {
    const [blogs, setBlogs] = useState([]);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    // מצבי הטופס
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [audienceType, setAudienceType] = useState('all'); // ברירת מחדל: לכולם
    const [recipientClientId, setRecipientClientId] = useState('');
    const [editingBlogId, setEditingBlogId] = useState(null);

    const loadData = async () => {
        try {
            const blogsData = await apiService[role].getBlogs();
            const clientsData = await apiService[role].getClients();
            setBlogs(blogsData);
            setClients(clientsData);
        } catch (error) {
            console.error("שגיאה בטעינת הנתונים:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [role]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            Title: title,
            body: body,
            audience_type: audienceType,
            recipient_client_id: audienceType === 'specific' ? recipientClientId : null
        };

        try {
            if (editingBlogId) {
                await apiService[role].updateBlog(editingBlogId, payload);
            } else {
                await apiService[role].createBlog(payload);
            }
            // איפוס טופס
            setTitle('');
            setBody('');
            setAudienceType('all');
            setRecipientClientId('');
            setEditingBlogId(null);
            loadData();
            alert("הבלוג נשמר בהצלחה!");
        } catch (error) {
            alert("שגיאה בשמירת הבלוג: " + error.message);
        }
    };

    const handleEdit = (blog) => {
        setEditingBlogId(blog.blog_ID);
        setTitle(blog.Title);
        setBody(blog.body);
        setAudienceType(blog.audience_type);
        setRecipientClientId(blog.recipient_client_id || '');
    };

    const handleDelete = async (blogId) => {
        if (!window.confirm("האם אתה בטוח שברצונך למחוק מאמר זה?")) return;
        try {
            await apiService[role].deleteBlog(blogId);
            loadData();
        } catch (error) {
            alert("מחיקת המאמר נכשלה");
        }
    };

    if (loading) return <div>טוען מערכת בלוגים...</div>;

    return (
        <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #ddd' }}>
            <h3>{editingBlogId ? '📝 עריכת מאמר/בלוג' : '✍️ כתיבת מאמר/בלוג חדש'}</h3>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
                <input 
                    type="text" 
                    placeholder="כותרת המאמר" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                    style={{ padding: '10px', fontSize: '16px' }}
                />
                <textarea 
                    placeholder="תוכן המאמר..." 
                    value={body} 
                    onChange={(e) => setBody(e.target.value)} 
                    required 
                    style={{ padding: '10px', minHeight: '150px', fontSize: '15px', resize: 'vertical' }}
                />

                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div>
                        <label style={{ fontWeight: 'bold', marginLeft: '8px' }}>קהל יעד:</label>
                        <select value={audienceType} onChange={(e) => setAudienceType(e.target.value)} style={{ padding: '8px' }}>
                            <option value="all">🌍 כל משתמשי המערכת (ציבורי)</option>
                            <option value="my_clients">👥 רק המטופלים שלי</option>
                            <option value="specific">👤 מטופל ספציפי בלבד</option>
                        </select>
                    </div>

                    {/* יוצג רק אם נבחר מטופל ספציפי */}
                    {audienceType === 'specific' && (
                        <div>
                            <label style={{ fontWeight: 'bold', marginLeft: '8px' }}>בחר מטופל:</label>
                            <select 
                                value={recipientClientId} 
                                onChange={(e) => setRecipientClientId(e.target.value)} 
                                required
                                style={{ padding: '8px' }}
                            >
                                <option value="" disabled>-- בחר מטופל --</option>
                                {clients.map(c => (
                                    <option key={c.ID} value={c.ID}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <Button type="submit">{editingBlogId ? 'עדכן והפץ' : 'פרסם מאמר'}</Button>
                    {editingBlogId && <Button type="button" onClick={() => { setEditingBlogId(null); setTitle(''); setBody(''); setAudienceType('all'); }}>בטל עריכה</Button>}
                </div>
            </form>

            <hr />
            <h4>המאמרים שפרסמת בעבר:</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {blogs.length === 0 ? <p>טרם פרסמת מאמרים.</p> : blogs.map(blog => (
                    <div key={blog.blog_ID} style={{ border: '1px solid #eee', padding: '15px', borderRadius: '6px', backgroundColor: '#f9f9f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h5 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>{blog.Title}</h5>
                            <span style={{ fontSize: '12px', padding: '3px 8px', borderRadius: '12px', backgroundColor: '#e2e8f0', color: '#4a5568' }}>
                                קהל יעד: {blog.audience_type === 'all' ? 'כל המערכת' : blog.audience_type === 'my_clients' ? 'הלקוחות שלי' : 'מטופל ספציפי'}
                            </span>
                        </div>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <button onClick={() => handleEdit(blog)} style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer' }}>✏️ ערוך</button>
                            <button onClick={() => handleDelete(blog.blog_ID)} style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}>🗑️ מחק</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogManager;