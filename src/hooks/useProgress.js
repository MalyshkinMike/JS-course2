import { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:3001/api';
const USER_ID = 'test-user'; // TODO: replace later with real auth

export function useProgress() {
  const [progress, setProgress] = useState({}); // { moduleId: "completed" }

  useEffect(() => {
    fetch(`${API_BASE}/progress/${USER_ID}`)
      .then((res) => res.json())
      .then((data) => {
        const progressMap = {};
        data.forEach(({ moduleId, status }) => {
          progressMap[moduleId] = status;
        });
        setProgress(progressMap);
      })
      .catch(console.error);
  }, []);

  return progress;
}
