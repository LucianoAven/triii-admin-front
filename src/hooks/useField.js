import { useState } from 'react';

const useField = (type, initialValue) => {

  const [value, setValue] = useState(initialValue ? initialValue : '');
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };
  const onSetNewValue = (nameValue) => {
    setValue(nameValue);
  };

  const onError = (errorMsg) => {
    setError(true);
    setHelperText(errorMsg);
  };

  const onSuccess = () => {
    setError(false);
    setHelperText('');
  };

  const resetValue = () => {
    setValue('');
  };

  return {
    actions: { onError, onSuccess, resetValue, onSetNewValue },
    atributes: { error, helperText, type, value, onChange },
  };
};

export default useField;
