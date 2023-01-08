import classNames from 'classnames';
import './OpLine.scss';

interface IOpLine {
  id: string;
  children: JSX.Element[];
  // eslint-disable-next-line react/require-default-props
  freeWidth?: boolean;
  // eslint-disable-next-line react/require-default-props
  // isError?: boolean;
}

/** Creates a row of three elements ("columns") */
export default function OpLine(props: IOpLine) {
  const { id, children, freeWidth /* , isError */ } = props;

  return (
    <div
      key={id}
      className="op_line"
      // className={classNames('op_line', { 'op_line-error': isError })}
    >
      <div
        className={classNames('op_line--column', {
          'op_line--column-freeWidth': freeWidth,
        })}
      >
        {children[0]}
      </div>
      <div
        className={classNames('op_line--column', {
          'op_line--column-freeWidth': freeWidth,
        })}
      >
        {children[1]}
      </div>
      <div
        className={classNames(
          'op_line--column',
          { 'op_line--column-freeWidth': freeWidth },
          'op_line--column-right'
        )}
      >
        {children[2]}
      </div>
    </div>
  );
}
