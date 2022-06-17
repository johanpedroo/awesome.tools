import * as React from "react";
import {Badge, Box, Button, Flex, Icon, Text, useColorModeValue} from "@chakra-ui/react";
import {FaGithub, FaLink, FaStar, FaUser} from "react-icons/fa";
import {GoRepo} from "react-icons/go";
import Link from "next/link";

const AwesomeCard: React.FC<{ data: any }> = ({data}): React.ReactElement => {
    const BgColor = useColorModeValue('darkgray', 'white');
    const TextColor = useColorModeValue('white', 'gray.800');
    const badges: any[] = data?.path || data?.tags || null;

    return (
        <Box borderWidth='1px' borderRadius='lg' overflow='hidden' p={4}>
            <Flex flexDirection={"column"} height={'100%'} justifyContent={"space-between"}>
                <Text fontSize="md" fontWeight="bold">
                    {data?.category} {data?.category && "-"} {data?.name}
                </Text>
                <Text title={data?.description} fontSize="sm" fontWeight="bold" overflow={"hidden"} overflowWrap={"break-word"}>{data?.description}</Text>
                {data?.author && (
                    <Text fontSize={"xs"}><Icon as={FaUser} /> {data?.author}</Text>
                )}
                {data?.repo && (
                    <Text fontSize={"xs"}><Icon as={GoRepo} />{data?.repo}</Text>
                )}

                {data?.stars && <Text fontSize={"xs"}><Icon as={FaStar} h={"20px"} /> {data?.stars}</Text>}

                {
                    (badges?.length && (
                        <Flex justifyContent="flex-start" gap={2} margin="5px 0">
                            {
                                badges?.filter(tag => !tag.includes('awesome')).slice(0, 5)?.map((tag: string) => [
                                    <Badge background={BgColor}
                                           textColor={TextColor}
                                           textTransform="capitalize" fontSize="xs"
                                           justifyContent="center" alignItems="center" whiteSpace="nowrap"
                                           rounded="full" overflow="hidden" textOverflow="ellipsis" px="2"
                                           maxWidth="150px" as="a"
                                           href={`/search?q=${tag}`}
                                    title={tag}
                                    key={tag}>
                                        {tag}
                                    </Badge>,
                                ])
                            }
                        </Flex>
                    )) ||
                    null
                }

                <Flex display="inline-flex" maxW="full" gap="2" marginTop="1">
                    {data?.repo?.match(/^awesome/) && !["topics"].includes(data?.author) && (
                        <Link href={`/repo/${data?.author}/${data?.repo}`}>
                            <Button as={"a"} cursor={"pointer"} px="2" h="9" fontWeight="semibold" border="1px" rounded="md" textColor={BgColor} bgColor="transparent" _hover={{bgColor: 'transparent'}}>
                                View
                            </Button>
                        </Link>
                    )}
                    <Button as="a" px="2" h="9" fontWeight="semibold" border="1px" rounded="md" textColor={TextColor} bgColor={BgColor} _hover={{bgColor: BgColor}}
                        href={data.url || data.link}
                        target="_blank"
                    >
                        {
                            (data.url || data.link).includes('github') ? <Icon as={FaGithub} /> : <Icon as={FaLink} />
                        }
                    </Button>
                </Flex>
            </Flex>
        </Box>
    );
};

export default AwesomeCard;
