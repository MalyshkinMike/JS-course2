import React, { useCallback, useState, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import roadmap from "../components/roadmap/data/roadmap";
import styles from "./RoadmapFlow.module.css";
import Layout from "@theme/Layout";

// Helper to get completion from localStorage or roadmap
const getInitialStatus = (blockId, moduleId) => {
  const saved = localStorage.getItem(`status-${blockId}-${moduleId}`);
  return saved || "incomplete";
};

const RoadmapFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Generate visual nodes and links
  useEffect(() => {
    const newNodes = roadmap.map((block, index) => {
      const isLocked = block.prerequisites?.some((prereqId) => {
        const prereqBlock = roadmap.find((b) => b.id === prereqId);
        return prereqBlock?.modules.some(
          (m) => getInitialStatus(prereqId, m.id) !== "completed"
        );
      });

      const blockStatus = block.modules.every(
        (m) => getInitialStatus(block.id, m.id) === "completed"
      )
        ? "completed"
        : block.modules.some(
            (m) => getInitialStatus(block.id, m.id) === "completed"
          )
        ? "partial"
        : "incomplete";

      return {
        id: block.id,
        type: "default",
        position: { x: index * 300, y: 100 },
        data: {
          label: (
            <div
              className={`${styles.nodeBox} ${styles[blockStatus]} ${
                isLocked ? styles.locked : ""
              }`}
            >
              <div className={styles.blockTitle}>{block.title}</div>
              <ul className={styles.moduleList}>
                {block.modules.map((module) => (
                  <li key={module.id}>
                    <label>
                      <input
                        type="checkbox"
                        disabled={isLocked}
                        checked={
                          getInitialStatus(block.id, module.id) === "completed"
                        }
                        onChange={(e) => {
                          const newStatus = e.target.checked
                            ? "completed"
                            : "incomplete";
                          localStorage.setItem(
                            `status-${block.id}-${module.id}`,
                            newStatus
                          );
                          window.location.reload();
                        }}
                      />
                      {module.title}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ),
        },
        draggable: false,
      };
    });

    const newEdges = roadmap.flatMap(
      (block) =>
        block.prerequisites?.map((sourceId) => ({
          id: `${sourceId}->${block.id}`,
          source: sourceId,
          target: block.id,
          type: "smoothstep",
          markerEnd: {
            type: MarkerType.Arrow,
          },
        })) || []
    );

    setNodes(newNodes);
    setEdges(newEdges);
  }, []);

  return (
    <Layout>
      <div style={{ width: "90%", position: "center", height: "90vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          panOnScroll
          panOnScrollMode="vertical"
          nodesDraggable={false}
          nodesConnectable={false}
          zoomOnScroll={false}
          zoomOnDoubleClick={false}
          panOnDrag={false}
          elementsSelectable={false}
          style={{ width: "100%", height: "80vh" }}
        >
        </ReactFlow>
      </div>
    </Layout>
  );
};

export default RoadmapFlow;
