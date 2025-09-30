import { atom } from "jotai";
import { User as UserState } from "./userState";

export interface Activity {
  id_activity: string;
  user: UserState;
  activity: string;
  location: string;
  created_at: string;
}

export const activityAtom = atom<Activity[]>([]);

export const loadingActivityAtom = atom<boolean>(false);
export const errorActivityAtom = atom<string | null>(null);

export const searchActivityQueryAtom = atom<string>("");
