# @zhongyangxun/z-auto-complete

A `auto-complete` component for react.

## Qucik Start

### installation

```shell
yarn add @zhongyangxun/z-auto-complete
```

### Usage

```javascript
import React from 'react'
import AutoComplete from "@zhongyangxun/z-auto-complete";

const onSelect = () => {
  console.log('select');
}

const onChange = () => {
  console.log('change');
}

const App = () => {
  const options = [
    {
      value: 'a',
    },
    {
      value: 'b',
    }
  ];

  return (
    <div className="app">
      <AutoComplete
        onChange={onChange}
        onSelect={onSelect}
        options={options}
      />
    </div>
  );
}

export default App;
```

## Document

### options

#### value

The initial value of the `auto-complete`.

#### options

The drop down select list.

#### onSelect

Callback of the drop down select list selected.

#### onChange

Callback of `change` event.

#### onSearch

Callback of  `input` event.

####  onFocus

Callback of `focus` event.

#### onBlur

Callback of `blur` event.



