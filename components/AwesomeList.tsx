import React, {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import AwesomeCard from "./AwesomeCard";
import {useRouter} from "next/router"
import {Box, SimpleGrid, Text, useBreakpointValue} from "@chakra-ui/react";
import axios from "axios";

const AwesomeList: React.FC<any> = ({
                                        data = [],
                                        repo,
                                        stars,
                                    }): React.ReactElement => {
    const {query} = useRouter()
    const listName = (query?.q && `Search: "${query?.q}"`) ||
        ((repo as string)?.split("/")[1]?.replace(/^awesome-/, "") ?? "Home");
    const ITEMS_PER_PAGE = 50;
    const [state, setState] = useState([]);
    const [page, setPage] = useState(0);
    const [asyncData, setAsyncData] = useState(data)

    const fetchMoreData = () => {
        if (asyncData.length > page * ITEMS_PER_PAGE && page)
            setState((state) =>
                state.concat(
                    asyncData.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE)
                )
            );
    };

    useEffect(() => {
        setPage(0);
        setState(data);
    }, [repo, data]);

    useEffect(() => {
      const uri = query?.q ? `/api/awesome/search?q=${query.q}` : `/api/awesome/list?repo=${repo}`
      axios.get(uri).then(res => {
        setAsyncData((state: any[]) => state.concat(res.data))
      })
    }, [repo, query.q, data]);

    useEffect(fetchMoreData, [page, asyncData]);

    return (
        <Box maxW={"full"} px={useBreakpointValue({xs: 4, lg: 10})}>
          <Text fontSize={"xl"}>
                {listName} {stars ? `- ${stars}` : ""}
          </Text>
            {
                query?.q && <Text fontSize={"sm"}>
                    Results: {data?.length || 0}
                </Text>
            }
            <InfiniteScroll
                dataLength={state.length}
                hasMore={state.length < asyncData.length}
                next={() => setPage((page) => page + 1)}
                loader={<h4>Loading...</h4>}
            >
                <SimpleGrid columns={useBreakpointValue({xs: 1, sm:2, md: 3, lg: 4, xl:5})} gap={2} justifyContent={"center"}>
                    {state.map?.((item: any, index: number) => (
                        <AwesomeCard key={index} data={item}/>
                    ))}
                </SimpleGrid>
            </InfiniteScroll>
        </Box>
    );
};

export default AwesomeList;
