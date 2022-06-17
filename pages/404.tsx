import Layout from "../components/Layout";
import {FC} from "react";
import {Box} from "@chakra-ui/react";

const Custom404: FC = () => {
  return (
    <Layout>
      <Box margin={"auto"}>
        <h1>Awesome List Not Found</h1>
      </Box>
    </Layout>
  );
};

export default Custom404;
