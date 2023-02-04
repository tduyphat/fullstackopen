describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', `localhost:3003/api/testing/reset`)
    const user = {
      name: 'Phat',
      username: 'tduyphat',
      password: '1234'
    }
    cy.request('POST', `localhost:3003/api/users`, user) 
    cy.visit('')
  })

  it('front page can be opened', function() {
    cy.contains('blogs')
    cy.contains('log in to application')
  })
  
  it('user can login', function () {
    cy.get('#username').type('tduyphat')
    cy.get('#password').type('1234')
    cy.get('#login-button').click()

    cy.contains('Phat logged-in')
  })

  it('login fails with wrong password', function() {
    cy.get('#username').type('tduyphat')
    cy.get('#password').type('4321')
    cy.get('#login-button').click()

    cy.get('.error')
    .should('contain', 'wrong username or password')
    .and('have.css', 'color', 'rgb(255, 0, 0)')
    .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Phat logged in')
    cy.contains('Phat logged in').should('not.exist')
  })
})

describe('when logged in', function() {
  beforeEach(function() {
    cy.login({ username: 'tduyphat', password: '1234' })
  })
  
  it('a new blog can be created', function() {
    cy.contains('new blog').click()
    cy.get('#title').type('sussy')
    cy.get('#author').type('imposter')
    cy.get('#url').type('www.amongus.com')
    cy.get('#create-button').click()
    cy.contains('sussy imposter')
  })
  
})