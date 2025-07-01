import React, { useState, useEffect } from 'react';
import roadmap from '@site/src/components/data/roadmap';
import styles from './roadmap.module.css';

const getProgress = () => {
  const saved = localStorage.getItem('roadmapProgress');
  return saved ? JSON.parse(saved) : {};
};

const saveProgress = (progress) => {
  localStorage.setItem('roadmapProgress', JSON.stringify(progress));
};

export default function RoadmapPage() {
  const [progress, setProgress] = useState({});

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const toggleStatus = (blockId, moduleId) => {
    const newProgress = {
      ...progress,
      [blockId]: {
        ...progress[blockId],
        [moduleId]: progress[blockId]?.[moduleId] === 'completed' ? 'open' : 'completed',
      },
    };
    setProgress(newProgress);
    saveProgress(newProgress);
  };

  return (
    <div className={styles.container}>
      <h1>🚀 Learning Roadmap</h1>
      {roadmap.map((block) => (
        <div key={block.id} className={styles.block}>
          <h2>{block.title}</h2>
          <ul>
            {block.modules.map((mod) => {
              const status = progress[block.id]?.[mod.id] || 'open';
              return (
                <li key={mod.id} className={`${styles.module} ${styles[status]}`}>
                  <span>{mod.title}</span>
                  <button onClick={() => toggleStatus(block.id, mod.id)}>
                    {status === 'completed' ? '✓ Done' : 'Mark Complete'}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
