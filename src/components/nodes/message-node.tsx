import { FaWhatsapp } from "react-icons/fa";
import { PiMessengerLogo } from "react-icons/pi";
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
      <div className="block-title bg-[#b2f0e3] p-2 gap-x-2 flex items-center">
        <PiMessengerLogo size={18} />
        <p className="text-lg font-medium mr-auto">Send Message</p>
        <FaWhatsapp size={18} />
      </div>
      <div className="block-message px-5 py-2 min-h-[40px]">{data.message}</div>

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
