// Consumer API CEP
const cep = document.querySelector("#cep");

const showData = (data) => {
  for (const field in data) {
    let inputField = document.querySelector("#" + field);
    if (inputField && data[field] != "") {
      inputField.value = data[field];
      validateField(inputField)();
    }
  }
  verifyIfEnableSubmitButton();
};

cep.addEventListener("keyup", () => {
  if (cep.value.length == 5) {
    cep.value += "-";
  }
  
  let numberRegex = /[0-9]{5}\-[0-9]{3}/;
  if (numberRegex.test(cep.value)) {
    searchCep();
  }
});

const searchCep = () => {
  let search = cep.value.replace("-", "");

  fetch(`https://viacep.com.br/ws/${search}/json/`)
    .then((res) => res.json())
    .then((data) => {
      showData(data);
    })
    .catch((e) => console.error("Error: ", e.message));
};

// Form
const customValidation = (e) => {
  const field = e.target;
  const validation = validateField(field);
  validation();
  verifyIfEnableSubmitButton();
};

const verifyIfEnableSubmitButton = () => {
  if (hasEmptyInput() == false) {
    document.querySelector(".button").disabled = false;
  } else {
    document.querySelector(".button").disabled = true;
  }
};

const hasEmptyInput = () => {
  for (element of fields) {
    if (element.value == "") {
      return true;
    }
  }
  return false;
};

const fields = document.querySelectorAll("[required]");
for (let field of fields) {
  field.addEventListener("blur", customValidation);
  field.addEventListener('keyup', verifyIfEnableSubmitButton)
}

const validateField = (field) => {
  function verifyErros() {
    let foundError = false;
    for (let error in field.validity) {
      if (field.validity[error] && !field.validity.valid) {
        foundError = error;
      }
    }
    return foundError;
  }

  function customMessage(message) {
    const spanError = field.parentNode.querySelector("span.error");
    if (message && !field.value) {
      field.style.borderColor = "#ef476f";
      spanError.classList.add("active");
      spanError.innerHTML = message;
    } else {
      field.style.borderColor = "#06d6a0";
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

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const dataToSave = prepareToSave();
  popup(dataToSave);
});

const prepareToSave = () => {
  const inputs = document.querySelectorAll("input");
  const dataObjectPrepared = {};
  for (let input of inputs) {
    let id = input.id;
    let value = input.value;
    dataObjectPrepared[`${id}`] = value;
  }
  return JSON.stringify(dataObjectPrepared);
};

const popup = (data) => {
  const windowPopup = window.open(
    URL,
    "janela",
    "width=500, height=300, top=200, left=400, scrollbars=no, status=no, toolbar=no, location=no, menubar=no, resizable=no, fullscreen=no"
  );

  windowPopup.document.write(data);
};
