"use client";

import {
  forwardRef,
  useReducer,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";
import clsx from "clsx";
import { validateFileType } from "../utils/validateFileType";
import ImageUpload from "./image-upload";
import { v4 as uuidv4 } from "uuid";
import { PlusIcon } from "@heroicons/react/24/outline";
interface FileWithUrl {
  name: string;
  getUrl: string;
  size: number;
  error?: boolean | undefined;
  file: File;
}

// Reducer action(s)
const addFilesToInput = () => ({
  type: "ADD_FILES_TO_INPUT" as const,
  payload: [] as FileWithUrl[],
});

type Action = ReturnType<typeof addFilesToInput>;
type State = FileWithUrl[];

export interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "onChange"
  > {
  name?: string;
  id?: string;
  label?: string;
  dark?: string;
  containerClassname?: string;
  onChange?: (files: File[]) => void;
}

const FileInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      name,
      label,
      dark = true,
      containerClassname,
      onChange,
      ...props
    },
    ref
  ) => {
    const id = props?.id ?? uuidv4();
    const labelColor = dark ? "text-white" : "text-gray-900";

    const [dragActive, setDragActive] = useState<boolean>(false);
    const [input, dispatch] = useReducer((state: State, action: Action) => {
      switch (action.type) {
        case "ADD_FILES_TO_INPUT": {
          // do not allow more than 5 files to be uploaded at once
          if (state.length + action.payload.length > 10) {
            alert(
              JSON.stringify({
                title: "Too many files",
                description:
                  "You can only upload a maximum of 5 files at a time.",
              })
            );
            return state;
          }
          const newState = [...state, ...action.payload];
          onChange?.(newState.map(({ file }) => file));
          return newState;
        }

        // You could extend this, for example to allow removing files
      }
    }, []);

    const noInput = input.length === 0;

    // handle drag events
    const handleDrag = (e: DragEvent<HTMLFormElement | HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };

    // triggers when file is selected with click
    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const files = e.target.files;
      if (!files) return;
      try {
        if (files && files?.length > 0) {
          for (let f = 0; f < files.length; f++) {
            const file = files.item(f);
            if (!file) return;
            // at least one file has been selected

            // validate file type
            const valid = validateFileType(file);
            if (!valid) {
              alert(
                JSON.stringify({
                  title: "Invalid file type",
                  description: "Please upload a valid file type.",
                })
              );
              return;
            }

            const getUrl = URL.createObjectURL(file);

            const { name, size } = file;

            addFilesToState([{ name, getUrl, size, file }]);
          }
        }
      } catch (error) {
        // already handled
      }
    };

    const addFilesToState = (files: FileWithUrl[]) => {
      dispatch({ type: "ADD_FILES_TO_INPUT", payload: files });
    };

    // triggers when file is dropped
    const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      // validate file type
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const files = Array.from(e.dataTransfer.files);
        const validFiles = files.filter((file) => validateFileType(file));

        if (files.length !== validFiles.length) {
          alert(
            JSON.stringify({
              title: "Invalid file type",
              description: "Only image files are allowed.",
            })
          );
        }

        try {
          const filesWithUrl = await Promise.all(
            validFiles.map(async (file) => {
              const { name, size } = file;
              const getUrl = URL.createObjectURL(file);
              return { name, size, getUrl, file };
            })
          );

          setDragActive(false);

          // at least one file has been selected
          addFilesToState(filesWithUrl);

          e.dataTransfer.clearData();
        } catch (error) {
          // already handled
        }
      }
    };

    return (
      <div className={clsx(containerClassname)}>
        {label ? (
          <label
            className={clsx("block text-sm font-medium leading-6", labelColor)}
          >
            {label}
          </label>
        ) : null}
        <div className="relative mt-2 rounded-md shadow-sm">
          <div
            onDragEnter={handleDrag}
            className="flex h-full items-center w-full justify-start"
          >
            <label
              htmlFor={`${id}-dropzone`}
              className={clsx(
                "group relative h-full flex flex-col items-center justify-center w-full aspect-video border-2 border-slate-300 border-dashed rounded-lg dark:border-gray-600 transition",
                { "dark:border-slate-400 dark:bg-slate-800": dragActive },
                { "h-fit aspect-auto": !noInput },
                { "items-start justify-start": !noInput },
                {
                  "dark:hover:border-gray-500 dark:hover:bg-slate-800": noInput,
                }
              )}
            >
              <div
                className={clsx(
                  "relative w-full h-full flex flex-col items-center justify-center",
                  { "items-start": !noInput }
                )}
              >
                {noInput ? (
                  <>
                    <div
                      className="absolute inset-0 cursor-pointer"
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    />

                    <div className="flex flex-col justify-center items-center py-2">
                      <svg
                        aria-hidden="true"
                        className="w-10 h-10 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        up to 5 images,{" "}
                        {(process.env.MAX_FILE_SIZE / 1000000).toFixed(0)}MB per
                        file
                      </p>
                    </div>

                    <input
                      {...props}
                      ref={ref}
                      multiple
                      onChange={handleChange}
                      accept="image/jpeg, image/jpg, image/png"
                      type="file"
                      className="hidden"
                      // name={name}
                      id={`${id}-dropzone`}
                    />
                  </>
                ) : (
                  <div className="flex flex-col w-full h-full">
                    <div className="overflow-x-auto">
                      <div className="align-middle inline-block min-w-full">
                        <div className="shadow overflow-hidden sm:rounded-lg">
                          <div className="relative divide-y dark:divide-slate-600">
                            {input.map((file, index) => (
                              <ImageUpload
                                key={index}
                                error={file.error}
                                getUrl={file.getUrl}
                                name={file.name}
                                size={file.size}
                              />
                            ))}
                          </div>

                          <label
                            htmlFor={`${id}-input`}
                            className="relative cursor-pointer group hover:border-gray-500 hover:dark:bg-slate-800 transition flex justify-center py-4 border-t border-slate-600"
                          >
                            <PlusIcon className="group-hover:fill-slate-400 transition stroke-1 w-8 h-8 fill-slate-500" />
                            <input
                              {...props}
                              ref={ref}
                              multiple
                              onChange={handleChange}
                              accept="image/jpeg, image/jpg, image/png"
                              type="file"
                              className="relative z-20 hidden"
                              name={name}
                              id={`${id}-input`}
                            />
                            <div
                              className="absolute inset-0"
                              onDragEnter={handleDrag}
                              onDragLeave={handleDrag}
                              onDragOver={handleDrag}
                              onDrop={handleDrop}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </label>
          </div>
        </div>
      </div>
    );
  }
);
FileInput.displayName = "FileInput";

export { FileInput };
