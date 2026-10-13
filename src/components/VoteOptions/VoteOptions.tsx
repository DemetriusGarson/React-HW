import type { VoteOption } from '../../types/votes';
import css from './VoteOptions.module.css';

interface VoteOptionsProps {
  voteHandler: (vote: VoteOption) => void;
  votesReset: () => void;
  canReset: boolean;
}

export default function VoteOptions({
  voteHandler,
  votesReset,
  canReset,
}: VoteOptionsProps) {
  return (
    <div className={css.container}>
      <button
        className={css.button}
        onClick={() => {
          voteHandler('good');
        }}
      >
        Good
      </button>
      <button
        className={css.button}
        onClick={() => {
          voteHandler('neutral');
        }}
      >
        Neutral
      </button>
      <button
        className={css.button}
        onClick={() => {
          voteHandler('bad');
        }}
      >
        Bad
      </button>
      {canReset && (
        <button className={`${css.button} ${css.reset}`} onClick={votesReset}>
          Reset
        </button>
      )}
    </div>
  );
}
