import React from "react";
import { useReducer, useRef } from "react";
import { formReducer, initialState } from "./formReducer";
import "./form.css";
export default function Form() {
  const tagRef = useRef();
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleInputChange = (event) => {
    dispatch({
      type: "change_input",
      data: { name: event.target.name, value: event.target.value },
    });
  };
  const handleTags = () => {
    const tags = tagRef.current.value.split(",");
    tags.forEach((t) => {
      dispatch({ type: "add_tag", data: t });
    });
  };
  return (
    <form className="form">
      <input
        className="input"
        type="text"
        placeholder="title"
        name="title"
        onChange={handleInputChange}
      />
      <input
        className="input"
        type="text"
        placeholder="descripton"
        name="descripton"
        onChange={handleInputChange}
      />
      <input
        className="input"
        type="number"
        placeholder="price"
        name="price"
        onChange={handleInputChange}
      />
      <p>category</p>
      <select name="category" onChange={handleInputChange} className="select">
        <option value="bag">bag</option>
        <option value="shoes">shoes</option>
        <option value="dress">dress</option>
      </select>
      <p>tag</p>
      <textarea placeholder="tags" ref={tagRef} className="text"></textarea>
      <br />
      <button type="button" className="btn" onClick={handleTags}>
        choose tag
      </button>

      {state.tags.map((tag) => {
        return (
          <button
            className="tag"
            key={tag}
            onClick={() => {
              dispatch({ type: "remove_tag", data: tag });
            }}
          >
            {tag}
          </button>
        );
      })}
      <div style={{ marginTop: "20px" }} className="btns">
        <button
          type="button"
          onClick={() => dispatch({ type: "increase" })}
          className="bt"
        >
          +
        </button>
        <p className="num">number {state.quantity}</p>
        <button
          type="button"
          onClick={() => dispatch({ type: "decrease" })}
          className="bt"
        >
          -
        </button>
      </div>
    </form>
  );
}
