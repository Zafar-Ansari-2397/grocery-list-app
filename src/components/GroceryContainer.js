import React, { useState, useEffect } from "react";
import Alert from "./Alert";
import List from "./List";

// get value from localstorage
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};
const GroceryContainer = () => {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "Please Enter something");
    } else if (isEditing && name) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setIsEditing(false);
      setEditId(null);
      showAlert(true, "success", "Item changed");
    } else {
      showAlert(true, "success", "Item Added Successfully");
      const newValue = { id: new Date().getTime().toString(), title: name };
      setList([...list, newValue]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, msg, type });
  };

  const clearList = () => {
    showAlert(true, "danger", "Empty List");
    setList([]);
  };
  const removeItem = (id) => {
    showAlert(true, "danger", "Item Removed");
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  };
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setName(specificItem.title);
    setEditId(id);
    setIsEditing(true);
  };
  // local storage set value
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <>
      <section className='section-center'>
        <form className='grocery-from' onSubmit={handleSubmit}>
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} list={list} />
          )}
          <h3 style={{ textAlign: "center", paddingBottom: "1rem" }}>
            Grocery - List
          </h3>
          <div className='form-control'>
            <input
              type='text'
              className='grocery'
              placeholder='Add Your Items....'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className='submit-btn' type='submit'>
              {isEditing ? "edit" : "submit"}
            </button>
          </div>
        </form>
        <div className='grocery-container'>
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button type='submit' className='clear-btn' onClick={clearList}>
            Clear All
          </button>
        </div>
      </section>
    </>
  );
};

export default GroceryContainer;
