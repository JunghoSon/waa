import { api } from "@/api/config";
import { AxiosPromise } from "axios";
import { stringify } from "qs";

export interface Membership {
  email: string;
  name: string;
  status: "ACTIVE" | "INACTIVE" | "DELETED";
  userID: string;
  workspaces: {
    memberID: string;
    profile: {
      memberProfileID: number;
      nickname: string;
      profileImage: string;
    };
    role: "CREATOR" | "ADMIN" | "NORMAL";
    rooms: {
      role: "CREATOR" | "ADMIN" | "NORMAL";
      roomID: string;
      status: "ACTIVE" | "INACTIVE" | "DELETED";
    }[];
    status: "ACTIVE";
    workspaceID: string;
  }[];
}

export interface Member {
  email: string;
  is_deleted: boolean;
  member_id: string;
  name: string;
  nickname: string;
  presence: "ONLINE" | "OFFLINE" | "AWAY" | "BUSY" | "MEETING" | "DAYOFF";
  profile_image: string;
  status: "INVITED" | "VITED" | "LEAVE";
  workspace_id: string;
}

export const getMembership = (): AxiosPromise<{
  user_membership: Membership;
}> => api.get("/user-api/users/membership");

export const getMembers = ({
  workspaceId,
  memberIds,
}: {
  workspaceId: string;
  memberIds: string[];
}): AxiosPromise<Member[]> =>
  api.get(`/user-api/workspaces/${workspaceId}/members`, {
    params: {
      member_ids: memberIds,
    },
    paramsSerializer: (params) => stringify(params, { arrayFormat: "comma" }),
  });
