/**
 * семантическая ошибка?
 * имеет ли смысл в предметной области?
 */
export default class TaskTitleUnchangedError extends Error {
    override name = "TaskTitleUnchangedError";

    constructor(public readonly id: string) {
        super(`Task ${id} title is unchanged`);
    }
}