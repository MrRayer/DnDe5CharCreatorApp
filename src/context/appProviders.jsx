import { GlobalsProvider } from "./globalsContext";
import { InventoryProvider } from "./inventoryContext";
import { StatsProvider } from "./statsContext";

export default function AppProviders({children}){
    return(
        <GlobalsProvider>
            <StatsProvider>
                <InventoryProvider>
                    {children}
                </InventoryProvider>
            </StatsProvider>
        </GlobalsProvider>
    )
}