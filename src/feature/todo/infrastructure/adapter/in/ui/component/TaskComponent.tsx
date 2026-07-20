import { memo, type JSX } from "react";
import { isEqual } from "@ver0/deep-equal";
import useTaskVM from "../hook/vm/useTaskVM";
import type { TTaskDTO } from "../hook/dto/TTaskDTO";

export default memo(
    ({ task }: TTaskComponentProps): JSX.Element => {
        const
            vm = useTaskVM({ task, is_renaming: false });
        ///
        ///
        return (
            <li
                className="flex items-center justify-between p-4 bg-white shadow-sm hover:shadow-md transition"
            >
                <div
                    className="flex items-center gap-3"
                >
                    <input
                        type="checkbox"
                        defaultChecked={
                            task.is_finished
                        }
                        onChange={
                            vm.action.toggle
                        }
                    />

                    {
                        vm.state.is_renaming
                            ?
                            (
                                <input
                                    autoFocus
                                    type="text"
                                    defaultValue={
                                        task.title
                                    }
                                    onBlur={
                                        vm.action.blur
                                    }
                                    className="flex flex-1 border px-2 py-1 rounded"
                                />
                            )
                            :
                            (
                                <span
                                    className={
                                        `text-sm ${task.is_finished ? "line-through decoration-black text-gray-400" : "text-gray-800"}`
                                    }
                                >
                                    {
                                        task.title
                                    }
                                </span>
                            )
                    }
                </div>

                <div
                    className="flex gap-2"
                >
                    <button
                        onClick={
                            vm.action.rename
                        }
                        disabled={
                            vm.state.is_renaming
                        }
                        className="text-xs px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >Править</button>

                    <button
                        onClick={
                            vm.action.remove
                        }
                        className="text-xs px-3 py-1 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                    >Удалить</button>
                </div>
            </li>
        );
    },
    isEqual
);

//---

type TTaskComponentProps = {
    task: TTaskDTO,
}