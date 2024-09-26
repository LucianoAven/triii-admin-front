export function emailInputControl(email) {
  const emailRegEx =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  return emailRegEx.test(email);
}

export function passwordInputControl(password) {
  return password.length > 7;
}

export function verificationCodeControl(code) {
  return code.length === 6 && typeof Number(code) === 'number';
}

export function nameInputControl(name) {
  return name.length > 3;
}

// Function to validate workspace subdomain name
//Regex starts with letter, contains only lowercase letters, numbers, has a minimum of 3 characters and a maximum of 50 characters
export function spaceSubdomainNameControl(name) {
  const workspaceNameRegEx = /^[a-z][a-z0-9]{2,49}$/;

  return workspaceNameRegEx.test(name);
}

export function spaceNameControl(name) {
  return name.length >= 3 && name.length <= 50;
}
