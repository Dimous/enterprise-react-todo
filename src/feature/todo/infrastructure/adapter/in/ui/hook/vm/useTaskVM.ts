import type { TTaskVM } from "./TTaskVM";
import type { TTaskState } from "./TTaskState";
import { useCallback, useMemo, useReducer, type FocusEvent } from "react";
import { EService } from "../../../../../../../../composition_root/EService";
import { useService } from "../../../../../../../../shared/infrastructure/adapter/in/ui/provider/ServiceLocatorProvider";

export default (initial_state: TTaskState): TTaskVM => {
    const
        rename_task_use_case = useService(EService.IRenameTaskUseCase),
        remove_task_use_case = useService(EService.IRemoveTaskUseCase),
        toggle_task_use_case = useService(EService.IToggleTaskUseCase),
        [state, action] = useReducer(
            (state: TTaskState, action: TAction): TTaskState => {
                switch (action.type) {
                    case "SET_IS_RENAMING":
                        return {
                            ...state,

                            is_renaming: action.payload,
                        };

                    default:
                        return state;
                }
            },
            initial_state
        ),
        blur = useCallback(
            async (event: FocusEvent<HTMLInputElement>): Promise<void> => {
                try {
                    await rename_task_use_case.execute(state.task.id, event.currentTarget.value);
                } catch (error: unknown) {
                    console.error(error);
                } finally {
                    action({
                        type: "SET_IS_RENAMING",
                        payload: false,
                    });
                }
            },
            [
                state,
                action,
                rename_task_use_case,
            ]
        ),
        rename = useCallback(
            (): void => {
                action({
                    type: "SET_IS_RENAMING",
                    payload: true,
                });
            },
            [
                action,
            ]
        ),
        remove = useCallback(
            async (): Promise<void> => {
                if (confirm(`Действительно удалить "${state.task.title}"?`)) {
                    try {
                        await remove_task_use_case.execute(state.task.id);
                    } catch (error: unknown) {

                    } finally {

                    }
                }
            },
            [
                state,
                action,
                remove_task_use_case,
            ]
        ),
        toggle = useCallback(
            async (): Promise<void> => {
                try {
                    await toggle_task_use_case.execute(state.task.id);
                } catch (error: unknown) {

                } finally {
                    action({
                        type: "SET_IS_RENAMING",
                        payload: false,
                    });
                }
            },
            [
                state,
                action,
                toggle_task_use_case,
            ]
        );
    ///
    ///
    return useMemo(
        (): TTaskVM => ({
            state,
            action: {
                blur,
                rename,
                remove,
                toggle,
            }
        }),
        [
            blur,
            rename,
            remove,
            toggle,
        ]
    );
}
//---

type TAction =
    | {
        type: "SET_IS_RENAMING",
        payload: boolean,
    };