# Central de Triagem

## Descrição
Esta API servirá endpoints para pesquisa e persistência de dados relativos às certidões geradas através da aplicação [frontend](https://github.com/moisesuailab/central-triagem) da Central de Triagem

## Informações da plataforma

 - **Ambiente:** Node

## DER - Modelo Conceitual

![image](https://github.com/moisesuailab/central-triagem-backend/assets/157806024/ba5ad84f-f349-4bf5-af91-5429cf659a2b)

### Rotas

**Usuario**

 - (POST) => /entrar
 - (POST) => /cadastrar-usuario

**Certidao**
- (GET) => /pesquisar-certidao?processo

 ## Tecnologias utilizadas no desenvolvimento do frontend

1. **Linguagens:**
   - Javascript
   - Typescript: Superset do JavaScript para programação robusta.

2. **Ambiente de Desenvolvimento:**
   - NodeJS e NPM para instalação de pacotes.

3. **Framework e Bibliotecas:**
   - Express.

8. **Validações:**
   - Yup: Biblioteca para validação de formulários.

## Guia para executar o projeto localmente

1. **Configurar Ambiente Local:**
   Certifique-se de ter o Node.js e o npm instalados em seu ambiente. Caso não tenha, você pode baixá-los [aqui](https://nodejs.org/).

2. **Clonar o Projeto:**
   Clone este repositório para o diretório desejado em sua máquina.

    ```bash
    git clone https://github.com/moisesuailab/central-triagem-backend.git
    ```

3. **Instalar Dependências:**
   No prompt de comando, navegue até o diretório do projeto e execute o seguinte comando para baixar as dependências necessárias (pasta `node_modules`).

    ```bash
    npm install
    ```

4. **Executar em Ambiente de Desenvolvimento:**
   Utilize o seguinte comando para iniciar o projeto em modo de desenvolvimento:

    ```bash
    npm run dev
    ```

5. **Acessar no Navegador:**
   Abra o navegador da web e digite o link indicado no terminal. Geralmente, o endereço é [http://localhost:3333](http://localhost:3333).
