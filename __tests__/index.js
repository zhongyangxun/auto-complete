import React from 'react';
import { shallow, configure, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import AutoComplete from '../src/components/AutoComponent';
import SelectBox, { ACTIVE_CLASS } from '../src/components/SelectBox';

configure({ adapter: new Adapter() });

const props = {
  value: 'aa',
  onSearch: jest.fn(),
  onChange: jest.fn(),
  onFocus: jest.fn(),
  onBlur: jest.fn(),
  onSelect: jest.fn(),
  options: [
    {
      value: '1',
    },
    {
      value: '2',
    },
    {
      value: '3',
    },
  ],
};

const selectBoxProps = (({ value, onSelect, options }) => ({
  value,
  onSelect,
  options,
}))(props);

const setup = () => {
  const wrapper = shallow(<AutoComplete {...props} />);
  const selectBox = shallow(<SelectBox {...selectBoxProps} />);
  return {
    props,
    wrapper,
    selectBox,
  };
};

const setupByRender = () => {
  const wrapper = render(<AutoComplete {...props} />);
  const selectBox = render(<SelectBox {...selectBoxProps} />);
  return {
    props,
    wrapper,
    selectBox,
  };
};

const setupByMount = () => {
  const wrapper = mount(<AutoComplete {...props} />);
  const selectBox = mount(<SelectBox {...selectBoxProps} />);
  return {
    props,
    wrapper,
    selectBox,
  };
};

describe('render and initial data test', () => {
  test('renders correctly', () => {
    const tree = renderer.create(<AutoComplete {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  const { wrapper: shallowWrapper, selectBox: shallowSelectBox } = setup();
  const { wrapper, selectBox } = setupByRender();

  test(`should has class 'auto-complete'`, () => {
    expect(shallowWrapper.find('.auto-complete').length).toBe(1);
  });

  test(`should has class "select-box"`, () => {
    expect(shallowSelectBox.find('.select-box').length).toBe(1);
  });

  test('should has Input', () => {
    expect(wrapper.find('input').length).toBe(1);
  });

  test('input value should be props value', () => {
    expect(wrapper.find('input').val()).toBe(props.value);
  });

  const optionsNum = props.options.length;
  test(`should has ${optionsNum} item with class "options"`, () => {
    expect(selectBox.find('.option').length).toBe(optionsNum);
  });

  test('option value is right', () => {
    const isValueRight = props.options.every((item, index) => {
      const option = selectBox.find('.option').eq(index);
      return option.text() === item.value;
    });
    expect(isValueRight).toBe(true);
  });

  test('the option which has the same value with props value should be actived', () => {
    const index = props.options.indexOf(props.value);
    const hasMatchOption = index > -1;
    if (hasMatchOption) {
      const options = selectBox.find('.option').eq(index);
      expect(options.hasClass(ACTIVE_CLASS)).toBe(true);
    } else {
      expect(selectBox.find(ACTIVE_CLASS).length).toBe(0);
    }
  });
});

describe('events test', () => {
  const { wrapper, selectBox } = setupByMount();

  test('input should trigger onSearch', () => {
    wrapper.find('input').at(0).simulate('input');
    expect(props.onSearch).toBeCalled();
  });

  test('change should trigger onSearch', () => {
    wrapper.find('input').at(0).simulate('change');
    expect(props.onChange).toBeCalled();
  });

  test('blur should trigger onBlur', () => {
    wrapper.find('input').at(0).simulate('blur');
    expect(props.onBlur).toBeCalled();
  });

  test('focus should trigger onFocus', () => {
    wrapper.find('input').at(0).simulate('focus');
    expect(props.onFocus).toBeCalled();
  });

  test('option mousedown should trigger onSelect of AutoComplete and SelectBox', () => {
    selectBox.find('.option').at(0).simulate('mousedown');
    expect(selectBoxProps.onSelect).toBeCalled();
    expect(props.onSelect).toBeCalled();
  });
});
