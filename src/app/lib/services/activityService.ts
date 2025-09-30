import { Activity } from "@/app/state/activityState";

export const fetchActivities = async (userId: string): Promise<Activity[]> => {
    try {
        const res = await fetch (`http://localhost:3000/api/activity?userId=${userId}`);
        if(!res.ok) throw new Error("Failed to fetch activities");
        const data = await res.json();
        return data;
    } catch (err) {
        console.error(err);
        return [];
    }
}

// export const fetchActivities = async (userId?: string): Promise<Activity[]> => {
//   try {
//     const url = userId
//       ? `http://localhost:3000/api/activity?userId=${userId}`
//       : `http://localhost:3000/api/activity`; // semua user

//     const res = await fetch(url);
//     if (!res.ok) throw new Error("Failed to fetch activities");
//     const data = await res.json();
//     return data;
//   } catch (err) {
//     console.error(err);
//     return [];
//   }
// };
