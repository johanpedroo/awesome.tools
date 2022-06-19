import Link from "next/link";
import {FC, ReactElement} from "react";
import {Box, Flex, Text, IconButton , useBreakpointValue, useColorMode, useColorModeValue} from "@chakra-ui/react";
import {BsGear, BsMoonFill, BsSunFill} from "react-icons/bs";
import {Icon} from "@chakra-ui/icons";
import {TbHammer} from "react-icons/tb";

const ToolBar: FC = (): ReactElement => {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Box w='100%' zIndex={1000} position="fixed" left={0} top={0} px={10} background={useColorModeValue('gray.100', 'gray.700')}  lineHeight={'65px'} shadow={`2px 0 20px ${useColorModeValue('#ccc', '#000')}`}>
            <Flex flexDirection={"row"} justifyContent={'space-between'} flex={1} alignItems={"center"}>
                <Link href={"/"}>
                    <a>
                        <Text fontSize={useBreakpointValue({md: '4xl', xs: '2xl'})} fontWeight={"bold"}>Awes<Icon as={BsGear} fontSize="0.7em" style={{display: 'inline'}}/>me <Icon as={TbHammer} style={{display: 'inline'}}/>ools</Text>
                    </a>
                </Link>
                <IconButton icon={colorMode == 'light'? <BsSunFill/> : <BsMoonFill/>} aria-label={"dark / light"} onClick={toggleColorMode}></IconButton>
            </Flex>

        </Box>
    );
};

export default ToolBar;
