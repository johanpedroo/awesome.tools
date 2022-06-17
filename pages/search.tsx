import {GetServerSidePropsContext} from "next";
import Search from './repo/[...repo]'
import dbConnect from "../lib/db";
import is from "is_js";
import List from "../models/List";
import {AxiosError} from "axios";

export async function getServerSideProps({query, res}: GetServerSidePropsContext<{ q?: string }>
) {
  try {
    let list: any;
    const search = query?.q
    await dbConnect();
    if (!query?.q || typeof query?.q && is.empty(query?.q))
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }

      list = {
        list: []
      }

      list.list = JSON.parse(JSON.stringify(await List.find({
        $or: [
          {_id: {$regex: search, $options: 'i'}},
          {path: {$regex: search, $options: 'i'}},
          {tags: {$regex: search, $options: 'i'}}
        ]
      }, {
        list: {$slice: 50}
      }).exec())) || []
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=7200, stale-while-revalidate=86400'
    )
    return {
      props: {
        repo: null,
        qtd: list?.list.length,
        list: list?.list ?? [],
        stars: list?.stars ?? null,
      }
    };
  } catch (e: AxiosError | any) {
    console.error(e);
    if (e.response?.status === 404) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        repo: null,
        q: ''
      },
    };
  }
}

export default Search
