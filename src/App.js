import React, { useState, useEffect } from "react";
import server from "./data/server";
import "./App.css";
import Person from "./components/Person/Person";
import Button from "./components/Button/Button";
import { PushSpinner, TraceSpinner, RotateSpinner } from "react-spinners-kit";

function App() {
  //declaring all  state

  const [persons, setPersons] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [loading, setloading] = useState(false);
  const [peoplePerPage, setpeoplePerPage] = useState(4);

  useEffect(() => {
    const peoples = server;

    setPersons(peoples);
  }, []);

  // getting current people
  const indexOfLastPeople = currentPage * peoplePerPage;
  const indexOfFirstPeople = indexOfLastPeople - peoplePerPage;
  const currentPeople = persons.slice(indexOfFirstPeople, indexOfLastPeople);

  // declaring all action

  const loadNextFour = () => {
    setcurrentPage(currentPage + 1);
  };

  const quickLoadItems = () => {
    setloading(true);

    setTimeout(() => {
      setloading(false);
      setpeoplePerPage(peoplePerPage + 4);
    }, 500);
  };

  const lazyLoadItems = () => {
    setloading(true);

    setTimeout(() => {
      setloading(false);
      setpeoplePerPage(peoplePerPage + 4);
    }, 2000);
  };

  const navigateFirstPage = () => {
    setcurrentPage(1);
    setpeoplePerPage(4);
  };

  return (
    <div className="App p-4">
      <div className="person_area">
        {loading ? (
          <div className="spinner d-flex align-items-center">
            <div className='centering'>
              <RotateSpinner size={40} color="green" loading={loading} />
            </div>
          </div>
        ) : (
          <div className="row">
            {currentPeople.map(person => {
              return <Person person={person} key={person.id} />;
            })}
          </div>
        )}
      </div>
      <div className="btn-area">
        <Button
          lazyLoadItems={lazyLoadItems}
          loadNextFour={loadNextFour}
          quickLoadItems={quickLoadItems}
          navigateFirstPage={navigateFirstPage}
        />
      </div>
    </div>
  );
}

export default App;
