/**
 * семантическая ошибка?
 * имеет ли смысл в предметной области?
 */
export default class TaskAlreadyRemovedError extends Error {
    override name = "TaskAlreadyRemovedError";

    constructor(public readonly id: string) {
        super(`Задача ${id} уже удалена`);
    }
}