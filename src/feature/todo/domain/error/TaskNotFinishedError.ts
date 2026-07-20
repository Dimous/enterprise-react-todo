/**
 * семантическая ошибка?
 * имеет ли смысл в предметной области?
 */
export default class TaskNotFinishedError extends Error {
    override name = "TaskNotFinishedError";

    constructor(public readonly id: string) {
        super(`Task ${id} is not finished`);
    }
}