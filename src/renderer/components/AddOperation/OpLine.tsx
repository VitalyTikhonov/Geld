import './OpLine.scss';

interface IOpLine {
  columnLeft: JSX.Element | JSX.Element[];
  columnMiddle: JSX.Element | JSX.Element[];
  columnRight: JSX.Element | JSX.Element[];
}

export default function OpLine(props: IOpLine) {
  const { columnLeft, columnMiddle, columnRight } = props;

  return (
    <div className="op_line">
      <div className="op_line--column">{columnLeft}</div>
      <div className="op_line--column">{columnMiddle}</div>
      <div className="op_line--column op_line--column-right db">
        {columnRight}
      </div>
    </div>
  );
}
