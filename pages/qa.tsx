import type { NextPage } from "next";
import { QA } from "../components/QA";
import { supabase } from "../lib/supabase";

interface IQA {
  question: string;
  answer: string;
}

export async function getStaticProps() {
  const { data } = await supabase.from("questions").select("*").order("id");
  return {
    props: {
      qa: data,
    },
  };
}

const WrappedQA: NextPage = () => {
  return <QA qa={[]} />;
};

export default WrappedQA;
