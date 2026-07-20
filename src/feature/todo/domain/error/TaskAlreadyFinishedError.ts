/**
 * семантическая ошибка?
 * имеет ли смысл в предметной области?
 */
export default class TaskAlreadyFinishedError extends Error {
    override name = "TaskAlreadyFinishedError";

    constructor(public readonly id: string) {
        super(`Task ${id} already finished`);
    }
}