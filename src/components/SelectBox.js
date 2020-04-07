import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const ACTIVE_CLASS = 'active';
const OptionItem = styled.div`
  padding: 5px 10px;

  &:hover {
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

const SelectBox = ({ options, onSelect, value }) => {
  const onOptionSelect = (itemValue) => {
    onSelect(itemValue);
  };

  return (
    <div className="select-box">
      <OptionsWrapper>
        {options.map((item, index) => {
          const { value: itemValue } = item;
          const activeClass = itemValue === value ? ACTIVE_CLASS : '';

          return (
            <OptionItem
              onMouseDown={() => {
                onOptionSelect(itemValue);
              }}
              className={`option ${activeClass}`}
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
};

SelectBox.defaultProps = {
  options: [],
  onSelect: () => {},
  value: '',
};

export default SelectBox;
