import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function useForm(initial = {}) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);
  useEffect(() => {
    // This function runs when the things we are watching change
    setInputs(initial);
  }, []);

  function handleChange(e) {
    let { value, name, type } = e.target;
    if (type === "number") {
      value = parseInt(value);
    }
    if (type === "file") {
      [value] = e.target.files;
    }
    if (type === "checkbox") {
      let checkbox = inputs[name];
      checkbox.push(value);
      value = checkbox;
    }
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
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}

export function isAfterDate(date, current) {
  var startDate = moment(date);
  if (!startDate) return true;
  return current.isAfter(startDate);
}

export function getMinTime(minTime) {
  if (minTime === "")
    return {
      hour: {},
      minute: {},
    };
  let obj = {
    hour: {
      min: minTime.hour(),
    },
    minute: {
      min: minTime.minute(),
    },
  };
  return obj;
}
