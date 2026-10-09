import { useState } from 'react';
import CafeInfo from '../CafeInfo/CafeInfo';
import css from './App.module.css';
import type { VoteOption, Votes } from '../../types/votes';
import VoteOptions from '../VoteOptions/VoteOptions';
import VoteStats from '../VoteStats/VoteStats';
import Notification from '../Notification/Notification';

function App() {
  const defaultVotes = { good: 0, neutral: 0, bad: 0 };

  const [votes, setVotes] = useState<Votes>(defaultVotes);

  const voteValues = Object.values(votes) as number[];

  const totalVotes = voteValues.reduce((value, acc) => acc + value, 0);

  const positiveVotes = totalVotes
    ? Math.ceil((votes.good / totalVotes) * 100)
    : 0;

  const isVotes = totalVotes > 0 ? true : false;

  const updateVotes = (vote: VoteOption) => {
    setVotes({
      ...votes,
      [vote]: votes[vote] + 1,
    });
  };

  const resetVotes = () => {
    setVotes(defaultVotes);
  };

  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions
        voteHandler={updateVotes}
        votesReset={resetVotes}
        canReset={isVotes}
      />
      {isVotes ? (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveVotes={positiveVotes}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}

export default App;
