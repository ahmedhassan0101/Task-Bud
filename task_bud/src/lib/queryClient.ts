import { QueryClient, DefaultOptions } from "@tanstack/react-query";

const defaultOptions: DefaultOptions = {
  queries: {
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: (attemptIndex: number) =>
      Math.min(1000 * 2 ** attemptIndex, 30000),
  },
  mutations: {
    retry: 1,
    retryDelay: 1000,
  },
};

export const queryClient = new QueryClient({ defaultOptions });

/* ------------------------------------ - ----------------------------------- */
// staleTime (5 minutes in our case):

//    Imagine you're checking the weather.
//    You don't need to refresh it every second - checking every 5 minutes is enough.
//    staleTime tells React Query "this data is still fresh enough to use" for 5 minutes. During this time, React Query won't make unnecessary server
//    - Controls when data is considered "stale" and needs refreshing
//    - During these 5 minutes, if another component requests the same data, it will get the cached version without making a new server request
//    - Think of it like a fresh sandwich - it's still good to eat for a while
/* ------------------------------------ - ----------------------------------- */
// gcTime (30 minutes in our case):

//    Think of this like keeping takeout food in the fridge.
//    Even after it's "stale" (staleTime), we keep it for 30 minutes before throwing it away completely.
//    This helps if a user navigates away and comes back - we can show the old data immediately while fetching fresh data.
//    - Controls how long inactive data remains in memory before being garbage collected
//    - Even after data becomes stale, we keep it around for this duration
//    - Think of it like keeping leftover food in the fridge - it might not be fresh, but we keep it just in case

/* ------------------------------------ - ----------------------------------- */
// Timeline of events:

//    1:00 PM - Fetch tasks from server
//    1:01 PM - Data is in cache and fresh
//    1:04 PM - Another component needs tasks → uses cached data (within staleTime)
//    1:05 PM - staleTime expires → data becomes stale
//    1:06 PM - New request → will fetch fresh data, but shows stale data while loading
//    1:30 PM - gcTime expires → if no one has used the data, it's removed from memory
/* ------------------------------------ - ----------------------------------- */
// retry (2) and retryDelay:
//    If a request fails, React Query will automatically try again twice.
//    The retryDelay determines how long to wait between attempts, using exponential backoff: