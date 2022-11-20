import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { isAfterTime } from "../utils/dateTimeUtils";

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function useForm(initial = {}) {
  // create a state object for our inputs
  //tktktk add a way to set null inputs to empty strings
  const [inputs, setInputs] = useState(initial);
  useEffect(() => {
    // This function runs when the things we are watching change
    setInputs(initial);
  }, []);

  function handleChange(e) {
    let { value, name, type } = e.target;
    if (type === "number") {
      value = parseInt(value);
    } else if (type === "file") {
      [value] = e.target.files;
    } else if (type === "checkbox") {
      let checkbox = inputs[name];
      checkbox.push(value);
      value = checkbox;
    } else if (type === "bool") {
      if (value === "true") {
        value = true
      } else {
        value = false
      }
    }


    console.log({ value, name, type });
    setInputs({
      // copy the existing state
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ""])
    );
    setInputs(blankState);
  }

  // return the things we want to surface from this custom hook
  return {
    clearForm,
    inputs,
    handleChange,
    resetForm,
  };
}

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
