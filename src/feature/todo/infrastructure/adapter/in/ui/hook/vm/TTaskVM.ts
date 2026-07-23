import type { TTaskState } from "./TTaskState";
import type { FocusEvent, MouseEvent } from "react";

export type TTaskVM = {
    state: TTaskState,
    action: {
        toggle: () => void,
        rename: (event: MouseEvent) => void,
        remove: (event: MouseEvent) => void,
        blur: (event: FocusEvent<HTMLInputElement>) => void,
    },
}