import { useDispatch } from "react-redux";
import React, { useRef } from "react";
import { RANGE } from "../../redux/actionTypes";
import "./Range.css";

function Range(props) {
  const rangeInputLen = useRef();
  const rangeInputAngle = useRef();
  const dispatch = useDispatch();

  const submitRangeLen = (event) => {
    event.preventDefault();
    const action = {
      type: RANGE,
      payload: {
        lengthPen: rangeInputLen.current.value,
        anglePen: rangeInputAngle.current.value,
      },
    };
    dispatch(action);
  };

  return (
    <div>
      <div>
        <h3>launch height</h3>
        <div onChange={submitRangeLen}>
          <input
            min="0.1"
            max="0.9"
            step="0.1"
            type="range"
            ref={rangeInputAngle}
          />
          <h3>shoulder length</h3>
          <input
            min="0.1"
            max="0.45"
            step="0.05"
            type="range"
            ref={rangeInputLen}
          />
        </div>
      </div>
    </div>
  );
}
export default Range;
