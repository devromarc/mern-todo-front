import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [popup, setPopup] = useState(false);
  const [createTodo, setCreateTodo] = useState("");
  const [updatePop, setUpdatePop] = useState(false);
  const [isUpdate, setIsUpdate] = useState("");
  const [updateId, setUpdateId] = useState("");

  useEffect(() => {
    const getItemList = async () => {
      try {
        const res = await axios.get(
          "https://mern-todo-app-api-9i32.onrender.com/todos"
        );
        setTodos(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getItemList();
  }, [todos]);

  const completeTodo = async (id) => {
    try {
      const response = await axios.get(
        "https://mern-todo-app-api-9i32.onrender.com/todo/complete/" + id
      );
      const data = response.data;
      setTodos((todos) => {
        todos.forEach((todo) => {
          if (todo._id === data._id) {
            todo.complete = data.complete;
          }
        });
        return todos;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(
        "https://mern-todo-app-api-9i32.onrender.com/todo/delete/" + id
      );
      setTodos((todos) => todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        "https://mern-todo-app-api-9i32.onrender.com/todo/new",
        {
          item: createTodo,
        }
      );
      // console.log(data);
      setCreateTodo("");
      setPopup(false);
      setTodos([...todos, data]);
    } catch (error) {
      console.log(error);
    }
  };

  const updateItem = async () => {
    try {
      const res = await axios.put(
        "https://mern-todo-app-api-9i32.onrender.com/todo/update/" + updateId,
        { item: isUpdate }
      );
      setIsUpdate("");
      setUpdateId("");
      setUpdatePop(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <div className=" bg-[#202B3E] h-[100vh] text-white p-8">
        <h1 className=" text-5xl text-red-400 uppercase font-bold mb-8">
          To Do List
        </h1>
        <h4 className=" text-2xl uppercase text-yellow-100 font-normal mb-4">
          Your task
        </h4>
        <div className=" text-lg">
          {todos.map((item) => (
            <div
              className="relative bg-slate-600 p-4 rounded-2xl flex transition cursor-pointer mb-4 items-center hover:opacity-80"
              key={item._id}
              // onClick={() => completeTodo(item._id)}
            >
              <div
                className={
                  "w-5 h-5 mr-4 rounded-[999px] bg-[#202B3E] transition duration-300" +
                  (item.complete
                    ? " bg-gradient-to-b from-pink-500 to-purple-400"
                    : "")
                }
              ></div>
              <div className={item.complete ? " line-through" : ""}>
                {item.item}
              </div>
              <div className="flex">
                <button
                  className=" uppercase border-solid border-2 bg-green-400 p-1 border-green-400 rounded absolute top-[20%] right-[215px] hover:scale-110 z-10 "
                  onClick={() => completeTodo(item._id)}
                >
                  mark
                </button>
                <button
                  className=" uppercase border-solid border-2 bg-orange-400 p-1 border-orange-400 rounded absolute top-[20%] right-[120px] hover:scale-110 z-10 "
                  onClick={() => {
                    setUpdatePop(true);
                    setUpdateId(item._id);
                  }}
                >
                  update
                </button>
                <button
                  className=" uppercase border-solid border-2 bg-red-600 p-1 border-red-600 rounded absolute top-[20%] right-[30px] hover:scale-110 z-10"
                  onClick={() => deleteTodo(item._id)}
                >
                  delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {updatePop ? (
          <div className=" fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-[400px] bg-slate-300 p-8 rounded-2xl shadow-2xl text-black z-50">
            <div
              className="absolute top-4 right-4 w-5 h-5 text-lg text-white cursor-pointer flex items-center justify-center bg-red-600 rounded-[50%] "
              onClick={() => setUpdatePop(false)}
            >
              x
            </div>
            <div>
              <input
                type="text"
                className=" border-none appearance-none outline-none rounded-2xl shadow-lg p-4 w-full mt-4"
                onChange={(e) => setIsUpdate(e.target.value)}
                value={isUpdate}
              />
              <button
                className=" mt-3 p-3 rounded-3xl uppercase border-2 bg-orange-400 border-orange-400 text-white"
                onClick={() => updateItem()}
              >
                update
              </button>
            </div>
          </div>
        ) : (
          ""
        )}

        <div
          className=" fixed bottom-8 right-8 flex justify-center items-center w-16 h-16 rounded-full text-xl font-black bg-gradient-to-b from-pink-500 to bg-purple-500 cursor-pointer hover:scale-125"
          onClick={() => {
            setPopup(true);
          }}
        >
          +
        </div>

        {popup ? (
          <div className=" fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-[400px] bg-slate-300 p-8 rounded-2xl shadow-2xl text-black z-50">
            <div
              className="absolute top-4 right-4 w-5 h-5 text-lg text-white cursor-pointer flex items-center justify-center bg-red-600 rounded-[50%]"
              onClick={() => setPopup(false)}
            >
              x
            </div>
            <div>
              <h3 className=" uppercase mb-4 font-semibold">Add your task</h3>
              <input
                type="text"
                className=" border-none appearance-none outline-none rounded-2xl shadow-lg p-4 w-full"
                onChange={(e) => setCreateTodo(e.target.value)}
                value={createTodo}
              />
              <button
                className=" mt-3 p-3 rounded-3xl uppercase border-2 bg-green-600 border-green-600 text-white"
                onClick={(e) => addTodo(e)}
              >
                create task
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
