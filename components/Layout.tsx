import Head from "next/head";
import * as React from "react";
import ToolBar from "./ToolBar";
import Search from "./Search";

type Props = {
    title?: string;
    children?: React.ReactElement
};

const Layout: React.FunctionComponent<Props> = ({
                                                    children,
                                                    title = "Awesome Tools",
                                                }) => (
    <>
        <Head>
            <title>{title}</title>
        </Head>
        <ToolBar/>
        <Search/>
        {children}
    </>
);

export default Layout;
