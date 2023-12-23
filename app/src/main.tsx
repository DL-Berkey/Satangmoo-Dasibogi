import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
    QueryCache,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { RecoilRoot } from "recoil";

// devtools
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import GlobalStyle from "./styles/GlobalStyle";

const client = new QueryClient({
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
                <GlobalStyle />
                <App />
            </RecoilRoot>
            <ReactQueryDevtools
                initialIsOpen={false}
                buttonPosition="top-right"
            />
        </QueryClientProvider>
    </React.StrictMode>
);
