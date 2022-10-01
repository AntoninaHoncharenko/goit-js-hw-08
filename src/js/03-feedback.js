import throttle from 'lodash.throttle';
import { save, load, remove } from './storage';

const formRef = document.querySelector('.feedback-form');
const LOCAL_STORAGE_KEY = 'feedback-form-state';

formRef.addEventListener('input', throttle(saveDataHandler, 500));
formRef.addEventListener('submit', submitDataHandler);

// 1. привести дані до рядка і зберегти значення з форми

// const formData = {};

function saveDataHandler(event) {
  let formData = load(LOCAL_STORAGE_KEY);
  formData = formData ? formData : {};

  formData[event.target.name] = event.target.value;

  //   const stringifyData = JSON.stringify(formData);
  //   localStorage.setItem(LOCAL_STORAGE_KEY, stringifyData);

  save(LOCAL_STORAGE_KEY, formData);
}

// 2. розпарсити збережені дані та вивести у форму

showDataHandler();

function showDataHandler() {
  const formData = load(LOCAL_STORAGE_KEY);

  if (!formData) {
    return;
  }

  //   const parseData = JSON.parse(formData);
  Object.entries(formData).forEach(([name, value]) => {
    formRef.elements[name].value = value;
  });
}

// 3. фідправити форму, очистити форму, очитстити сторедж

function submitDataHandler(event) {
  event.preventDefault();

  const {
    elements: { email, message },
  } = event.currentTarget;

  console.log({
    email: email.value,
    message: message.value,
  });
  //   console.log(formData);

  event.currentTarget.reset();
  //   localStorage.removeItem(LOCAL_STORAGE_KEY);
  remove(LOCAL_STORAGE_KEY);
}
