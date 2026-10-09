import type { Votes } from '../../types/votes';
import css from './VoteStats.module.css';

interface VotesStatsProps {
  votes: Votes;
  totalVotes: number;
  positiveVotes: number;
}
export default function VoteStats({
  votes,
  totalVotes,
  positiveVotes,
}: VotesStatsProps) {
  return (
    <div className={css.container}>
      <p className={css.stat}>
        Good: <strong>{votes.good}</strong>
      </p>
      <p className={css.stat}>
        Neutral: <strong>{votes.neutral}</strong>
      </p>
      <p className={css.stat}>
        Bad: <strong>{votes.bad}</strong>
      </p>
      <p className={css.stat}>
        Total: <strong>{totalVotes}</strong>
      </p>
      <p className={css.stat}>
        Positive: <strong>{`${positiveVotes}%`}</strong>
      </p>
    </div>
  );
}
