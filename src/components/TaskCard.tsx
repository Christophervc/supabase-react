import { Task } from "../types/task";
import { useTaskStore } from "../store/taskStore";

const TaskCard = (task: Task) => {

  const { deleteTask } = useTaskStore();

  const handleDelete = () => {
    deleteTask(task.id);
  };

  

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          gap: "10px",
          marginBottom: "10px",
          border: "1px solid #b3b3b3",
          borderRadius: "4px",
          padding: "5px",
        }}
      >
        <span>{task.name}</span>
        <span style={{ marginLeft: "15px" }}>
          {task.completed ? "Completed" : "Not Completed"}
        </span>
        <div style={{ display: "flex", gap: "10px" }}>
          <button style={{ background: "#9c1708", color: "white" }} onClick={() => handleDelete()}>
            Delete
          </button>
          <label htmlFor="completed">Completed</label>
          <input type="checkbox" />
        </div>
      </div>
    </>
  );
};

export default TaskCard;
