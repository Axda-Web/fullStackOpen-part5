describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Axda',
      username: 'axda',
      password: 'axda'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username-input').type('axda')
      cy.get('#password-input').type('axda')
      cy.get('#login-button').click()

      cy.contains('axda logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username-input').type('axda')
      cy.get('#password-input').type('wrongpassword')
      cy.get('#login-button').click()

      cy.get('.notification--error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'axda logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'axda', password: 'axda' })
    })

    it('A blog can be created', function() {
      cy.createBlog({
        title: 'My first blog with cypress',
        author: 'Axda',
        url: 'http://axda.com/blogs/1'
      })
      cy.contains('My first blog with cypress')
    })
  })
})