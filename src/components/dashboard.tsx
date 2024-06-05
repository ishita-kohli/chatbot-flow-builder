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
import { nodeTypes } from "./nodes";
import Sidebar from "./sidebar";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}) => {
  const reactFlow = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
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

  return (
    <section>
      <nav className="bg-gray-200 relative flex justify-end px-10">
        <button
          onClick={saveFlow}
          className=" bg-white font-[500] px-3 py-1 my-2 text-blue-600 border rounded-md hover:bg-gray-100"
        >
          Save Changes
        </button>
      </nav>

      <main className="flow-container flex w-full">
        <div className="flow-1 h-[95vh] w-[75%]">
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
