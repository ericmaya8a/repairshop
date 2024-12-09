"use server";

import { urls } from "@/constants";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export async function validateIsAuthenticated() {
  const { isAuthenticated } = getKindeServerSession();
  const isAuth = await isAuthenticated();

  if (!isAuth) redirect(urls.LOGIN);
}
