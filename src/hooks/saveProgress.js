const API_BASE = 'http://localhost:3001/api';
const USER_ID = 'test-user'; // Later: replace with auth or session

export function saveProgress() {
  const saveMyProgress = async (moduleId, status = 'completed') => {
    try {
      const response = await fetch(`${API_BASE}/progress/${USER_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ moduleId, status }),
      });

      if (!response.ok) {
        console.error('Failed to save progress:', await response.text());
        return false;
      }

      return true;
    } catch (err) {
      console.error('Error saving progress:', err);
      return false;
    }
  };

  return saveMyProgress;
}
