"use client";
import React, { ReactNode, useState } from "react";
import { Image } from "../lib/definitions";
import clsx from "clsx";

export function Carousel({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState(0);

  // const handleChangeIndex = (index: number) => {
  //   setIndex(index);
  // };

  // const handleForwardIndex = () => {
  //   setIndex((prev) => {
  //     if (prev + 1 > medias.length - 1) return 0;
  //     return prev + 1;
  //   });
  // };

  // const handleBackIndex = () => {
  //   setIndex((prev) => {
  //     if (prev - 1 < 0) return medias.length - 1;
  //     return prev - 1;
  //   });
  // };

  const handleChangeIndex = (index: number) => {
    setIndex(index);
  };

  const handleForwardIndex = () => {
    setIndex((prev) => {
      if (prev + 1 > React.Children.count(children) - 1) return 0;
      return prev + 1;
    });
  };

  const handleBackIndex = () => {
    setIndex((prev) => {
      if (prev - 1 < 0) return React.Children.count(children) - 1;
      return prev - 1;
    });
  };
  return (
    <>
      <div className="relative grid grid-rows-[min-content_1fr] gap-4">
        <div className="flex justify-between items-center">
          <button
            className="z-[1] flex w-fit items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
            type="button"
            onClick={handleBackIndex}
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
              <span className="sr-only">Previus</span>
            </span>
          </button>
          <div className="z-[2] mx-[15%] mb-4 flex list-none justify-center p-0">
            {React.Children.map(children, (child, i) => (
              <button
                key={i}
                type="button"
                className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white/50 hover:bg-gray-800/60 bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
                aria-current="true"
                aria-label={`Slide ${i + 1}`}
                onClick={() => handleChangeIndex(i)}
              ></button>
            ))}
          </div>
          <button
            className="z-[1] flex w-fit items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
            type="button"
            onClick={handleForwardIndex}
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
        <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
          {React.Children.map(children, (child, i) => (
            <div
              key={i}
              className={clsx(
                "relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none",
                index !== i && "hidden"
              )}
              style={{ backfaceVisibility: "hidden" }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
