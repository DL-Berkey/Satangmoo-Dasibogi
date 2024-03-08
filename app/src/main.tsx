import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
    QueryCache,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "./styles/GlobalStyle";
import { theme } from "./styles/theme.ts";

// devtools
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const client = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: 1000 * 10 * 6 * 10,
            staleTime: 1000 * 10 * 6 * 10 * 3,
        },
        mutations: {
            gcTime: 1000 * 10 * 6 * 10,
        },
    },
    queryCache: new QueryCache({
        onError: (error) => {
            console.error(error);
        },
    }),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={client}>
            <RecoilRoot>
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    <App />
                </ThemeProvider>
            </RecoilRoot>
            <ReactQueryDevtools
                initialIsOpen={false}
                buttonPosition="top-right"
            />
        </QueryClientProvider>
    </React.StrictMode>
);
