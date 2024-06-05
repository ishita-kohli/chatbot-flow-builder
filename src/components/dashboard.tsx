"use client";

import { FC, useCallback, useState } from "react";
import {
  Background,
  Controls,
  MiniMap,
  Node,
  OnConnect,
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";

import {
  getNewNodeId,
  isDuplicateEdgeStart,
  validateFlow,
} from "@/utils/reactflow";
import "reactflow/dist/style.css";
import { toast } from "sonner";
import Header from "./header";
import { nodeTypes } from "./nodes";
import Sidebar from "./sidebar";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}) => {
  const reactFlow = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: getNewNodeId(),
      type: "message",
      position: reactFlow.project({ x: 100, y: 100 }),
      data: { message: "New Message" },
    },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [activeNode, setActiveNode] = useState<Node | null>(null);

  const onConnect: OnConnect = (connection) => {
    if (isDuplicateEdgeStart(edges, connection)) {
      console.log("Duplicate edge start");
      return;
    }

    const edge = {
      id: `${connection.source}-${connection.target}`,
      ...connection,
    };
    setEdges((edges) => addEdge(edge, edges));
  };

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const type = event.dataTransfer.getData("application/reactflow");
    if (typeof type === "undefined" || !type || type !== "message") {
      return;
    }
    const position = reactFlow.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const newNode: Node = {
      id: getNewNodeId(),
      type,
      position,
      data: { message: "New Message" },
    };

    setNodes((nodes) => nodes.concat(newNode));
    setActiveNode(newNode);
  };

  const saveFlow = () => {
    const isFlowValid = validateFlow(nodes, edges);
    if (!isFlowValid) {
      toast.error("Cannot save flow");
      return;
    }

    console.log("flow_state", {
      nodes,
      edges,
    });
    toast.success("Flow saved");
  };

  const resetFlow = () => {
    setNodes([]);
    setEdges([]);
  };

  return (
    <section>
      <Header onSave={saveFlow} onClear={resetFlow} />

      <main className="flow-container grid grid-cols-[3fr_1fr]">
        <div className="flow-1 w-[75vw] h-[92vh]">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Background />
            <MiniMap />
            <Controls />
          </ReactFlow>
        </div>

        <Sidebar activeNode={activeNode} setActiveNode={setActiveNode} />
      </main>
    </section>
  );
};

const DashboardWrapper: FC = ({}) => {
  return (
    <ReactFlowProvider>
      <Dashboard />
    </ReactFlowProvider>
  );
};

export default DashboardWrapper;
