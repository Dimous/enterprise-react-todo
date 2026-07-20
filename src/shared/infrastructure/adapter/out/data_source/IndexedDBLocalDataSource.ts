import type { TIdentifiableDTO } from "./TIdentifiableDTO";
import type ILocalDataSource from "../../../../application/port/out/ILocalDataSource";

export default class IndexedDBLocalDataSource implements ILocalDataSource {
    constructor(d_b_name: string, d_b_version: number) {
        this.#d_b_name = d_b_name;
        this.#d_b_version = d_b_version;
    }

    //---

    async get(id: string): Promise<TIdentifiableDTO | undefined> {
        return this.#withTransaction("readonly", object_store => object_store.get(id));
    }

    //---

    async put(dto: TIdentifiableDTO): Promise<void> {
        await this.#withTransaction("readwrite", object_store => object_store.put(dto));
    }

    //---

    async getAll(): Promise<TIdentifiableDTO[]> {
        return this.#withTransaction("readonly", object_store => object_store.getAll());
    }

    //---

    async clear(): Promise<void> {
        return this.#withTransaction("readwrite", object_store => object_store.clear());
    }

    //---

    async delete(id: string): Promise<void> {
        return this.#withTransaction("readwrite", object_store => object_store.delete(id));
    }

    //---

    async #open(): Promise<IDBDatabase> {
        if (!IndexedDBLocalDataSource.#open_databases.has(this.#d_b_name)) {
            IndexedDBLocalDataSource.#open_databases.set(
                this.#d_b_name,
                new Promise(
                    (resolve: (value: IDBDatabase | PromiseLike<IDBDatabase>) => void, reject: (reason?: any) => void): void => {
                        const
                            open_d_b_request = window.indexedDB.open(this.#d_b_name, this.#d_b_version);
                        ///
                        ///
                        open_d_b_request.onsuccess = (): void => {
                            const
                                database = open_d_b_request.result;
                            ///
                            ///
                            database.onversionchange = (): void => database.close();

                            resolve(database);
                        }

                        open_d_b_request.onerror = (): void => reject(open_d_b_request.error);

                        open_d_b_request.onupgradeneeded = (): void => {
                            const
                                database = open_d_b_request.result;
                            ///
                            ///
                            if (!database.objectStoreNames.contains(this.#object_store_name)) {
                                try {
                                    database.createObjectStore(this.#object_store_name, { keyPath: "id" });
                                } catch (error: unknown) {
                                    open_d_b_request.transaction?.abort();

                                    reject(error);
                                }
                            }
                        };
                    }
                )
            );
        }

        return IndexedDBLocalDataSource.#open_databases.get(this.#d_b_name)!;
    }

    //---

    async #withTransaction<T>(transaction_mode: IDBTransactionMode, handler: (object_store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
        const
            database = await this.#open();
        ///
        ///
        return new Promise<T>(
            (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void): void => {
                const
                    transaction = database.transaction(this.#object_store_name, transaction_mode);
                ///
                ///
                transaction.onerror = (): void => reject(transaction.error);

                transaction.onabort = (): void => reject(transaction.error);

                try {
                    const
                        request = handler(transaction.objectStore(this.#object_store_name));
                    ///
                    ///
                    request.onerror = (): void => reject(request.error);

                    request.onsuccess = (): void => {
                        const
                            value = request.result;
                        ///
                        ///
                        transaction.oncomplete = (): void => resolve(value);
                    };
                } catch (error) {
                    transaction.abort();

                    reject(error);
                }
            }
        );
    }

    //---

    readonly #d_b_name: string;

    readonly #d_b_version: number;

    readonly #object_store_name: string = "190aa926-12d5-4efd-8aa8-dd7c82beaf17";

    static readonly #open_databases: Map<string, Promise<IDBDatabase>> = new Map();
}