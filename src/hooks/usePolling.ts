import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function usePolling(searchParam: string | null, ms: number = 60000) {
  const router = useRouter();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!searchParam) {
        router.refresh();
      }
    }, ms);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ms, searchParam]);
}
