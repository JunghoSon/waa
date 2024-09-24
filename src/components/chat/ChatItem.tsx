import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  name: string;
  time: string;
  message: string;
  thumbnail: string;
}

export default function ChatItem({ message, name, thumbnail, time }: Props) {
  return (
    <div className="flex gap-x-2 px-4">
      <Avatar className="w-10 h-10 rounded-lg">
        <AvatarImage src={thumbnail} alt="" />
        <AvatarFallback>{name}</AvatarFallback>
      </Avatar>
      <div>
        <div className="flex gap-x-2 items-end">
          <span className="text-sm font-bold">{name}</span>
          <span className="text-xs text-gray-600">{time}</span>
        </div>
        <div className="text-base">
          {/* TODO: 여러 줄 처리, markdown?? */}
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}
