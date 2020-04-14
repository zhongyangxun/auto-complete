import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const ACTIVE_CLASS = 'active';
export const PRESELECT_CLASS = 'preselect';
const OptionItem = styled.div`
  padding: 5px 10px;

  &:hover,
  &.${PRESELECT_CLASS} {
    background-color: #eee;
  }

  &.${ACTIVE_CLASS} {
    background-color: #e6f7ff;
  }
`;

const OptionsWrapper = styled.div`
  border: solid #fff;
  border-width: 4px 0;
  box-shadow: 0 9px 28px 8px rgba(0, 0, 0, 0.15);
`;

const SelectBox = ({ options, onSelect, value, preselectIndex }) => {
  const onOptionSelect = (itemValue) => {
    onSelect(itemValue);
  };

  return (
    <div className="select-box">
      <OptionsWrapper>
        {options.map((item, index) => {
          const { value: itemValue } = item;
          const activeClass = itemValue === value ? ACTIVE_CLASS : '';
          const preSelectClass =
            preselectIndex === index ? PRESELECT_CLASS : '';

          return (
            <OptionItem
              onMouseDown={() => {
                onOptionSelect(itemValue);
              }}
              className={`option ${activeClass} ${preSelectClass}`}
              key={index}
            >
              {itemValue}
            </OptionItem>
          );
        })}
      </OptionsWrapper>
    </div>
  );
};

SelectBox.propTypes = {
  options: PropTypes.array,
  onSelect: PropTypes.func,
  value: PropTypes.string,
  preselectIndex: PropTypes.number,
};

SelectBox.defaultProps = {
  options: [],
  onSelect: () => {},
  value: '',
  preselectIndex: -1,
};

export default SelectBox;
