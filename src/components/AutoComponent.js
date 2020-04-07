import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SelectBox from './SelectBox';

const Input = styled.input`
  font-size: 16px;
  padding: 5px 10px;
  width: 100%;
  box-sizing: border-box;
`;

const AutoComplete = ({
  value,
  options,
  onSelect,
  onChange,
  onSearch,
  onFocus,
  onBlur,
}) => {
  const [_value, setValue] = useState(value);
  const [selectBoxOpen, setSelectBoxOpen] = useState(false);

  const onSelectBoxSelect = (val) => {
    setValue(val);
    onSelect(val);
  };

  const onValueUpdate = (event, valueHandler = () => {}) => {
    const { value: val } = event.target;
    valueHandler(val);
  };

  const onInputChange = (val) => {
    onChange(val);
  };

  const onInput = (val) => {
    setValue(val);
    onSearch(val);
  };

  const onInputFocus = () => {
    setSelectBoxOpen(true);
    onFocus();
  };

  const onInputBlur = () => {
    setSelectBoxOpen(false);
    onBlur();
  };

  return (
    <div className="auto-complete">
      <Input
        type="text"
        value={_value}
        onChange={(event) => {
          onValueUpdate(event, onInputChange);
        }}
        onInput={(event) => {
          onValueUpdate(event, onInput);
        }}
        onFocus={(event) => {
          onValueUpdate(event, onInputFocus);
        }}
        onBlur={() => {
          onInputBlur();
        }}
      />
      {options.length > 0 && selectBoxOpen ? (
        <SelectBox
          value={_value}
          options={options}
          onSelect={(val) => {
            onSelectBoxSelect(val);
          }}
        />
      ) : null}
    </div>
  );
};

const funcType = PropTypes.func;
AutoComplete.propTypes = {
  value: PropTypes.string,
  options: PropTypes.array,
  onSelect: funcType,
  onChange: funcType,
  onSearch: funcType,
  onFocus: funcType,
  onBlur: funcType,
};

const defaultEmptyFunc = () => {};
AutoComplete.defaultProps = {
  value: '',
  options: [],
  onSelect: defaultEmptyFunc,
  onChange: defaultEmptyFunc,
  onSearch: defaultEmptyFunc,
  onBlur: defaultEmptyFunc,
  onFocus: defaultEmptyFunc,
};

export default AutoComplete;
