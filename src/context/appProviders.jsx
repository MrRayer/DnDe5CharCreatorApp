import { GlobalsProvider } from "./globalsContext";
import { StatsProvider } from "./statsContext";

export default function AppProviders({children}){
    return(
        <GlobalsProvider>
            <StatsProvider>
                {children}
            </StatsProvider>
        </GlobalsProvider>
    )
}