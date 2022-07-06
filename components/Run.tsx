import Button from './ButtonPrimary';
import styles from './Run.module.scss';

type Props = {
  position?: number;
  runnerName?: string;
  runTime?: string;
  runDate?: string;
  verificationDate?: string;
  verifierName?: string;
  variables?: object[];
};

const arrowSVG = <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M17.7 34.9q-.4-.5-.425-1.1-.025-.6.425-1.05l8.8-8.8-8.85-8.85q-.4-.4-.375-1.075.025-.675.425-1.075.5-.5 1.075-.475.575.025 1.025.475l9.95 9.95q.25.25.35.5.1.25.1.55 0 .3-.1.55-.1.25-.35.5l-9.9 9.9q-.45.45-1.05.425-.6-.025-1.1-.425Z"/></svg>

export default function Run({position, runnerName, runTime, runDate, verificationDate, verifierName, variables}: Props) {

  // const styling = {
  //   switch (position) {
  //     case 1:
  //       "--clr-position": "var(--clr-first)",
  //       break;
  //     case 2: 
  //       "--clr-position": "var(--clr-second)",
  //       break;
  //     case 3:
  //       "--clr-position": "var(--clr-third)",
  //       break;
  //     default:
  //       break;
  //   }
  // }

  return (
    <div className={styles.run}>
      <div className="run_summary">
        <ul>
          <li>{position}</li>
          <li>{runTime}</li>
          <li>{runnerName}</li>
          <li>{runDate}</li>
          <li><button>{arrowSVG}</button></li>
        </ul>
      </div>
      <div className="run_extended">
        <div className="run_extended_video">
          <iframe src="" frameBorder="0"></iframe>
          <Button>View Run</Button>
        </div>
        <div className="run_extended_info">
          <ul>
            {variables}
            <li>
              Verified {verificationDate} by <span>{verifierName}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}