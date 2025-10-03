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

export const pageAtom = atom<number>(1);
export const pageSizeAtom = atom<number>(10);
export const sortByAtom = atom<string>("created_at");
export const sortOrderAtom = atom<"ASC" | "DESC">("ASC");
