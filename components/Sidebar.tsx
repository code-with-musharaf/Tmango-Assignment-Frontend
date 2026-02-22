"use client";

import { Lock, Check, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useApi } from "@/hooks/useApi";
import {
  setGlobalLoading,
  setRefetchValue,
  setSelectedDay,
  setSelectedDayData,
} from "@/redux/slices/global.slice";
import SidebarSkeleton from "./SidebarSkeleton";

interface DayItem {
  day: number;
  locked: boolean;
  completed: boolean;
  selected: boolean;
}

const initialDaysData: DayItem[] = [
  { day: 1, locked: true, completed: false, selected: false },
  { day: 2, locked: true, completed: false, selected: false },
  { day: 3, locked: true, completed: false, selected: false },
  { day: 4, locked: true, completed: false, selected: false },
  { day: 5, locked: true, completed: false, selected: false },
  { day: 6, locked: true, completed: false, selected: false },
  { day: 7, locked: true, completed: false, selected: false },
  { day: 8, locked: true, completed: false, selected: false },
  { day: 9, locked: true, completed: false, selected: false },
  { day: 10, locked: true, completed: false, selected: false },
  { day: 11, locked: true, completed: false, selected: false },
  { day: 12, locked: true, completed: false, selected: false },
  { day: 13, locked: true, completed: false, selected: false },
  { day: 14, locked: true, completed: false, selected: false },
  { day: 15, locked: true, completed: false, selected: false },
  { day: 16, locked: true, completed: false, selected: false },
  { day: 17, locked: true, completed: false, selected: false },
  { day: 18, locked: true, completed: false, selected: false },
  { day: 19, locked: true, completed: false, selected: false },
  { day: 20, locked: true, completed: false, selected: false },
  { day: 21, locked: true, completed: false, selected: false },
  { day: 22, locked: true, completed: false, selected: false },
  { day: 23, locked: true, completed: false, selected: false },
  { day: 24, locked: true, completed: false, selected: false },
  { day: 25, locked: true, completed: false, selected: false },
  { day: 26, locked: true, completed: false, selected: false },
  { day: 27, locked: true, completed: false, selected: false },
  { day: 28, locked: true, completed: false, selected: false },
  { day: 29, locked: true, completed: false, selected: false },
  { day: 30, locked: true, completed: false, selected: false },
];

export default function ChallengeSidebar() {
  const { theme, refetchValue, selectedDay } = useAppSelector(
    (state) => state.global,
  );
  const { getAllSubmission } = useApi();
  const dispatch = useAppDispatch();

  const [activeDay, setActiveDay] = useState<number>(1);
  const [isOpen, setIsOpen] = useState(false);
  const [daysData, setDayData] = useState<DayItem[]>(initialDaysData);
  const [loading, setLoading] = useState(true);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | any | null)[]>([]);

  // Scroll sidebar
  useEffect(() => {
    const index = daysData.findIndex((d) => d.day === activeDay);
    const container = scrollRef.current;
    const target = itemRefs.current[index];

    if (container && target) {
      container.scrollTo({
        top: target.offsetTop - 120,
        behavior: "smooth",
      });
    }
  }, [activeDay]);

  const handleUnlockDay = (completeDayCount: number) => {
    const allDayData = daysData;
    allDayData.forEach((item) => {
      if (item.day <= completeDayCount) {
        item.locked = false;
        item.completed = true;
      }
    });
    let completedDays: any = allDayData.filter((item) => {
      return item.completed;
    });
    const nextDay = allDayData.find((item) => {
      return item.day === completedDays.length + 1;
    });
    if (nextDay) {
      nextDay.locked = false;
      nextDay.selected = true;
    }
    const incompletedDays = allDayData
      .filter((item) => {
        return !item.completed;
      })
      .filter((item) => {
        return item.day !== nextDay?.day;
      });

    if (completedDays.length > 2) {
      completedDays = completedDays.slice(-2);
    }
    setDayData([...completedDays, nextDay, ...incompletedDays]);

    if (nextDay?.day) dispatch(setSelectedDay(nextDay?.day));
    dispatch(setRefetchValue(""));
  };

  const fetchSubmissions = async () => {
    try {
      dispatch(setGlobalLoading(true));
      const resp = await getAllSubmission();
      if (resp?.length > 0) {
        const lastSubmissionDayCount = resp?.[0]?.dayCount;
        handleUnlockDay(lastSubmissionDayCount);
      } else {
        handleUnlockDay(0);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
        dispatch(setGlobalLoading(false));
      }, 4000);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  useEffect(() => {
    if (refetchValue === "sidebar") {
      handleDayChange(selectedDay, true, true);
    }
  }, [refetchValue]);

  const handleDayChange = (
    dayValue: number,
    completed = false,
    makeNextDayActive = false,
  ) => {
    const chosenDay = daysData.find((item) => {
      return item.day === dayValue;
    });
    if (chosenDay?.locked) {
      return;
    }
    setActiveDay(dayValue);
    dispatch(setSelectedDay(dayValue));
    dispatch(
      setSelectedDayData({
        ...chosenDay,
        completed: completed ? completed : chosenDay?.completed,
      }),
    );

    if (makeNextDayActive) {
      setDayData((prev) => {
        return prev
          .map((item) => ({ ...item, selected: false }))
          .map((item) => {
            if (item.day === dayValue) {
              return {
                ...item,
                selected: true,
                completed: completed ? completed : item.completed,
              };
            }
            if (item.day === dayValue + 1) {
              return { ...item, locked: false };
            }
            return item;
          });
      });
    } else {
      setDayData((prev) => {
        return prev
          .map((item) => ({ ...item, selected: false }))
          .map((item) => {
            if (item.day === dayValue) {
              return {
                ...item,
                selected: true,
                completed: completed ? completed : item.completed,
              };
            }
            return item;
          });
      });
    }
  };
  return (
    <>
      {/* // Mobile hamburger  */}
      <button
        onClick={() => setIsOpen(true)}
        className="sm:hidden fixed top-24 left-3 z-2 p-2 rounded-full shadow-md bg-white dark:bg-gray-900"
      >
        <Menu className="w-5 h-5 text-gray-800 dark:text-white" />
      </button>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 sm:hidden"
        />
      )}

      {/* // Desktop side bar  */}
      <div
        className={clsx(
          "fixed sm:static top-0 left-0 h-[100vh] overflow-auto w-[400px] border-r backdrop-blur-xl transition-transform duration-300 z-2",
          isOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0",
          theme === "dark"
            ? "bg-gradient-to-b from-[#0f0f0f] via-[#111] to-[#0d0d0d] border-gray-800"
            : "bg-gradient-to-b from-gray-200 via-gray-100 to-gray-200 border-gray-300",
        )}
      >
        <div className="flex justify-between items-center px-4 py-5 sm:hidden">
          <h2 className="font-semibold text-gray-800 dark:text-white">
            Challenge Days
          </h2>
          <button onClick={() => setIsOpen(false)}>
            <X className="w-5 h-5 text-gray-800 dark:text-white" />
          </button>
        </div>

        {/* // scroll section  */}
        <div
          ref={scrollRef}
          className="h-full overflow-y-auto px-4 py-6 space-y-5"
        >
          {loading ? (
            <SidebarSkeleton count={12} />
          ) : (
            daysData.map((item, index) => {
              return (
                <div
                  key={item.day}
                  ref={(el) => (itemRefs.current[index] = el) as any}
                  onClick={() => handleDayChange(item.day)}
                  className={clsx(
                    "flex items-center justify-between px-6 py-4 rounded-full cursor-pointer transition-all duration-300",
                    item.selected &&
                      (theme === "dark"
                        ? "bg-black shadow-lg"
                        : "bg-white shadow-md"),
                    !item.selected &&
                      (theme === "dark"
                        ? "hover:bg-white/5"
                        : "hover:bg-white/50"),
                  )}
                >
                  <span
                    className={clsx(
                      "text-lg font-medium tracking-wide",
                      theme === "dark"
                        ? item.selected
                          ? "text-white"
                          : "text-gray-400"
                        : item.selected
                          ? "text-gray-900"
                          : "text-gray-600",
                    )}
                  >
                    Day - {item.day}
                  </span>

                  {/* Right Icon */}
                  {item.completed && (
                    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-green-500">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}

                  {item.locked && !item.completed && (
                    <Lock
                      className={clsx(
                        "w-5 h-5",
                        theme === "dark" ? "text-gray-500" : "text-gray-600",
                      )}
                    />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
