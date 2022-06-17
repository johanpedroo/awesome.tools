import {FC, useState} from "react";
import {useRouter,} from 'next/router'
import {Input, InputGroup, InputRightElement} from "@chakra-ui/input";
import {Button, Flex, FormControl} from "@chakra-ui/react";

const Search: FC = () => {
  const {query, push} = useRouter()
  const [search, setState] = useState(query?.q || '')

  const submitSearch = async (e: any) => {
    e.preventDefault();
    await push(`/search?q=${search}`, undefined)
  }

  return (
    <Flex justifyContent={'center'}>
      <FormControl as={"form"} onSubmit={submitSearch} width={"md"} mt={6}>
        <InputGroup size='md'>
          <Input
            pr='4.5rem'
            type="text"
            placeholder='Search a Awesome list'
            onChange={e => setState(e.target.value)}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={submitSearch}>
              Search
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </Flex>


  )
}

export default Search