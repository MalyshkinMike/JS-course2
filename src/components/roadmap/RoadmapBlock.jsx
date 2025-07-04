import React from "react";
import clsx from "clsx";
import { useProgress } from '../../hooks/useProgress';


const RoadmapBlock = ({
  block,
  isExpanded,
  toggleExpand,
  isLocked,
  blockRefs,
}) => {
  const progress = useProgress(); // { "html-basics": "completed", ... }
  const completedCount = block.modules.filter(
    (m) => progress[m.id] === "completed"
  ).length;
  const totalModules = block.modules.length;
  const isCompleted = completedCount === totalModules;
  

  return (
    <div
      ref={(el) => (blockRefs.current[block.id] = el)}
      className={clsx(
        "roadmap-node",
        block.optional && "optional",
        !isCompleted && isLocked && "locked",
        isCompleted && "done",
        !isCompleted && !isLocked && "pending"
      )}
      onClick={() => toggleExpand(block.id)}
    >
      <div className="block-title">
        {block.title}
        <span className="progress">
          {completedCount}/{totalModules}
        </span>
      </div>

      {isExpanded && (
        <div className="module-list">
          {block.modules.map((mod) => (
            <div key={mod.id} className={clsx("module", progress[mod.id])}>
              <label className="checkbox-wrapper">
                <input
                  type="checkbox"
                  checked={progress[mod.id] === "completed"}
                  readOnly
                  className="custom-checkbox"
                />
                <span className="checkmark"></span>
                {mod.title}
              </label>
              <div className="module-actions">
                <button
                  className="module-btn theory"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = mod.theory;
                  }}
                >
                  Theory
                </button>
                <button
                  className="module-btn test"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = mod.test;
                  }}
                >
                  Test
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isExpanded && (
        <div className="final-test-wrapper">
        <button
          className="final-test-btn"
          onClick={(e) => {
            e.stopPropagation();
            window.location.href = `${block.test}`;
          }}
        >
          Final Test
        </button>
      </div>
      )}
      
    </div>
  );
};

export default RoadmapBlock;
