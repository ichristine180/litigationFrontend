import {
  faFileArrowUp,
  faScaleBalanced,
  faScaleUnbalancedFlip,
  faTasksAlt,
} from "@fortawesome/free-solid-svg-icons";
import InfoCard from "../../common/InfoCard";
import { useFixedFooter } from "../../common/helper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createTask, getLaywerApplication, getTasks } from "../../../redux/thunk/globalThunk";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "../../common/Form";

const LawyerDashboard = () => {
  useFixedFooter();
  const gloabal = useSelector((state) => state.global);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLaywerApplication());
    dispatch(getTasks());
  }, [dispatch]);
  return (
    <>
      <div className="row">
        <InfoCard
          title="All cases"
          icon={faScaleUnbalancedFlip}
          value={gloabal.lawyerApp?.length}
          classN="sales"
        />
        <InfoCard
          title="Closed cases"
          icon={faScaleBalanced}
          value="0"
          classN={"customers"}
        />
        <InfoCard
          title="Tasks"
          icon={faTasksAlt}
          value={gloabal.tasks?.length}
          classN={"customers"}
        />
      </div>
      <Table data={gloabal.lawyerApp} />
    </>
  );
};
export const Table = ({ data, title }) => {
  const [show, setShow] = useState(false);
  const hideHandler = () => setShow(false);
  const dispatch = useDispatch();
  return (
    <div class="col-lg-12">
      <h5 class="card-title">{"Cases assigned to you"}</h5>
      <table className="table datatable">
        <thead>
          <tr>
            <th scope="col"> Date</th>
            <th scope="col">Category</th>
            <th scope="col">Summary</th>
            <th scope="col">Status</th>
            <th scope="col">Customer</th>
            <th scope="col"> </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <th scope="row">
                {new Date(item.createdAt).toLocaleDateString("en-GB")}
              </th>
              <td>{item.caseCategory}</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: item.caseSummary }} />
              </td>
              <td>{item.status}</td>
              <td>
                {item.Account?.firstName}|{item.Account?.mobileNo}
              </td>
              <td>
                <FontAwesomeIcon
                  icon={faTasksAlt}
                  title="add task"
                  className="btn btn-primary mb-2"
                  onClick={() => setShow(item.Case?.id)}
                />
                {/* <FontAwesomeIcon
                  icon={faFileArrowUp}
                  title="Upload documents"
                  className="btn btn-success"
                /> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!data.length && <p className="text-center">No data found</p>}
      <Modal show={show ? true : false} onHide={hideHandler} centered>
        <Modal.Header closeButton>
          <Modal.Title>Task creation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            fields={[
              {
                name: "taskTitle",
                label: "Title",
                type: "text",
                required: true,
              },
              {
                name: "taskDescription",
                label: "Description",
                type: "textarea",
                required: true,
              },
              {
                name: "priority",
                label: "Priority",
                type: "select",
                required: true,
                options: [
                  { value: "1", label: "1" },
                  { value: "2", label: "2" },
                  { value: "3", label: "3" },
                ],
              },
              {
                name: "dueDate",
                label: "Due Date",
                type: "date",
                required: true,
              },
              {
                name: "dueTime",
                label: "Due Time",
                type: "time",
                required: true,
              },
            ]}
            onSubmit={(data) => {
              let date = data.dueDate + "T" + data.dueTime;
              data.dueDate = new Date(date);
              delete data.dueTime;
              data.caseId = show;
              dispatch(createTask(data))
              hideHandler();
            }}
            submitButtonText="Create"
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LawyerDashboard;
