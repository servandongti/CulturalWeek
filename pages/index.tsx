import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { createClient } from '@supabase/supabase-js'
import { Table, useCollator} from '@nextui-org/react';

interface ILeaderBoard  {
  id?: number;
  score: number;
  name: string;
  phone: number;
}

export async function getStaticProps() {
  const supabaseAdmin = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE || ''
  )
  const { data } = await supabaseAdmin.from('leaderboard').select('*').order('id')
  return {
    props: {
      leaderboard: data,
    },
  }
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Home = ({leaderboard}: {leaderboard: ILeaderBoard[]}) => {
  console.log(leaderboard)
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
      <h1 className={cn(
        'text-transparent bg-clip-text font-extrabold',
        'bg-gradient-to-r from-[#42d392] to-[#647eff]',
        'text:2xl sm:text-4xl p-8'
        )}>Leaderboard</h1>
      <Table
      bordered
      shadow
      color="secondary"
      aria-label="Example pagination  table"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
      
    >
      <Table.Header>
        <Table.Column allowsSorting>NAME</Table.Column>
        <Table.Column>SCORE</Table.Column>
        <Table.Column>PHONE</Table.Column>
      </Table.Header>
      <Table.Body>
      {
        leaderboard.map(({id,name, score, phone}) => (
          <Table.Row key={id}>
            <Table.Cell>{name}</Table.Cell>
            <Table.Cell>{score}</Table.Cell>
            <Table.Cell>{phone}</Table.Cell>
          </Table.Row>
        ))
      }
        
      </Table.Body>
      
    </Table>
     
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  )
}

export default Home
