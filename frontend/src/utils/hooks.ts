import { useEffect, useRef, useState } from "react";
import store from "@/store/store";
import { setTitle } from "@/store/titleSlice";
import { apiErrorHandler } from "@/api";

export function useClickAnywhere(handler: EventListenerOrEventListenerObject) {
  return useEffect(() => {
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [handler]);
}

export function useLoadData<T>(handler: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;
    setLoading(true);

    handler()
      .then((loadedData) => {
        if (!ignore) {
          setData(loadedData);
          setLoading(false);
        }
      })
      .catch((e) => {
        if (!ignore) {
          apiErrorHandler(e);
        }
      });

    return () => {
      ignore = true;
    };
  }, [handler]);

  return [data, loading, setData];
}

export function useTitle(title: string) {
  useEffect(() => {
    store.dispatch(setTitle(title));
    return () => {
      store.dispatch(setTitle(""));
    };
  }, [title]);
}

export function useRerender() {
  const [updateKey, setUpdateKey] = useState(0);

  return () => setUpdateKey(updateKey + 1);
}

export function useTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  });

  return time;
}

export function usePrevious<T>(value: T) {
  const prevRef = useRef<T | null>(null);
  useEffect(() => {
    prevRef.current = value;
  }, [value]);

  return prevRef.current;
}
