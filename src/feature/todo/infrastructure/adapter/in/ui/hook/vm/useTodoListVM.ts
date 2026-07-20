import type { TTaskDTO } from "../dto/TTaskDTO";
import type { TTodoListVM } from "./TTodoListVM";
import type { TTodoListState } from "./TTodoListState";
import { EService } from "../../../../../../../../composition_root/EService";
import TaskCreatedEvent from "../../../../../../domain/event/TaskCreatedEvent";
import TaskRemovedEvent from "../../../../../../domain/event/TaskRemovedEvent";
import TaskRenamedEvent from "../../../../../../domain/event/TaskRenamedEvent";
import TaskResumedEvent from "../../../../../../domain/event/TaskResumedEvent";
import TaskFinishedEvent from "../../../../../../domain/event/TaskFinishedEvent";
import { useCallback, useEffect, useMemo, useReducer, type SubmitEvent } from "react";
import { useService } from "../../../../../../../../shared/infrastructure/adapter/in/ui/provider/ServiceLocatorProvider";

export default (initial_state: TTodoListState = { tasks: {}, is_loading: false }): TTodoListVM => {
    const
        event_bus = useService(EService.IEventBus),
        load_tasks_use_case = useService(EService.ILoadTasksUseCase),
        create_task_use_case = useService(EService.ICreateTaskUseCase),
        [state, action] = useReducer(
            (state: TTodoListState, action: TAction): TTodoListState => {
                switch (action.type) {
                    case "SET_IS_LOADING":
                        return {
                            ...state,

                            is_loading: action.payload,
                        };

                    case "UPSERT_TASK":
                        return {
                            ...state,

                            tasks: {
                                ...state.tasks,
                                [action.payload.id]: action.payload,
                            },
                        };

                    case "PATCH_TASK": {
                        const
                            task = state.tasks[action.payload.id];
                        ///
                        ///
                        return task
                            ?
                            {
                                ...state,

                                tasks: {
                                    ...state.tasks,
                                    [action.payload.id]: {
                                        ...task,
                                        ...action.payload.patch,
                                    },
                                },
                            }
                            :
                            state;
                    }

                    case "SET_TASKS":
                        return {
                            ...state,

                            tasks: Object.fromEntries(
                                action.payload.map(
                                    task => [task.id, task]
                                )
                            ),
                        };

                    case "DELETE_TASK": {
                        const
                            { [action.payload.id]: _, ...tasks } = state.tasks;
                        ///
                        ///
                        return {
                            ...state,

                            tasks,
                        };
                    }

                    default:
                        return state;
                }
            },
            initial_state
        ),
        load = useCallback(
            async (): Promise<void> => {
                action({
                    type: "SET_IS_LOADING",
                    payload: true,
                });

                try {
                    const
                        tasks = await load_tasks_use_case.execute();
                    ///
                    ///
                    action({
                        type: "SET_TASKS",
                        payload: tasks.map(
                            task => ({
                                id: task.id.value,
                                title: task.title.value,
                                created_at: task.created_at,
                                is_finished: task.is_finished,
                            })
                        ),
                    });
                } catch (error: unknown) {
                    // TODO пусть в state будет поле для ошибки
                } finally {
                    action({
                        type: "SET_IS_LOADING",
                        payload: false,
                    });
                }
            },
            [
                action,
                load_tasks_use_case,
            ]
        ),
        submit = useCallback(
            async (event: SubmitEvent): Promise<void> => {
                const
                    form = event.currentTarget as HTMLFormElement;
                ///
                ///
                event.preventDefault();

                try {
                    const
                        task = new FormData(form).get("task");
                    ///
                    ///
                    if (task) {
                        await create_task_use_case.execute(task as string);

                        form.reset();
                    }
                } catch (error: unknown) {
                    // TODO пусть в state будет поле для ошибки
                } finally {

                }
            },
            [
                action,
                create_task_use_case,
            ]
        );
    ///
    ///
    // это проектор в state
    useEffect(
        () => {
            const
                unsubscribe_task_created = event_bus.subscribe(
                    TaskCreatedEvent.TYPE,
                    (event: TaskCreatedEvent): void => {
                        action({
                            type: "UPSERT_TASK",
                            payload: {
                                is_finished: false,
                                title: event.title,
                                id: event.aggregate_id,
                                created_at: event.created_at,
                            },
                        });
                    }
                ),
                unsubscribe_task_removed = event_bus.subscribe(
                    TaskRemovedEvent.TYPE,
                    (event: TaskRemovedEvent): void => {
                        action({
                            type: "DELETE_TASK",
                            payload: {
                                id: event.aggregate_id,
                            },
                        });
                    }
                ),
                unsubscribe_task_renamed = event_bus.subscribe(
                    TaskRenamedEvent.TYPE,
                    (event: TaskRenamedEvent): void => {
                        action({
                            type: "PATCH_TASK",
                            payload: {
                                id: event.aggregate_id,
                                patch: {
                                    title: event.title,
                                },
                            }
                        });
                    }
                ),
                unsubscribe_task_resumed = event_bus.subscribe(
                    TaskResumedEvent.TYPE,
                    (event: TaskResumedEvent): void => {
                        action({
                            type: "PATCH_TASK",
                            payload: {
                                id: event.aggregate_id,
                                patch: {
                                    is_finished: false,
                                },
                            }
                        });
                    }
                ),
                unsubscribe_task_finished = event_bus.subscribe(
                    TaskFinishedEvent.TYPE,
                    (event: TaskFinishedEvent): void => {
                        action({
                            type: "PATCH_TASK",
                            payload: {
                                id: event.aggregate_id,
                                patch: {
                                    is_finished: true,
                                }
                            }
                        });
                    }
                );
            ///
            ///
            return () => {
                unsubscribe_task_created();

                unsubscribe_task_removed();

                unsubscribe_task_renamed();

                unsubscribe_task_resumed();

                unsubscribe_task_finished();
            };
        },
        [
            action,
            event_bus,
        ]
    );

    return useMemo(
        (): TTodoListVM => ({
            state,
            action: {
                load,
                submit,
            }
        }),
        [
            load,
            state,
            submit,
        ]
    );
}

//---

type TAction =
    |
    {
        type: "SET_TASKS",
        payload: TTaskDTO[],
    }
    |
    {
        type: "UPSERT_TASK",
        payload: TTaskDTO,
    }
    |
    {
        type: "DELETE_TASK",
        payload: {
            id: string,
        },
    }
    |
    {
        type: "SET_IS_LOADING",
        payload: boolean,
    }
    |
    {
        type: "PATCH_TASK",
        payload: {
            id: string,
            patch: Partial<Omit<TTaskDTO, "id">>,
        },
    };