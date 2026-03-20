// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector(".form");

form.addEventListener("submit", onSubmitHandler);

function onSubmitHandler(event) {
    event.preventDefault();
    
    const dataForm = new FormData(form);
    const obj = {
        delay: dataForm.get("delay"),
        state: dataForm.get("state"),
    }
    console.log(obj);

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (obj.state === "fulfilled") {
                resolve(obj.delay);
            } else {
                reject(obj.delay);
            }
        }, obj.delay);
    });

    promise.then(value => {
        iziToast.show({
          title: '✅',
          message: `Fulfilled promise in ${value}ms`
        });
    })
    .catch (error => {
        iziToast.show({
            title: '❌',
            message: `Rejected promise in ${error}ms`
        });
    })

}