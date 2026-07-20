import composition_root from "../../../../../../composition_root";
import type { EService } from "../../../../../../composition_root/EService";
import { createContext, useContext, type PropsWithChildren, type ReactNode } from "react";

type TCompositionRoot = typeof composition_root;

const
    context = createContext<TCompositionRoot>(composition_root);
///
///
export default ({ children }: PropsWithChildren): ReactNode => (
    <context.Provider
        value={
            composition_root
        }
    >
        {
            children
        }
    </context.Provider>
);

//---

/**
 * @xxx да, в скрижалях сервис-локатор -- скверна и может быть лучше через контекст передавать собранные зависимости, но в текущей реализации сборка ленивая, прок есть
 */
export const useService = <ID extends EService>(id: ID): TCompositionRoot[ID] => {
    const
        composition_root = useContext(context);
    ///
    ///
    if (!composition_root.hasOwnProperty(id)) {
        throw new Error(`Service "${id}" not found`);
    }

    return composition_root[id];
};