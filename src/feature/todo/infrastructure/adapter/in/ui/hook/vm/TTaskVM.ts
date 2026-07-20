import type { FocusEvent } from "react";
import type { TTaskState } from "./TTaskState";

export type TTaskVM = {
    state: TTaskState,
    action: {
        blur: (event: FocusEvent<HTMLInputElement>) => void,
        toggle: () => void,
        rename: () => void,
        remove: () => void,
    },
}