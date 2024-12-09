import { urls } from "@/constants";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(urls.TICKETS);
}
