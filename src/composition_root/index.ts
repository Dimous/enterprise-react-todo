import { EService } from "./EService";
import type IEventBus from "../shared/application/port/out/IEventBus";
import type ITaskRepository from "../feature/todo/domain/port/out/ITaskRepository";
import type ILocalDataSource from "../shared/application/port/out/ILocalDataSource";
import type ILoadTasksUseCase from "../feature/todo/application/port/in/ILoadTasksUseCase";
import type ICreateTaskUseCase from "../feature/todo/application/port/in/ICreateTaskUseCase";
import type IRemoveTaskUseCase from "../feature/todo/application/port/in/IRemoveTaskUseCase";
import type IToggleTaskUseCase from "../feature/todo/application/port/in/IToggleTaskUseCase";
import type IRenameTaskUseCase from "../feature/todo/application/port/in/IRenameTaskUseCase";

export default {
    // :::::::::::::::::: СЦЕНАРИИ ИСПОЛЬЗОВАНИЯ

    get [EService.ILoadTasksUseCase](): Promise<ILoadTasksUseCase> {
        return Object.defineProperty(
            this,
            EService.ILoadTasksUseCase,
            {
                value: (
                    async () => {
                        const
                            { default: DefaultLoadTasksUseCase } = await import("../feature/todo/application/use_case/DefaultLoadTasksUseCase");
                        ///
                        ///
                        return new DefaultLoadTasksUseCase(await this[EService.ITaskRepository]);
                    }
                )()
            }
        )
        [EService.ILoadTasksUseCase]
    },

    get [EService.ICreateTaskUseCase](): Promise<ICreateTaskUseCase> {
        return Object.defineProperty(
            this,
            EService.ICreateTaskUseCase,
            {
                value: (
                    async () => {
                        const
                            { default: DefaultCreateTaskUseCase } = await import("../feature/todo/application/use_case/DefaultCreateTaskUseCase");
                        ///
                        ///
                        return new DefaultCreateTaskUseCase(await this[EService.ITaskRepository], await this[EService.IEventBus]);
                    }
                )()
            }
        )
        [EService.ICreateTaskUseCase]
    },

    get [EService.IRemoveTaskUseCase](): Promise<IRemoveTaskUseCase> {
        return Object.defineProperty(
            this,
            EService.IRemoveTaskUseCase,
            {
                value: (
                    async () => {
                        const
                            { default: DefaultRemoveTaskUseCase } = await import("../feature/todo/application/use_case/DefaultRemoveTaskUseCase");
                        ///
                        ///
                        return new DefaultRemoveTaskUseCase(await this[EService.ITaskRepository], await this[EService.IEventBus]);
                    }
                )()
            }
        )
        [EService.IRemoveTaskUseCase]
    },

    get [EService.IToggleTaskUseCase](): Promise<IToggleTaskUseCase> {
        return Object.defineProperty(
            this,
            EService.IToggleTaskUseCase,
            {
                value: (
                    async () => {
                        const
                            { default: DefaultToggleTaskUseCase } = await import("../feature/todo/application/use_case/DefaultToggleTaskUseCase");
                        ///
                        ///
                        return new DefaultToggleTaskUseCase(await this[EService.ITaskRepository], await this[EService.IEventBus]);
                    }
                )()
            }
        )
        [EService.IToggleTaskUseCase]
    },

    get [EService.IRenameTaskUseCase](): Promise<IRenameTaskUseCase> {
        return Object.defineProperty(
            this,
            EService.IRenameTaskUseCase,
            {
                value: (
                    async () => {
                        const
                            { default: DefaultRenameTaskUseCase } = await import("../feature/todo/application/use_case/DefaultRenameTaskUseCase");
                        ///
                        ///
                        return new DefaultRenameTaskUseCase(await this[EService.ITaskRepository], await this[EService.IEventBus]);
                    }
                )()
            }
        )
        [EService.IRenameTaskUseCase]
    },

    // :::::::::::::::::: РЕПОЗИТОРИИ

    get [EService.ITaskRepository](): Promise<ITaskRepository> {
        return Object.defineProperty(
            this,
            EService.ITaskRepository,
            {
                value: (
                    async () => {
                        const
                            { default: DefaultTaskRepository } = await import("../feature/todo/infrastructure/adapter/out/repository/DefaultTaskRepository");
                        ///
                        ///
                        return new DefaultTaskRepository(await this[EService.ILocalDataSource]);
                    }
                )()
            }
        )
        [EService.ITaskRepository]
    },

    // :::::::::::::::::: ИСТОЧНИКИ ДАННЫХ

    get [EService.ILocalDataSource](): Promise<ILocalDataSource> {
        return Object.defineProperty(
            this,
            EService.ILocalDataSource,
            {
                value: (
                    async () => {
                        const
                            { default: IndexedDBLocalDataSource } = await import("../shared/infrastructure/adapter/out/data_source/IndexedDBLocalDataSource");
                        ///
                        ///
                        return new IndexedDBLocalDataSource("enterprise-react-todo", 1);
                    }
                )()
            }
        )
        [EService.ILocalDataSource]
    },

    // :::::::::::::::::: ПРИКЛАДНЫЕ СЕРВИСЫ

    get [EService.IEventBus](): Promise<IEventBus> {
        return Object.defineProperty(
            this,
            EService.IEventBus,
            {
                value: (
                    async () => {
                        const
                            { default: InMemoryEventBus } = await import("../shared/infrastructure/adapter/out/event_bus/InMemoryEventBus");
                        ///
                        ///
                        return new InMemoryEventBus();
                    }
                )()
            }
        )
        [EService.IEventBus]
    },
};