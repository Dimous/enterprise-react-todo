import Event from "../domain/Event";

export type THandler<T extends Event = Event> = (event: T) => void;