import './OpLine.scss';

interface IOpLine {
  children: JSX.Element[];
}

export default function OpLine(props: IOpLine) {
  const { children } = props;

  return (
    <div className="op_line">
      <div className="op_line--column">{children[0]}</div>
      <div className="op_line--column">{children[1]}</div>
      <div className="op_line--column op_line--column-right">{children[2]}</div>
    </div>
  );
}
