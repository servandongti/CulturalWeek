import type { NextPage } from "next";
import { QA } from "../components/QA";
import { Card, Grid, Text, Button, Row } from "@nextui-org/react";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";

interface IQA {
  id?: number;
  question: string;
  answer: string;
}

export async function getStaticProps() {
  const { data } = await supabase.from("qa").select("*").order("id");
  return {
    props: {
      qa: data,
    },
  };
}

const WrappedQA = ({ qa }: { qa: IQA[] }) => {
  return (
    <div>
        {
            qa.slice(0,40).map(({id,question, answer}) => (
                <div key={id} className='m-4'>
                <QA question={question} answer={answer}/>
                </div>
            ))
        }
    </div>
  
  );
};

export default WrappedQA;
