"use client";

import useWorkspaces from "@/hooks/api/useWorkspaces";
import {
  ToggleBlock,
  ToggleBlockContent,
  ToggleBlockTrigger,
} from "../common/ToggleBlock";
import { Button } from "../ui/button";
import Icon from "../ui/Icon";
import { useChatInfoActions, useChatInfoStore } from "@/store/chatInfo";
import { useEffect } from "react";
import useMembers from "@/hooks/api/useMembers";

export default function Workspaces() {
  const { data } = useWorkspaces();
  const { setWorkspaceId } = useChatInfoActions();
  const workspaceId = useChatInfoStore((state) => state.workspaceId);
  const { data: members } = useMembers({ workspaceId, memberIds: [] });

  useEffect(() => {
    if (data?.[0] && !workspaceId) {
      setWorkspaceId(data[0].workspace_id);
    }
  }, [data, workspaceId, setWorkspaceId]);

  return (
    <ToggleBlock className="mt-6">
      <ToggleBlockTrigger>Workspace</ToggleBlockTrigger>
      <ToggleBlockContent>
        {data &&
          data.map((item) => (
            <Button
              variant={
                item.workspace_id === workspaceId ? "secondary" : "ghost"
              }
              className="w-full h-8 gap-x-2 justify-start p-0 pl-3"
              key={item.workspace_id}
            >
              <Icon name="Archive" size={15} />
              {item.name}
            </Button>
          ))}
      </ToggleBlockContent>
    </ToggleBlock>
  );
}
