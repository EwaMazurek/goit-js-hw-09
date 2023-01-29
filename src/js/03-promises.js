import Notiflix from 'notiflix';

const form = document.querySelector('form');
//const formObj = form.elements;
const promiseDelay = form.querySelector('[name="delay"]');
const delayStep = form.querySelector('[name="step"]');
const promisesAmount = form.querySelector('[name="amount"]');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  let initialDelay = Number(promiseDelay.value);
  let step = Number(delayStep.value);
  let amount = Number(promisesAmount.value);

  for (let i = 1; i <= amount; i++) {
    createPromise(i, initialDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    initialDelay = initialDelay + step;
  }
});
