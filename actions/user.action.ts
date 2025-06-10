"use server";
import { getDbInstance } from "@/lib/db";
import { API } from "@/lib/fetch";
import { users } from "@/lib/schema";
import { formatDate } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function getUsers(): Promise<{
  data: (typeof users)[] | null;
  error: any;
}> {
  const db = await getDbInstance();
  if (!db) return { data: null, error: "Db Error!" };
  const selectResult = await db.select().from(users).limit(6);
  console.log("Results", selectResult);
  return { data: [], error: null };
}
type GetAllUsersParams = {
  page?: number;
  limit?: number;
  search?: string;
  type?: string | null;
  sort?: [string, "asc" | "desc"][];
};

export async function getAllUsers(
  page: number,
  limit: number,
  search: string = "",
  params?: {
    status: string;
    sort: any[];
    from: string;
    to: string;
    role: string;
  }
) {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("offset", page.toString());
    queryParams.append("limit", limit.toString());
    if (search) queryParams.append("search", search);
    const where: any = {};
    if (params?.role && params?.role.length > 0) where["role"] = params?.role;
    if (params?.sort?.length)
      queryParams.append("sort", JSON.stringify([params?.sort]));
    if (
      params?.from &&
      params?.from.length > 0 &&
      params?.to &&
      params?.to.length > 0
    ) {
      where["created_at"] = {
        $gte: formatDate(params.from, false),
        $lte: formatDate(params.to, true),
      };
    }
    queryParams.append("where", JSON.stringify(where));
    const resp: { error: any; data: any } = (await API.Get(
      `user?${queryParams.toString() || ""}`
    )) as { error: any; data: any };
    revalidatePath("/(authenticated)/users", "page");
    return resp.data;
  } catch (error: any) {
    return { error: true, data: null };
  }
}

export async function getUserByUid(uid: string) {
  try {
    const resp: { error: any; data: any } = (await API.Get(`user/${uid}`)) as {
      error: any;
      data: any;
    };
    return resp.data?.user;
  } catch (error: any) {
    return { error: true, data: null };
  }
}
