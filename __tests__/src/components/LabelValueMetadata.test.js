import { render, screen } from '@tests/utils/test-utils';
import { LabelValueMetadata } from '../../../src/components/LabelValueMetadata';

/** */
function createWrapper(props) {
  return render(
    <LabelValueMetadata
      {...props}
    />,
  );
}

/* eslint-disable testing-library/no-node-access */
describe('LabelValueMetadata', () => {
  let wrapper;
  let labelValuePairs;

  describe('when the labelValuePair has content', () => {
    beforeEach(() => {
      labelValuePairs = [
        {
          label: 'Label 1',
          values: ['Value 1'],
        },
        {
          label: 'Label 2',
          values: ['Value 2', 'Value 3'],
        },
      ];

      wrapper = createWrapper({ labelValuePairs });
    });

    it('renders a dt/dd for each label/value pair', () => {
      expect(wrapper.container.querySelector('dl')).toBeInTheDocument();
      expect(wrapper.container.querySelectorAll('dt').length).toEqual(2);
      expect(wrapper.container.querySelectorAll('dd').length).toEqual(2);
    });

    it('renders correct labels in dt', () => {
      expect(screen.getByText('Label 1')).toBeInTheDocument();
      expect(screen.getByText('Label 2')).toBeInTheDocument();
    });

    it('renders SanitizedHtml component in dd for each value', () => {
      expect(screen.getByText('Value 1')).toBeInTheDocument();
      expect(screen.getByText('Value 2, Value 3')).toBeInTheDocument();
    });

    it('uses the default labelValueJoiner from config', () => {
      expect(screen.getByText('Value 2, Value 3')).toBeInTheDocument();
    });
  });

  describe('when the labelValuePair has no content', () => {
    it('renders an empty fragment instead of an empty dl', () => {
      wrapper = createWrapper({ labelValuePairs: [] });
      expect(wrapper.container).toBeEmptyDOMElement();
    });
  });

  describe('when the labelValuePair has content and labelValueJoiner is set to a custom variable', () => {
    beforeEach(() => {
      labelValuePairs = [
        {
          label: 'Label 1',
          values: ['Value 1', 'Value 2'],
        },
      ];
      wrapper = createWrapper({ labelValueJoiner: '*', labelValuePairs });
    });

    it('renders a dt/dd for each label/value pair', () => {
      expect(wrapper.container.querySelector('dl')).toBeInTheDocument();
      expect(wrapper.container.querySelectorAll('dt').length).toEqual(1);
      expect(wrapper.container.querySelectorAll('dd').length).toEqual(1);
    });

    it('renders correct label in dt', () => {
      expect(screen.getByText('Label 1')).toBeInTheDocument();
    });

    it('renders SanitizedHtml component in dd for each value with correct joiner', () => {
      expect(screen.getByText('Value 1*Value 2')).toBeInTheDocument();
    });
  });

  describe('when the labelValuePair has a default label', () => {
    beforeEach(() => {
      labelValuePairs = [
        {
          values: ['Value 1'],
        },
        {
          label: 'Label 2',
          values: ['Value 2'],
        },
      ];
      createWrapper({ defaultLabel: 'Default label', labelValuePairs });
    });

    it('renders correct labels in dt', () => {
      expect(screen.getByText('Default label')).toBeInTheDocument();
      expect(screen.getByText('Label 2')).toBeInTheDocument();
    });
  });
});
