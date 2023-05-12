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