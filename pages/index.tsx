import Head from 'next/head'
import Link from 'next/link'
import { Table } from '@nextui-org/react';
import { supabase } from '../lib/supabase'

interface ILeaderBoard {
  id?: number;
  score: number;
  name: string;
  phone: number;
}

export async function getStaticProps() {
  const { data } = await supabase.from('leaderboard').select('*').order('id')
  return {
    props: {
      leaderboard: data,
    },
  }
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Home = ({ leaderboard }: { leaderboard: ILeaderBoard[] }) => {
  const sortedLeaderboard = leaderboard.sort((a, b) => b.score - a.score)


  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>GE ITS Typing Competition</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className={cn(
          'text-transparent bg-clip-text font-extrabold',
          'bg-gradient-to-r from-[#42d392] to-[#647eff]',
          'text:2xl sm:text-4xl p-8'
        )}>Leaderboard</h1>
        {
          leaderboard.length === 0 ? (
            <p className="text-2xl font-extrabold flex justify-center">No hay participantes registrados</p>
          ) : (

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
                  sortedLeaderboard.slice(0, 10).map(({ id, name, score, phone }) => (
                    <Table.Row key={id}>
                      <Table.Cell>{name}</Table.Cell>
                      <Table.Cell>{score}</Table.Cell>
                      <Table.Cell>{phone}</Table.Cell>
                    </Table.Row>
                  ))
                }
              </Table.Body>

            </Table>
          )
        }


      </main>

      <footer className="flex h-24 w-full items-center mt-5 justify-center border-t">
        <Link href='https://discord.gg/GE5zcR6J'>
          <a target="_blank" className='text-[#f1f1f1] border-b border-green-400'>
            Powered by <b>GEITS</b>{' '}
          </a>
        </Link>
      </footer>
    </div>
  )
}

export default Home
