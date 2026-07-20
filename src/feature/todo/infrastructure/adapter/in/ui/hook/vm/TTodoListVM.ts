import type { SubmitEvent } from "react";
import type { TTodoListState } from "./TTodoListState";

export type TTodoListVM = {
    state: TTodoListState,
    action: {
        load: () => void,
        submit: (event: SubmitEvent) => void,
    },
}