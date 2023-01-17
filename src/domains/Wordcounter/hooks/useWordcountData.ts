import { add, format, startOfMonth, startOfWeek } from "date-fns";
import { WordcountDataPoint } from "domains/Wordcounter/sharedTypes";
import * as React from "react";

export const INTERVALS = {
  HOURS: "HOURS",
  FIFTEEN_MINS: "FIFTEEN_MINS",
  DAYS: "DAYS",
  WEEKS: "WEEKS",
  MONTHS: "MONTHS",
};

export const getIntervalLabels = (input: keyof typeof INTERVALS) => {
  switch (input) {
    case INTERVALS.HOURS:
      return "Hours";
    case INTERVALS.FIFTEEN_MINS:
      return "15 Minutes";
    case INTERVALS.DAYS:
      return "Days";
    case INTERVALS.WEEKS:
      return "Weeks";
    case INTERVALS.MONTHS:
      return "Months";
  }
};

export const getIntervalDuration = (
  input: keyof typeof INTERVALS
): Duration => {
  switch (input) {
    case INTERVALS.HOURS:
      return { hours: 1 };
    case INTERVALS.FIFTEEN_MINS:
      return { minutes: 15 };
    case INTERVALS.DAYS:
      return { days: 1 };
    case INTERVALS.WEEKS:
      return { weeks: 1 };
    case INTERVALS.MONTHS:
      return { months: 1 };
  }
};

const formatLabelDate = (d: Date) => {
  return format(d, "eee, M/d p");
};

export const useWordcountData = ({
  allDataPoints,
}: {
  allDataPoints: WordcountDataPoint[];
}) => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  let endOfToday = add(startOfToday, { days: 1 });

  const [startDate, setStartDate] = React.useState(startOfToday);
  const [endDate, setEndDate] = React.useState(endOfToday);
  const [currentInterval, setCurrentInterval] =
    React.useState<keyof typeof INTERVALS>("HOURS");

  const datesToShow = React.useMemo(() => {
    let date = new Date(startDate);
    let labels: Date[] = [];
    const duration = getIntervalDuration(currentInterval);
    while (date < endDate) {
      labels.push(date);
      date = add(date, duration);
    }
    return labels;
  }, [startDate, endDate, currentInterval]);

  const { wordcountData, keystrokesData } = React.useMemo(() => {
    let wordcounts: number[] = [];
    let keystrokes: number[] = [];
    const duration = getIntervalDuration(currentInterval);
    const filteredData = allDataPoints.filter(
      (datapoint) => datapoint.time >= startDate && datapoint.time <= endDate
    );
    for (let date of datesToShow) {
      const endOfInterval = add(date, duration);
      const wordcountDuringInterval = filteredData.reduce((sum, dp) => {
        if (dp.time >= date && dp.time <= endOfInterval)
          return sum + dp.wordcount;
        return sum;
      }, 0);
      const keystrokesDuringInterval = filteredData.reduce((sum, dp) => {
        if (dp.time >= date && dp.time <= endOfInterval)
          return sum + dp.keystrokes;
        return sum;
      }, 0);
      wordcounts.push(wordcountDuringInterval);
      keystrokes.push(keystrokesDuringInterval);
    }
    return { wordcountData: wordcounts, keystrokesData: keystrokes };
  }, [datesToShow, currentInterval, startDate, endDate, allDataPoints]);

  const setFiltersToToday = () => {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    let endOfToday = add(startOfToday, { days: 1 });
    setStartDate(startOfToday);
    setEndDate(endOfToday);
    setCurrentInterval("HOURS");
  };
  const setFiltersToThisWeek = () => {
    const now = new Date();
    const startOfThisWeek = startOfWeek(now);
    const endOfThisWeek = add(startOfThisWeek, { weeks: 1 });
    setStartDate(startOfThisWeek);
    setEndDate(endOfThisWeek);
    setCurrentInterval("DAYS");
  };

  const setFiltersToThisMonth = () => {
    const now = new Date();
    const startOfInterval = startOfMonth(now);
    const endOfInterval = add(startOfInterval, { months: 1 });
    setStartDate(startOfInterval);
    setEndDate(endOfInterval);
    setCurrentInterval("DAYS");
  };

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    currentInterval,
    setCurrentInterval,
    labels: datesToShow.map((date) => formatLabelDate(date)),
    wordcountData,
    showKeyStrokes: false,
    keystrokesData,
    setFiltersToToday,
    setFiltersToThisWeek,
    setFiltersToThisMonth,
  };
};
