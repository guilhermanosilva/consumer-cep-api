// Consumer API CEP
const cep = document.querySelector("#cep");

const showData = (data) => {
  for (const field in data) {
    if (document.querySelector("#" + field) && data[field] != "") {
      document.querySelector("#" + field).value = data[field];
    }
  }
};

cep.addEventListener("blur", () => {
  let search = cep.value.replace("-", "");

  fetch(`https://viacep.com.br/ws/${search}/json/`)
    .then((res) => res.json())
    .then((data) => showData(data))
    .catch((e) => console.error("Error: ", e.message));
});

// Form
const fields = document.querySelectorAll("[required]");

const validateField = (field) => {
  function verifyErros() {
    let foundError = false;

    for (const error in field.validity) {
      if (field.validity[error] && !field.validity.valid) {
        foundError = error;
      }
    }
    return foundError;
  }

  function customMessage(message) {
    const spanError = field.parentNode.querySelector("span.error");

    if (message) {
      spanError.classList.add("active");
      spanError.innerHTML = message;
    } else {
      field.style.borderColor = "#8bb9ff";
      spanError.classList.remove("active");
      spanError.innerHTML = "";
    }
  }

  return () => {
    if (verifyErros()) {
      customMessage("Campo obrigatório");
    } else {
      customMessage();
    }
  };
};

const customValidation = (e) => {
  const field = e.target;
  const validation = validateField(field);
  validation();
};

for (field of fields) {
  field.addEventListener("invalid", (e) => {
    e.preventDefault();
    customValidation(e);
  });
  field.addEventListener("blur", customValidation);
}

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const dataToSave = prepareToSave()
  popup(dataToSave)
});

const prepareToSave = () => {  
  const inputs = document.querySelectorAll('input')
  const dataObjectPrepared = {}
  for(let input of inputs){
    let id = input.id
    let value = input.value
    dataObjectPrepared[`${id}`] = value
  }
  return JSON.stringify(dataObjectPrepared)
}

const popup = (data) => {
  const windowPopup = window.open(URL, 'janela', 'width=795, height=590, top=100, left=699, scrollbars=no, status=no, toolbar=no, location=no, menubar=no, resizable=no, fullscreen=no')

  windowPopup.document.write(data)
}