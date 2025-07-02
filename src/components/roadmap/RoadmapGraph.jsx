import React, { useState, useRef } from "react";
import { useColorMode } from "@docusaurus/theme-common";
import clsx from "clsx";
import roadmap from "./data/roadmap";
import RoadmapBlock from "./RoadmapBlock";
import RoadmapConnections from "./RoadmapConnections";
import "./css/Roadmap.css";

function isBlockCompleted(block) {
  return block.modules.every((m) => m.status === "completed");
}

function assignLevels(blocks) {
  const map = {};
  blocks.forEach((block) => {
    map[block.id] = block;
  });

  const levels = {};

  function dfs(block) {
    if (levels[block.id] !== undefined) return levels[block.id];
    if (!block.dependsOn || block.dependsOn.length === 0) {
      levels[block.id] = 0;
    } else {
      const depLevels = block.dependsOn.map((depId) => {
        if (!map[depId]) {
          console.warn(`Missing dependency: ${depId}`);
          return 0;
        }
        return dfs(map[depId]);
      });
      levels[block.id] = Math.max(...depLevels) + 1;
    }
    return levels[block.id];
  }

  blocks.forEach((b) => dfs(b));
  return levels;
}

const RoadmapGraph = () => {
  const [expanded, setExpanded] = useState(null);
  const { colorMode } = useColorMode();
  const blockRefs = useRef({});
  const blockStatusMap = {};
  roadmap.forEach((block) => {
    blockStatusMap[block.id] = isBlockCompleted(block);
  });

  const levels = assignLevels(roadmap);
  const grouped = {};

  roadmap.forEach((block) => {
    const level = levels[block.id];
    if (!grouped[level]) grouped[level] = [];
    grouped[level].push(block);
  });

  const toggleExpand = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  return (
    <div className="roadmap-graph-wrapper" style={{ position: "relative" }}>
      <div className={clsx("roadmap-container", colorMode)}>
        {Object.keys(grouped)
          .sort((a, b) => Number(a) - Number(b))
          .map((level) => (
            <div key={level} className="roadmap-row">
              {grouped[level].map((block) => (
                <RoadmapBlock
                  key={block.id}
                  block={block}
                  isExpanded={expanded === block.id}
                  toggleExpand={toggleExpand}
                  isLocked={block.dependsOn.some((dep) => !blockStatusMap[dep])}
                  blockRefs={blockRefs} // 👈 Pass this down
                />
              ))}
            </div>
          ))}
      </div>
      <RoadmapConnections roadmap={roadmap} blockRefs={blockRefs} expanded={expanded}/>
    </div>
  );
};

export default RoadmapGraph;
