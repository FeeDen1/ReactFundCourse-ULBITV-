import React, {useState} from 'react';

const Input = () => {

  const [value,setValue] = useState('Текст в инпуте')
  return (
      <div>
        <h1>{value}</h1>
        <input
            onClick={event => setValue('')}
            onChange={event => setValue(event.target.value)}
            type='text'
            value={value}
        />
      </div>
  );
};

export default Input;