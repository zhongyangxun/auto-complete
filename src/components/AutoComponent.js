import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SelectBox from './SelectBox';
import { keyCodes } from '../common/config';

const Input = styled.input`
  font-size: 16px;
  padding: 5px 10px;
  width: 100%;
  box-sizing: border-box;
`;

const INIT_PRESELECT_INDEX = -1;
const INIT_ACTIVE_INDEX = -1;

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
  const [preselectIndex, setPreselectIndex] = useState(INIT_PRESELECT_INDEX);
  let activeIndex = INIT_ACTIVE_INDEX;

  useEffect(() => {
    activeIndex = options.findIndex((item) => item.value === _value);
    setPreselectIndex(activeIndex);
  }, [_value]);

  const onSelectBoxSelect = (val) => {
    setValue(val);
    onSelect(_value);
    setSelectBoxOpen(false);
  };

  const onValueUpdate = (event, valueHandler = () => {}) => {
    const { value: val } = event.target;
    valueHandler(val);
  };

  const onInputChange = (val) => {
    onChange(val);
  };

  const onInput = (val) => {
    setSelectBoxOpen(true);
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

  const onInputKeyDown = (e) => {
    const { keyCode } = e;
    const { UP, DOWN, ENTER } = keyCodes;
    const INIT_INDEX = INIT_PRESELECT_INDEX;
    const MAX_INDEX = options.length - 1;
    // The minimum user-available index is 0, though the initial preselect index is -1.
    const MIN_INDEX = 0;

    switch (keyCode) {
      case DOWN: {
        const index =
          preselectIndex === MAX_INDEX ? MIN_INDEX : preselectIndex + 1;
        setPreselectIndex(index);
        break;
      }
      case UP: {
        const index =
          preselectIndex === MIN_INDEX ? MAX_INDEX : preselectIndex - 1;
        setPreselectIndex(index);
        break;
      }
      case ENTER: {
        if (preselectIndex === INIT_INDEX) {
          break;
        }
        const { value: val } = options[preselectIndex];
        setValue(val);
        onSelect(_value);
        setSelectBoxOpen(false);
        break;
      }
      default:
        break;
    }
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
        onKeyDown={(e) => {
          onInputKeyDown(e);
        }}
      />
      {options.length > 0 && selectBoxOpen ? (
        <SelectBox
          value={_value}
          options={options}
          preselectIndex={preselectIndex}
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
