import React from 'react';
import './styles/FoodPlanDayTable.css';

const FoodPlanDayTable = ({ foodLogs }) => {
  if (!foodLogs || foodLogs.length === 0) {
    return <p className="no-plan-message">לא קיימת תוכנית תזונה מוגדרת לתאריך זה.</p>;
  }

  // חישוב סך הכל הקלוריות לתוכנית המוצגת
  const totalCalories = foodLogs.reduce((sum, item) => sum + (item.calories || 0), 0);

  // פורמט תאריך קריא מהרשומה הראשונה
  const formattedDate = new Date(foodLogs[0].date).toLocaleDateString('he-IL');

  return (
    <div className="food-plan-container">
      <div className="food-plan-header">
        <h4>תוכנית תזונה לתאריך: {formattedDate}</h4>
      </div>
      <table className="food-table">
        <thead>
          <tr>
            <th>פירוט מאכלים ותפריט</th>
            <th>כמות קלוריות</th>
          </tr>
        </thead>
        <tbody>
          {foodLogs.map((item) => (
            <tr key={item.Table_ID}>
              <td className="food-details-td">{item.food}</td>
              <td className="calories-td">{item.calories} קק"ל</td>
            </tr>
          ))}
          <tr className="total-row">
            <td><strong>סך הכל קלוריות יומי:</strong></td>
            <td><strong>{totalCalories} קק"ל</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FoodPlanDayTable;