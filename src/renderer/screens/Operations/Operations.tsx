import { AddOperation } from 'renderer/components/AddOperation/AddOperation';
import { OpHistory } from 'renderer/components/OpHistory/OpHistory';
import './Operations.css';

export const Operations = () => {
  return (
    <section className="operations">
      <AddOperation />

      <OpHistory />
    </section>
  );
};
