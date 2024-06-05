import { Edge, Node } from "reactflow";
import { v4 } from "uuid";

export const getNewNodeId = (): string => {
  return v4();
};

export const isDuplicateEdgeStart = (
  edges: Edge[],
  connection: any
): boolean => {
  return edges.some((edge) => {
    return edge.source === connection.source;
  });
};

export const isValidUniqueSelection = (selection: {
  nodes: Node[];
  edges: Edge[];
}) => {
  return selection.nodes.length === 1 && selection.edges.length === 0;
};

export const validateFlow = (nodes: Node[], edges: Edge[]): boolean => {
  if (nodes.length < 2) {
    return true;
  }

  const nodeTargetCounts = new Map<string, number>();
  nodes.forEach((node) => {
    nodeTargetCounts.set(node.id, 0);
  });

  edges.forEach((edge) => {
    const currentCount = nodeTargetCounts.get(edge?.target);
    if (nodeTargetCounts.has(edge.target) && currentCount !== undefined) {
      nodeTargetCounts.set(edge.target, currentCount + 1);
    }
  });

  let emptyTargetHandlesCount = 0;
  nodeTargetCounts.forEach((count) => {
    if (count === 0) {
      emptyTargetHandlesCount++;
    }
  });

  return emptyTargetHandlesCount <= 1;
};
