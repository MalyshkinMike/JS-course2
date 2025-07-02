import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";

const RoadmapBlock = ({
  block,
  isExpanded,
  toggleExpand,
  isLocked,
  blockRefs,
}) => {
  const completedCount = block.modules.filter(
    (m) => m.status === "completed"
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
            <Link
              key={mod.id}
              to={mod.link}
              onClick={(e) => e.stopPropagation()}
              className={clsx("module", mod.status)}
            >
              <label className="checkbox-wrapper">
                <input
                  type="checkbox"
                  checked={mod.status === "completed"}
                  readOnly
                  className="custom-checkbox"
                />
                <span className="checkmark"></span>
                {mod.title}
              </label>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoadmapBlock;
