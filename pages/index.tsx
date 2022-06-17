import {AxiosError} from "axios";
import {NextPage} from "next";
import * as React from "react";
import AwesomeList from "../components/AwesomeList";
import Layout from "../components/Layout";
import List from "../models/List";
import dbConnect from "../lib/db";

const AwesomePage: NextPage<{
  list: any[];
  repo: string;
  stars: string
}> = ({
        list = [],
        repo = "",
        stars = "",
      }): React.ReactElement => {
  return (
    <Layout title="Awesome Tools - Home">
      <AwesomeList data={list} repo={repo} stars={stars}/>
    </Layout>
  );
};


export async function getStaticProps() {
  try {
    await dbConnect();
    const repo = process.env['DEFAULT_AWESOME_LIST']!;

    const awesome = await List.findById(repo.replace('/', '_'), {
      list: {$slice: 50}
    }).exec()


    return {
      props: {
        repo: repo === process.env.DEFAULT_AWESOME_LIST ? 'Home' : repo,
        list: awesome?.list ?? [],
        stars: repo != process.env.DEFAULT_AWESOME_LIST ? awesome?.stars : null,
      },
      revalidate: 7200,
    };
  } catch (e: AxiosError | any) {
    console.error(e);
    if (e.response?.status === 404) {
      return {
        notFound: true,
      };
    }
    return {
      props: {},
    };
  }
}


/*
export async function getServerSideProps({res}: GetServerSidePropsContext) {
  try {
    await dbConnect();
    const repo = process.env.DEFAULT_AWESOME_LIST!;

    const list = await List.findById(repo.replace('/', '_'), {
      list: {$slice: 50}
    }).exec()

    res.setHeader(
        'Cache-Control',
        'public, s-maxage=7200, stale-while-revalidate=86400'
    )

    return {
      props: {
        repo: repo === process.env.DEFAULT_AWESOME_LIST ? 'Home' : repo,
        list: list?.list ?? [],
        stars: repo != process.env.DEFAULT_AWESOME_LIST ? list?.stars : null,
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
      props: {},
    };
  }
}*/
export default AwesomePage;
