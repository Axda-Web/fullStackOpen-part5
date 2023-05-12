describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Axda',
      username: 'axda',
      password: 'axda'
    }

    const user2 = {
      name: 'Oly',
      username: 'oly',
      password: 'oly'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user2)
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

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'My first blog with cypress',
          author: 'Axda',
          url: 'http://axda.com/blogs/1',
          likes: 3
        }),
        cy.createBlog({
          title: 'My second blog with cypress',
          author: 'Axda',
          url: 'http://axda.com/blogs/2',
          likes: 2
        }),
        cy.createBlog({
          title: 'My third blog with cypress',
          author: 'Axda',
          url: 'http://axda.com/blogs/3',
          likes: 1
        })
      })

      it('one of those can be liked', function () {
        cy.contains('My third blog with cypress').parent().find('button').as('viewButton')
        cy.get('@viewButton').click()
        cy.get('#like-button').click()
        cy.get('#likes-count').should('contain', '2')
      })

      it('one of those can be deleted', function () {
        cy.contains('My second blog with cypress').parent().find('button').as('viewButton')
        cy.get('@viewButton').click()
        cy.get('#remove-button').click()
        cy.contains('Blog My second blog with cypress deleted')
      })

      it('only the creator can see the delete button of a blog', function () {
        cy.login({ username: 'oly', password: 'oly' })
        cy.contains('My first blog with cypress').parent().find('button').as('viewButton')
        cy.get('@viewButton').click()
        cy.get('#remove-button').should('not.exist')
      })

      it('blogs are ordered according to likes', function () {
        cy.get('.blog').eq(0).should('contain', 'My first blog with cypress')
        cy.get('.blog').eq(1).should('contain', 'My second blog with cypress')
        cy.get('.blog').eq(2).should('contain', 'My third blog with cypress')
      })
    })
  })
})
