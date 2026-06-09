import React from 'react';
import BlogManager from '../../components/common/BlogManager';

const NutritionistBlogsPage = () => {
    return (
        <div style={{ padding: '10px' }}>
            <div style={{ marginBottom: '20px' }}>
                <h2>ניהול מאמרים ובלוגים</h2>
                <p style={{ color: '#666' }}>כאן תוכל לכתוב, לערוך ולפרסם מאמרים למטופלים שלך או לכלל המערכת.</p>
            </div>
            
            {/* קריאה לקומפוננטה המשותפת עם התפקיד של התזונאי */}
            <BlogManager role="nutritionist" />
        </div>
    );
};

export default NutritionistBlogsPage;