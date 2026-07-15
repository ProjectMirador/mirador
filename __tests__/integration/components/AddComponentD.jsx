import { useState } from 'react';

const AddComponentD = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div id="add-plugin-component-d">
      <input defaultValue="hello componentD" />
      <button data-testid="plugin-button-d" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
        {isOpen ? 'Close' : 'Open'}
      </button>
      {isOpen && <div data-testid="plugin-content-d">Content visible</div>}
    </div>
  );
};

export default AddComponentD;
