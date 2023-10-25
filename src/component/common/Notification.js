import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setError, setSuccess } from "../../redux/slice/globalSLice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckDouble,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const Notification = () => {
  const global = useSelector((state) => state.global);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (global.error || global.success) setShow(true);
    else setShow(false);
  }, [global.error, global.success]);
  return (
    <Modal show={show} centered>
      <FontAwesomeIcon
        icon={global.success ? faCheckDouble : faTimesCircle}
        className={
          global.success ? "notification-success" : "notification-error"
        }
        size="3x"
      />
      <Modal.Body>
        <h3 style={{ textAlign: "center", margin: "50px" }}>
          {global.success || global.error}
        </h3>
        <button
          title="close"
          className="btn btn-primary"
          style={{ float: "right" }}
          onClick={() => {
            if (global.navigateTo) navigate(global.navigateTo);
            dispatch(setSuccess(false));
            dispatch(setError(false));
            setShow(false);
          }}
        >
          close
        </button>
      </Modal.Body>
    </Modal>
  );
};

export default Notification;
