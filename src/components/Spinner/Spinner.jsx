import { usePromiseTracker } from "react-promise-tracker";

function Spinner(props) {
  const { promiseInProgress } = usePromiseTracker({ area: props.area });

  return (
    (promiseInProgress === true) ?
      <h3 style={{ color: "red" }}>Loading...</h3>
      :
      null
  );
};

export default Spinner;
