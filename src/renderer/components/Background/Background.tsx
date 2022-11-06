import './Background.css';

interface Props {
  children: JSX.Element | Array<JSX.Element>;
}

export const Background = ({ children }: Props) => {
  return <div className="background">{children}</div>;
};
