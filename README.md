# Cadastro de Endereço com Consulta por CEP
![html5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![css3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)

Consulta o CEP informado com validação em tempo de digitação. Ao verificar que o valor é válido, será realizado uma busca na API Viacep para o preenchimento automático dos campos retornados pela API.

![](./src/img/formularioDeEndereco.gif)

### Features:
* Validação e máscara do CEP em tempo de digitação;
* Auto preenchimento dos valores retornados da API;
* Verificação de campos vazios com mensagem personalizada;
* Estilização de campos inválidos e válidos;
* Desativação do botão enviar e atívar apenas quando todos os valores obrigatórios forem preenchidos;
* Preparação de um objeto json com todos os dados de endereço;

### Tecnologias:
* HTML
* CSS
* Javascript (Fetch)