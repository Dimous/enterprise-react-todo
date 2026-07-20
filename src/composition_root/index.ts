import { EService } from "./EService";
import type IEventBus from "../shared/application/port/out/IEventBus";
import type ITaskRepository from "../feature/todo/domain/port/out/ITaskRepository";
import type ILocalDataSource from "../shared/application/port/out/ILocalDataSource";
import type ILoadTasksUseCase from "../feature/todo/application/port/in/ILoadTasksUseCase";
import type ICreateTaskUseCase from "../feature/todo/application/port/in/ICreateTaskUseCase";
import type IRemoveTaskUseCase from "../feature/todo/application/port/in/IRemoveTaskUseCase";
import type IToggleTaskUseCase from "../feature/todo/application/port/in/IToggleTaskUseCase";
import type IRenameTaskUseCase from "../feature/todo/application/port/in/IRenameTaskUseCase";
import InMemoryEventBus from "../shared/infrastructure/adapter/out/event_bus/InMemoryEventBus";
import DefaultLoadTasksUseCase from "../feature/todo/application/use_case/DefaultLoadTasksUseCase";
import DefaultCreateTaskUseCase from "../feature/todo/application/use_case/DefaultCreateTaskUseCase";
import DefaultRemoveTaskUseCase from "../feature/todo/application/use_case/DefaultRemoveTaskUseCase";
import DefaultToggleTaskUseCase from "../feature/todo/application/use_case/DefaultToggleTaskUseCase";
import DefaultRenameTaskUseCase from "../feature/todo/application/use_case/DefaultRenameTaskUseCase";
import DefaultTaskRepository from "../feature/todo/infrastructure/adapter/out/repository/DefaultTaskRepository";
import IndexedDBLocalDataSource from "../shared/infrastructure/adapter/out/data_source/IndexedDBLocalDataSource";

export default {
    // :::::::::::::::::: СЦЕНАРИИ ИСПОЛЬЗОВАНИЯ

    get [EService.ILoadTasksUseCase](): ILoadTasksUseCase {
        return Object.defineProperty(
            this,
            EService.ILoadTasksUseCase,
            {
                value: new DefaultLoadTasksUseCase(this[EService.ITaskRepository])
            }
        )
        [EService.ILoadTasksUseCase]
    },

    get [EService.ICreateTaskUseCase](): ICreateTaskUseCase {
        return Object.defineProperty(
            this,
            EService.ICreateTaskUseCase,
            {
                value: new DefaultCreateTaskUseCase(this[EService.ITaskRepository], this[EService.IEventBus])
            }
        )
        [EService.ICreateTaskUseCase]
    },

    get [EService.IRemoveTaskUseCase](): IRemoveTaskUseCase {
        return Object.defineProperty(
            this,
            EService.IRemoveTaskUseCase,
            {
                value: new DefaultRemoveTaskUseCase(this[EService.ITaskRepository], this[EService.IEventBus])
            }
        )
        [EService.IRemoveTaskUseCase]
    },

    get [EService.IToggleTaskUseCase](): IToggleTaskUseCase {
        return Object.defineProperty(
            this,
            EService.IToggleTaskUseCase,
            {
                value: new DefaultToggleTaskUseCase(this[EService.ITaskRepository], this[EService.IEventBus])
            }
        )
        [EService.IToggleTaskUseCase]
    },

    get [EService.IRenameTaskUseCase](): IRenameTaskUseCase {
        return Object.defineProperty(
            this,
            EService.IRenameTaskUseCase,
            {
                value: new DefaultRenameTaskUseCase(this[EService.ITaskRepository], this[EService.IEventBus])
            }
        )
        [EService.IRenameTaskUseCase]
    },

    // :::::::::::::::::: РЕПОЗИТОРИИ

    get [EService.ITaskRepository](): ITaskRepository {
        return Object.defineProperty(
            this,
            EService.ITaskRepository,
            {
                value: new DefaultTaskRepository(this[EService.ILocalDataSource])
            }
        )
        [EService.ITaskRepository]
    },

    // :::::::::::::::::: ИСТОЧНИКИ ДАННЫХ

    get [EService.ILocalDataSource](): ILocalDataSource {
        return Object.defineProperty(
            this,
            EService.ILocalDataSource,
            {
                value: new IndexedDBLocalDataSource("enterprise-react-todo", 1)
            }
        )
        [EService.ILocalDataSource]
    },

    // :::::::::::::::::: ПРИКЛАДНЫЕ СЕРВИСЫ

    get [EService.IEventBus](): IEventBus {
        return Object.defineProperty(
            this,
            EService.IEventBus,
            {
                value: new InMemoryEventBus()
            }
        )
        [EService.IEventBus]
    },
};