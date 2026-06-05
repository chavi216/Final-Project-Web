import React, { useEffect, useState } from 'react';
import { apiService } from '../../api/api';
import FoodPlanDayTable from '../../components/client/FoodPlanDayTable';

const ClientFoodPlanPage = () => {
  const [foodLogs, setFoodLogs] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFoodPlan = async () => {
      try {
        const data = await apiService.client.getFoodPlan();
        setFoodLogs(data);
      } catch (err) {
        setError(err.message || 'נכשלה טעינת תוכנית התזונה');
      } finally {
        setLoading(false);
      }
    };
    loadFoodPlan();
  }, []);

  if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>טוען תוכנית תזונה...</div>;
  if (error) return <div style={{ color: 'red', padding: '20px' }}>שגיאה: {error}</div>;

  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>🥗 תוכנית התזונה שלי</h2>
      <hr />
      <div style={{ marginTop: '20px' }}>
        <FoodPlanDayTable foodLogs={foodLogs} />
      </div>
    </div>
  );
};

export default ClientFoodPlanPage;