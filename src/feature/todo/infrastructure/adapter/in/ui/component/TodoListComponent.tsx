import { useEffect, type JSX } from "react";
import TaskComponent from "./TaskComponent";
import useTodoListVM from "../hook/vm/useTodoListVM";

export default (): JSX.Element => {
    const
        vm = useTodoListVM();
    ///
    ///
    useEffect(
        (): void => {
            vm.action.load();
        },
        [
            vm.action.load,
        ]
    );

    return (
        vm.state.is_loading
            ?
            <div
                className="flex items-center justify-center py-10"
            >
                <span
                    className="text-gray-500 animate-pulse"
                >Загрузка...</span>
            </div>
            :
            < >
                <form
                    onSubmit={
                        vm.action.submit
                    }
                    className="flex gap-2 mb-2"
                >
                    <input
                        type="text"
                        name="task"
                        className="flex flex-1 border px-2 py-1 rounded"
                    />

                    <button
                        type="submit"
                        className="text-xs px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200"
                    >Добавить</button>
                </form>

                <form >
                    <ul
                        className="flex flex-col gap-2"
                    >
                        {
                            Object
                                .values(vm.state.tasks)
                                .sort(
                                    (task_1, task_2) => task_2.created_at.getTime() - task_1.created_at.getTime()
                                )
                                .map(
                                    task => (
                                        <TaskComponent
                                            task={
                                                task
                                            }
                                            key={
                                                task.id
                                            }
                                        />
                                    )
                                )
                        }
                    </ul>
                </form>
            </>
    );
}