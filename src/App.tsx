import { useState, useEffect } from "react";
import { Card } from "../model";
import axios from "axios";

const App = () => {
  const [people, setPeople] = useState<Card[]>([]);

  // Get all data
  const getData = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/people");
      setPeople(data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  // Delete data
  const deleteSingleData = async (index: number) => {
    try {
      await axios.delete(`http://localhost:8000/people/${index}`);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main>
      <h1>{people.length} Birthdays today</h1>
      {people.map((each) => {
        const { id, img, name, age } = each;
        return (
          <section className="person" key={id}>
            <div>
              <img src={img} alt="Person" />
            </div>
            <div>
              <h3>{name}</h3>
              <p>{age} years</p>
            </div>
            <button
              onClick={async () => {
                await deleteSingleData(id);
                getData();
              }}
            >
              delete
            </button>
          </section>
        );
      })}
    </main>
  );
};

export default App;
