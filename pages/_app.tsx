import {AppProps} from "next/app";
import {useRouter} from "next/router";
import Script from "next/script";
import React, {useEffect} from "react";
import * as gtag from "../lib/gtag";
import {ChakraProvider, Flex} from "@chakra-ui/react";

const MyApp = ({Component, pageProps}: AppProps) => {
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            gtag.pageview(url);
        };
        router.events.on("routeChangeComplete", handleRouteChange);
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router.events]);

    return (
        <ChakraProvider>
            <Flex flexDir="column" overflowX="hidden" pt={16} px={2}>
                <Script
                    strategy="afterInteractive"
                    src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
                />
                <Script
                    id="gtag-init"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
                    }}
                />
                <Component {...pageProps} />
            </Flex>
        </ChakraProvider>
    );
};

export default MyApp;
