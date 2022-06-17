import {GetStaticPropsContext, NextPage} from "next";
import * as React from "react";
import AwesomeList from "../../components/AwesomeList";
import Layout from "../../components/Layout";
import List from "../../models/List";
import dbConnect from "../../lib/db";

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
    <Layout title={`Awesome Tools - ${repo ?? ""}`}>
      <AwesomeList data={list} repo={repo} stars={stars}/>
    </Layout>
  );
};


export async function getStaticProps({params}: GetStaticPropsContext<{ repo: string[] }>
) {
  try {
    await dbConnect();
    const repo: string | null = (params?.repo?.join("/") || null);

    const list = await List.findById(repo?.replace('/', '_'), {
      list: {$slice: 50}
    }).exec()

    return {
      props: {
        repo,
        qtd: list?.list.length,
        list: list?.list ?? [],
        stars: list?.stars ?? null,
      },
      revalidate: 7200,
    };
  } catch (e :any) {
    console.error(e);
      return {
        notFound: true,
      };
  }
}

export async function getStaticPaths() {
  await dbConnect();
  const awesome = await List.findById(process.env['DEFAULT_AWESOME_LIST']?.replace('/', '_'), {
    list: {$slice: 50}
  }).exec()
  return {
    paths: awesome?.list?.filter(({isAwesome}: any) => isAwesome).map(({repo, author}: any) => ({params: {repo: [author,repo]}})),
    fallback: 'blocking',
  }
}

export default AwesomePage;
