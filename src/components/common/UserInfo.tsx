import useMembership from "@/hooks/api/useMembership";
import { Separator } from "../ui/separator";

export default function UserInfo() {
  const { data } = useMembership();
  return (
    <>
      {data && (
        <div className="w-full flex-1">
          <div className="flex space-x-2 items-center">
            <span>{data.name}</span>
            <Separator orientation="vertical" className="h-3" />
            <div className="flex items-center gap-x-1">
              <span className="py-1 px-2 rounded-sm inline-block mr-1 bg-primary text-primary-foreground text-xs">
                근무중
              </span>
              <span className="text-sm">8:00 ~ 20:00</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
