import { AddOperation } from 'renderer/components/AddOperation/AddOperation';
import { OpHistory } from 'renderer/components/OpHistory/OpHistory';
import './Operations.css';
import { useEffect, useState } from 'react';

export const Operations = () => {
  // const [operations, setOperations] = useState([] as Array<unknown>);
  // useEffect(() => console.log('operations', operations), [operations]);

  return (
    <section className="operations">
      <AddOperation /* operations={operations} setOperations={setOperations} */
      />

      <OpHistory />
    </section>
  );
};
