/* eslint-disable react/prop-types */
const StateDependentComponent = ({ incSomeNumber, manifestId }) => (
  <button id="plugin-button" onClick={incSomeNumber} style={{ width: 64 }} type="button">
    { `Plugin:${manifestId}` }
  </button>
);

export default StateDependentComponent;
