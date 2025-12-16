import { useEffect, useState } from "react";
import Namelist from "./Components/Namelist";
import SubmitForm from "./Components/SubmitForm";
import Filter from "./Components/Filter";
import Service from "./services/persons";
import Notification from "./Components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterText, setfilterText] = useState("");
  const [errMessage, setErrMessage] = useState({ type: null, message: null });

  useEffect(() => {
    Service.getAll().then((data) => setPersons(data));
  }, []);

  const handleChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNChange = (e) => {
    setNewNumber(e.target.value);
  };
  const handleFilterChange = (e) => {
    setfilterText(e.target.value);
  };

  const addName = (e) => {
    e.preventDefault();

    const existingPerson = persons.find((p) => p.name === newName);

    if (existingPerson) {
      if (
        window.confirm(`${newName} is already in the phonebook, would you want to replace the
        old number with the new one?`)
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        Service.change(existingPerson.id, updatedPerson)
          .then((res) => {
            setPersons(
              persons.map((p) => (p.id !== existingPerson.id ? p : res.data))
            );
            setNewName("");
            setNewNumber("");
            setErrMessage({
              message: `Number ${newNumber} was added to ${newName}`,
              type: "success",
            });
            setTimeout(() => {
              setErrMessage({ ...errMessage, message: null });
            }, 5000);
          })
          .catch((err) => {
            setErrMessage({
              message: `Information of ${newName} has already been removed from server`,
              type: "error",
            });
            setTimeout(() => {
              setErrMessage({
                message: null,
              });
            }, 5000);
          });
      } else {
        setErrMessage({
          message: `Action cancelled, number was not saved`,
          type: "error",
        });
        setTimeout(() => {
          setErrMessage({ ...errMessage, message: null });
        }, 2000);
      }
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      };
      Service.create(nameObject)
        .then((person) => {
          console.log(person);
          setPersons([...persons, person.data]);
          setNewName("");
          setNewNumber("");
          setErrMessage({
            message: `${newName} was added to the phonebook with number ${newNumber}`,
            type: "success",
          });
          setTimeout(() => {
            setErrMessage({ message: null });
          }, 5000);
        })
        .catch((error) => {
          setErrMessage({
            message: `Unknown error`,
            type: "error",
          });
          setTimeout(() => {
            setErrMessage({
              message: null,
            });
          }, 5000);
        });
    }
  };

  const deleteName = (i) => {
    if (window.confirm("Are you sure you want to delete this name")) {
      Service.remove(i)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== i));
          setErrMessage({
            message: `Name was removed from the number list succesfully`,
            type: "success",
          });
          setTimeout(() => {
            setErrMessage({ message: null });
          }, 5000);
        })
        .catch((err) => {
          setErrMessage({
            message: `Error happened with removing the name`,
            type: "error",
          });
          setTimeout(() => {
            setErrMessage({
              message: null,
            });
          }, 5000);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errMessage.message} type={errMessage.type} />
      <Filter filterText={filterText} handleFilterChange={handleFilterChange} />

      <h2>Add a new</h2>
      <SubmitForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleChange={handleChange}
        handleNChange={handleNChange}
      />

      <h2>Numbers</h2>
      <ul>
        <Namelist
          persons={persons}
          filterText={filterText}
          deleteName={deleteName}
        />
      </ul>
    </div>
  );
};

export default App;
