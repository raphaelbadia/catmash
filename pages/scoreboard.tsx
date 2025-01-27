import { FC } from 'react';
import { useQuery } from 'react-query';
import LinkToScoreboard from '../components/MenuLink';
import ScoreCard from '../components/ScoreCard';
import { client } from '../utils/client';

function getScoreboard() {
  return client('scoreboard');
}

const ScoreboardPage: FC = () => {
  const { status, data } = useQuery('current-match', getScoreboard);

  if (status !== 'success' || !data || data.length < 3) {
    return null;
  }

  const [theBoss, second, third, ...loosers] = data;

  return (
    <div className="w-full flex flex-col justify-center relative">
      <LinkToScoreboard to="/">Vote</LinkToScoreboard>
      <div className="h-full w-full mt-24">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-4xl md:text-6xl text-center uppercase font-bold p-10">
            Scoreboard
          </h1>
          <div className="scoreboard-top-container">
            <div className="scoreboard-top3">
              <div className="first h-72 md:h-full">
                <ScoreCard rank={1} cat={theBoss} />
              </div>
              <div className="second h-72 md:h-full">
                <ScoreCard rank={2} cat={second} />
              </div>
              <div className="third h-72 md:h-full">
                <ScoreCard rank={3} cat={third} />
              </div>
            </div>
          </div>
        </div>
        <div className="md:mt-12 lg:px-3 xl:px-12 flex flex-wrap justify-between gap-3 md:gap-y-10">
          {loosers.map((looser, index) => {
            return (
              <div
                className="p-4 w-full md:w-auto md:p-0 h-56"
                key={looser._id}
              >
                <ScoreCard cat={looser} rank={index + 4} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScoreboardPage;
