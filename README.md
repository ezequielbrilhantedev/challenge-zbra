# Validador de Senhas

Este é um projeto Next.js que implementa um formulário para validar senhas. O formulário verifica se a senha está dentro de um intervalo específico, se contém dígitos adjacentes iguais e se os dígitos nunca diminuem em valor.

# Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [React Hook Form](https://react-hook-form.com/) e [Zod](https://github.com/colinhacks/zod) para validação e controle do formulário.
- [Cypress](https://www.cypress.io/) para testes end-to-end

## Funcionalidades

- Validação de formulário com React Hook Form e Zod.
- Mensagens de erro específicas para campos inválidos.
- Envio de dados para um endpoint de API simulado.
- Exibição de mensagem de sucesso ou erro após o envio do formulário.

## Pré-requisitos

Antes de começar, certifique-se de ter o Node.js instalado. Recomenda-se utilizar a versão LTS.

## Instalação

1. Clone o repositório: `git clone https://github.com/ezequielbrilhantedev/challenge-zbra`
2. cd challenge-zbra
3. Instale as dependências: `npm install`

## Uso

Para iniciar o servidor de desenvolvimento:
`npm run dev`
Abra http://localhost:3000 no seu navegador para ver a aplicação em execução.

## Testes

Este projeto utiliza Cypress para testes end-to-end.
**Executar Cypress**

1.  Abra o Cypress:
    `npm run cy:open`
2.  No Cypress Test Runner, selecione o arquivo de teste `formSubmit.cy.ts` para executar os testes.

# Contato

Para mais informações, entre em contato pelo email: ezequielbrilhante.dev@gmail.com ou ezequielrb7@gmai.com

# Telas

## Desktop

![Tela em tamanho desktop](/public/image/desktop-image.png)

## Mobile

![Tela em tamanho mobile](/public/image/mobile-image.png)
