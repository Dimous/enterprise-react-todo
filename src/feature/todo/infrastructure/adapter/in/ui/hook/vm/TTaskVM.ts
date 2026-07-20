import type { FocusEvent } from "react";
import type { TTaskState } from "./TTaskState";

export type TTaskVM = {
    state: TTaskState,
    action: {
        toggle: () => void,
        rename: () => void,
        remove: () => void,
        blur: (event: FocusEvent<HTMLInputElement>) => void,
    },
}