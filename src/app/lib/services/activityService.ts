import { Activity } from "@/app/state/activityState";

export const fetchActivities = async (
  page: number,
  pageSize: number,
  sortBy: string,
  sortOrder: "ASC" | "DESC",
  username?: string
): Promise<{ data: Activity[]; total: number }> => {
  try {
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
      sortBy,
      sortOrder,
    });

    if (username) params.append("username", username);

    const res = await fetch(`/api/activity?${params.toString()}`);

    if (!res.ok) {
      const errText = await res.text();
      console.error("fetchActivities error response:", res.status, errText);
      throw new Error("Failed to fetch activities");
    }

    const json = await res.json();

    return {
      data: json.data || [],
      total: json.pagination?.total || 0,
    };
  } catch (err) {
    console.error("Error fetching activities:", err);
    return { data: [], total: 0 };
  }
};

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
