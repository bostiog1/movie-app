import { useEffect } from "react";
import { useState } from "react";

const Interview = () => {
  const [counter, setCounter] = useState(1);
  const [users, setUsers] = useState([]);

  const url = `https://random-data-api.com/api/v2/users?size=${counter}`;

  useEffect(
    () => async () => {
      try {
        const data = await fetch(url);
        const result = await data.json();
        // console.log(url);

        if (counter === 1) {
          return setUsers([users]);
        }

        console.log(users);
        setUsers(result);
        // console.log(result);
        // console.log(result[0].first_name);
      } catch (msg) {}
    },
    [counter]
  );

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <div className="app">
      <h1>{counter}</h1>
      <button onClick={() => setCounter(counter + 1)}>+</button>

      {users ? (
        users.map((elem) => {
          return (
            <div>
              {elem.id} {elem.first_name} {elem.last_name}
            </div>
          );
        })
      ) : (
        <div>Nu avem date</div>
      )}
    </div>
  );
};

export default Interview;
