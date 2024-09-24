import { Member } from "@/api/userApi";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { enableMapSet } from "immer";

enableMapSet();

interface Param {
  id: string;
  member: Member;
}

export type MembersStore = {
  members: Map<string, Member>;
};

export type MembersActions = {
  actions: {
    setMember: (param: Param) => void;
    addMember: (members: Member[]) => void;
  };
};

export const intialState: MembersStore = {
  members: new Map(),
};

export const useMembersStore = create<MembersStore & MembersActions>()(
  devtools(
    immer((set) => ({
      ...intialState,
      actions: {
        setMember: ({ id, member }: Param) => {
          set((state) => {
            state.members.set(id, member);
          });
        },
        addMember: (members: Member[]) => {
          set((state) => {
            members.forEach((item) => {
              state.members.set(item.member_id, item);
            });
          });
        },
      },
    }))
  )
);

export const useMembersActions = () =>
  useMembersStore((store) => store.actions);
