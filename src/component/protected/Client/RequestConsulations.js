import { Editor } from "@tinymce/tinymce-react";
import { useFixedFooter } from "../../common/helper";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { requestConsulation } from "../../../redux/thunk/globalThunk";

const RequestConsulations = () => {
  useFixedFooter();
  const editorRef = useRef(null);
  const [caseCat, setCaseCat] = useState("family");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const submitHandler = () => {
    if (!editorRef.current.getContent())
      return setError("Case summary is required");
    else
      dispatch(
        requestConsulation({
          caseSummary: editorRef.current.getContent(),
          caseCategory: caseCat,
        })
      );
  };
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Request Consulation form</h5>
        <p className="text-center text-danger">{error}</p>
        <div class="row mb-3">
          <label class="col-sm-2 col-form-label">Case category</label>
          <div class="col-sm-10">
            <select
              class="form-select"
              aria-label="Default select example"
              defaultValue={caseCat}
              onChange={(e) => {
                setCaseCat(e.target.value);
              }}
            >
              <option value="family">Family case</option>
              <option value="criminal defense">Criminal Defense case</option>
              <option value="real estate">Real Estate case</option>
              <option value="personal injury">Personal Injury case</option>
            </select>
          </div>
        </div>

        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "insertdatetime",
              "media",
              "table",
              "wordcount",
            ],
            toolbar:
              "undo redo | formatselect | bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | removeformat | help", // Remove "link" and add "formatselect"
            content_style:
              "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }",
          }}
        />
        <button
          className="btn btn-primary pull-right mt-2 "
          onClick={submitHandler}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default RequestConsulations;
