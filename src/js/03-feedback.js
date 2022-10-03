import throttle from 'lodash.throttle';
import { save, load, remove } from './storage';

const formRef = document.querySelector('.feedback-form');
const LOCAL_STORAGE_KEY = 'feedback-form-state';

formRef.addEventListener('input', throttle(saveDataHandler, 500));
formRef.addEventListener('submit', submitDataHandler);

function saveDataHandler(event) {
  let formData = load(LOCAL_STORAGE_KEY);
  formData = formData ? formData : {};

  formData[event.target.name] = event.target.value;

  save(LOCAL_STORAGE_KEY, formData);
}

showDataHandler();

function showDataHandler() {
  const formData = load(LOCAL_STORAGE_KEY);
  if (!formData) {
    return;
  }

  Object.entries(formData).forEach(([name, value]) => {
    formRef.elements[name].value = value;
  });
}

function submitDataHandler(event) {
  event.preventDefault();

  const { email, message } = event.currentTarget.elements;

  if (email.value === '' || message.value === '') {
    window.alert('Заповніть всі поля');
  } else {
    console.log({ email: email.value, message: message.value });
    event.currentTarget.reset();
    remove(LOCAL_STORAGE_KEY);
  }
}
