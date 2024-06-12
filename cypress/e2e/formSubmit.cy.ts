describe('Form Submission', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('shows errors when fields are empty', () => {
    cy.get('button').contains('Enviar').click();

    cy.get('span')
      .contains('O nome é obrigatório')
      .should('exist');
    cy.get('span')
      .contains('Email inválido')
      .should('exist');
    cy.get('span')
      .contains('A senha deve ser um número de 6 dígitos.')
      .should('exist');
  });

  it('shows error for invalid email', () => {
    cy.get('input[placeholder="Nome"]').type(
      'Ezequiel Teste'
    );
    cy.get('input[placeholder="Email"]').type(
      'invalid-email'
    );
    cy.get('input[placeholder="Senha"]').type('184759');
    cy.get('button').contains('Enviar').click();

    cy.get('span')
      .contains('Email inválido')
      .should('exist');
  });

  it('shows error for invalid password', () => {
    cy.get('input[placeholder="Nome"]').type(
      'Ezequiel Teste'
    );
    cy.get('input[placeholder="Email"]').type(
      'ezequiel@teste.com'
    );
    cy.get('input[placeholder="Senha"]').type('123456');
    cy.get('button').contains('Enviar').click();

    cy.get('span')
      .contains(
        'A senha deve estar entre 184759-856920, conter dígitos adjacentes iguais e nunca diminuir em valor.'
      )
      .should('exist');
  });

  it('submits the form successfully with valid inputs', () => {
    cy.get('input[placeholder="Nome"]').type(
      'Ezequiel Teste'
    );
    cy.get('input[placeholder="Email"]').type(
      'ezequiel@teste.com'
    );
    cy.get('input[placeholder="Senha"]').type('455566');
    cy.get('button').contains('Enviar').click();

    cy.get('span')
      .contains('Resultado enviado com sucesso!')
      .should('exist');
  });
});
