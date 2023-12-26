import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTaskByCaseId, getTasks } from "../../redux/thunk/globalThunk";
import { useFixedFooter } from "../common/helper";
import { useParams } from "react-router-dom";

const Tasks = () => {
  const { id } = useParams();
  useFixedFooter();
  const global = useSelector((state) => state.global);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!id) dispatch(getTasks());
    else {
        dispatch(getTaskByCaseId({caseId:id}));
    }
  }, [dispatch]);
  return (
    <>
      <h2>All tasks</h2>
      <div className="row align-items-top">
        {global.tasks?.map((i) => (
          <Card
            title={i.taskTitle}
            description={i.taskDescription}
            key={i.id}
            priority={i.priority}
            dueDate={new Date(i.dueDate).toLocaleString("en-GB")}
            id={i.caseId}
          />
        ))}
        {!global.tasks?.length && (
          <h2 className="text-center text-primary">
            No task added yet, you will get be notified when one is added!
          </h2>
        )}
      </div>
    </>
  );
};

const Card = ({ title, description, priority, dueDate, id }) => {
  return (
    <div className="col-lg-6">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            {title} {id}
            <small className="priority" title="priority">
              {" "}
              {priority}
            </small>
          </h5>
          <p className="card-text">{description}</p>
          <p className="card-text" style={{ fontWeight: "800" }}>
            Due date {dueDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
