import { Handle, NodeProps, Position } from "reactflow";

type MessageNodeProps = {
  message?: string;
};

export type messageNodeType = {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: { message?: string };
};

export default function MessageNode({ data }: NodeProps<MessageNodeProps>) {
  return (
    <div className="msg-node border-2 shadow-xl bg-white min-w-60 rounded-md max-w-[350px] break-words">
      <div className="block-title bg-[#b2f0e3] px-5">
        <p className="font-[500]">Send Message</p>
      </div>
      <div className="block-message px-5 py-2 min-h-[40px]">{data.message}</div>

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
