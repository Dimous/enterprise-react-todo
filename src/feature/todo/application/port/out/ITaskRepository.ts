import type TaskIdVO from "../../../domain/aggregate/task/vo/TaskIdVO";
import type TaskAggregateRoot from "../../../domain/aggregate/task/TaskAggregateRoot";

/**
 * репозиторий предметной области содержит её семантику, выражает бизнес-язык (методы получения агрегатов в определённом состоянии, например)
 * но в данном случае это обобщённый порт персистентности -- ни одного метода бизнес-операций, он бедный
 *
 * @todo богатые ddd-репозитории держать в domain/port/out, бедные порты инфраструктуры в application/port/out
 */
export default interface ITaskRepository {
    // ADO

    remove(id: TaskIdVO): Promise<void>,

    list(): Promise<TaskAggregateRoot[]>,

    // ES

    save(entity: TaskAggregateRoot): Promise<void>, // апсёрт

    load(id: TaskIdVO): Promise<TaskAggregateRoot | undefined>,
}