"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useEffect, useState } from "react";

type Day = {
  date: string;
  isCurrentMonth?: boolean;
  isToday?: boolean;
};

type DayRange = {
  start: Day | null;
  end: Day | null;
};

export function Calendar() {
  const [days, setDays] = useState<Day[]>([]);
  const [selectedRange, setSelectedRange] = useState<DayRange>({
    start: null,
    end: null,
  });

  useEffect(() => {
    const generateDays = () => {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // Mês começa do zero
      const firstDayOfMonth = new Date(year, month - 1, 1);
      const lastDayOfMonth = new Date(year, month, 0);
      const numberOfDays = lastDayOfMonth.getDate();

      const newDays = [];

      // Adiciona 5 dias do mês anterior
      for (let i = 5; i >= 1; i--) {
        const date = new Date(
          year,
          month - 2,
          lastDayOfMonth.getDate() - i + 1
        );
        newDays.push({
          date: `${year}-${(month - 1).toString().padStart(2, "0")}-${date
            .getDate()
            .toString()
            .padStart(2, "0")}`,
          isCurrentMonth: false,
        });
      }

      // Adiciona os dias do mês atual
      for (let i = 1; i <= numberOfDays; i++) {
        const date = new Date(year, month - 1, i);
        const isToday = date.toDateString() === currentDate.toDateString();
        newDays.push({
          date: `${year}-${month.toString().padStart(2, "0")}-${i
            .toString()
            .padStart(2, "0")}`,
          isCurrentMonth: true,
          isToday,
        });
      }

      // Adiciona 6 dias do próximo mês
      for (let i = 1; i <= 6; i++) {
        const date = new Date(year, month, i);
        newDays.push({
          date: `${year}-${(month + 1).toString().padStart(2, "0")}-${i
            .toString()
            .padStart(2, "0")}`,
          isCurrentMonth: false,
        });
      }

      setDays(newDays);
    };
    generateDays();
  }, []);

  const handleDaySelection = (day: Day) => {
    setSelectedRange((prev) => {
      // Se ainda não há um início ou se a data selecionada é anterior à existente
      if (!prev.start || new Date(day.date) < new Date(prev.start.date)) {
        return { ...prev, start: day };
      }

      // Se já há um início, mas a data selecionada é após a existente
      if (!prev.end || new Date(day.date) > new Date(prev.end.date)) {
        return { ...prev, end: day };
      }

      // Se o usuário clicar duas vezes na mesma data inicial, defina tanto o início quanto o fim como a data clicada
      if (
        new Date(day.date).getTime() === new Date(prev.start.date).getTime()
      ) {
        return { ...prev, start: day, end: day };
      }

      // Se o usuário clicar duas vezes na mesma data final, defina tanto o início quanto o fim como a data clicada
      if (new Date(day.date).getTime() === new Date(prev.end.date).getTime()) {
        return { ...prev, start: day, end: day };
      }

      const distanceToStart = Math.abs(
        new Date(day.date).getTime() - new Date(prev.start.date).getTime()
      );
      const distanceToEnd = Math.abs(
        new Date(day.date).getTime() - new Date(prev.end.date).getTime()
      );

      // Se a data clicada estiver mais próxima do fim, ajuste o fim; caso contrário, ajuste o início
      if (distanceToStart <= distanceToEnd) {
        return { ...prev, start: day };
      } else {
        return { ...prev, end: day };
      }
    });
  };

  const isSelected = (day: Day) => {
    if (selectedRange.start && selectedRange.end) {
      const start = new Date(selectedRange.start.date);
      const end = new Date(selectedRange.end.date);
      const dayDate = new Date(day.date);

      if (
        dayDate.getTime() === start.getTime() ||
        dayDate.getTime() === end.getTime()
      ) {
        return true;
      }
    }

    if (selectedRange.start && !selectedRange.end) {
      const start = new Date(selectedRange.start.date);
      const dayDate = new Date(day.date);

      if (dayDate.getTime() === start.getTime()) {
        return true;
      }
    }

    if (selectedRange.end && !selectedRange.start) {
      const end = new Date(selectedRange.end.date);
      const dayDate = new Date(day.date);

      if (dayDate.getTime() === end.getTime()) {
        return true;
      }
    }
    return false;
  };

  const isDayInRange = (day: Day) => {
    if (selectedRange.start && selectedRange.end) {
      const start = new Date(selectedRange.start.date);
      const end = new Date(selectedRange.end.date);
      const dayDate = new Date(day.date);

      return start <= dayDate && dayDate <= end;
    }

    return false;
  };

  return (
    <div className="mt-4 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 xl:col-start-9">
      <div className="flex items-center text-white">
        <button
          type="button"
          className="flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="flex-auto text-sm font-semibold">January</div>
        <button
          type="button"
          className="flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Next month</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
        <div>S</div>
      </div>
      <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
        {days.map((day, dayIdx) => (
          <button
            onClick={() => handleDaySelection(day)}
            key={day.date}
            type="button"
            className={clsx(
              "py-1.5 hover:bg-gray-100 focus:z-10",
              day.isCurrentMonth ? "bg-white" : "bg-gray-50",
              (isSelected(day) || day.isToday) && "font-semibold",
              isSelected(day) && "text-white",
              !isSelected(day) &&
                day.isCurrentMonth &&
                !day.isToday &&
                "text-gray-900",
              !isSelected(day) &&
                !day.isCurrentMonth &&
                !day.isToday &&
                "text-gray-400",
              day.isToday && !isSelected(day) && "text-indigo-600",
              dayIdx === 0 && "rounded-tl-lg",
              dayIdx === 6 && "rounded-tr-lg",
              dayIdx === days.length - 7 && "rounded-bl-lg",
              dayIdx === days.length - 1 && "rounded-br-lg",
              isDayInRange(day) && "bg-indigo-200"
            )}
          >
            <time
              dateTime={day.date}
              className={clsx(
                "mx-auto flex h-7 w-7 items-center justify-center rounded-full",
                isSelected(day) && day.isToday && "bg-indigo-600",
                isSelected(day) && !day.isToday && "bg-gray-900"
              )}
            >
              {day.date.split("-").pop()?.replace(/^0/, "")}
            </time>
          </button>
        ))}
      </div>
    </div>
  );
}
