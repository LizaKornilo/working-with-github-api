import { usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner';

function Spinner(props) {
  const { promiseInProgress } = usePromiseTracker({ area: props.area });

  return (
    (promiseInProgress === true) ?
      <div
        style={{
          width: "100%",
          height: "100",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Loader type="ThreeDots" color="#5580de" height="100" width="100" />
      </div>
      :
      null
  );
};

export default Spinner;
