import { StatsProvider } from "./statsContext";

export default function AppProviders({children}){
    return(
        <StatsProvider>
            {children}
        </StatsProvider>
    )
}