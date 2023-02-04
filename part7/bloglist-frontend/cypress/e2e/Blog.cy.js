describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user1 = {
        name: 'Phat',
        username: 'tduyphat',
        password: '1234'
      }
      const user2 = {
        name: 'Hank',
        username: 'hankschradder',
        password: 'minerals'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user1)
      cy.request('POST', 'http://localhost:3003/api/users/', user2)
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
        cy.contains('blogs')
        cy.contains('log in to application')
        cy.contains('username')
        cy.get('#username')
        cy.contains('password')
        cy.get('#password')
        cy.get('#login-button')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('tduyphat')
            cy.get('#password').type('1234')
            cy.get('#login-button').click()
        
            cy.contains('Phat logged-in')
        })
    
        it('fails with wrong credentials', function() {
            cy.get('#username').type('tduyphat')
            cy.get('#password').type('wrongpassword')
            cy.get('#login-button').click()

            cy.get('.error').contains('wrong username or password')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
          cy.login({ username: 'tduyphat', password: '1234' })
          cy.createBlog({title:"TLOU", author:"Neil", url:"www.tlou.com"})
          cy.createBlog({title:"Bioshock", author:"Kevin", url:"www.bioshock.com"})
          cy.get('#logout-button').click()
          cy.login({ username: 'hankschradder', password: 'minerals'})
          cy.createBlog({title:"Uncharted", author:"Nein", url:"www.uncharted.com"})
          cy.createBlog({title:"F&F", author:"Dom", url:"www.f&f.com"})
        })
    
        it('A blog can be created', function() {
          cy.contains('new blog').click()
          cy.get('#title').type('sussy')
          cy.get('#author').type('imposter')
          cy.get('#url').type('www.amongus.com')
          cy.get('#create-button').click()
          cy.contains('sussy imposter')
        })

        it('User can like a blog', () => {
          cy.contains('TLOU Neil').contains('show').click()
          cy.contains('TLOU Neil').contains('like').click()
          cy.contains('TLOU').contains('1')
        })

        it('User can delete its blog', () => {
            cy.contains('Uncharted Nein').contains('show').click()
            cy.contains('Uncharted Nein').contains('remove').click()
            cy.get('html').should('not.contain', 'Uncharted Nein')
        })

        it('other users but the creator do not see the delete button', () => {
            cy.get('#logout-button').click()
            cy.login({
              username: 'hankschradder',
              password: 'minerals'
            })
            cy.contains('TLOU Neil').contains('show').click()
            cy.contains('TLOU Neil').should('not.contain', 'remove')
        })
        it('Blogs are ordered in likes', () => {

          cy.get('.blog').then(blogs => {
            cy.contains('TLOU Neil').contains('show').click()
            cy.contains('TLOU Neil').contains('like').click()
            cy.contains('Bioshock Kevin').contains('show').click()
            cy.contains('Bioshock Kevin').contains('like').click()
            cy.contains('Bioshock Kevin').contains('like').click()
            cy.contains('Uncharted Nein').contains('show').click()
            cy.contains('Uncharted Nein').contains('like').click()
            cy.contains('Uncharted Nein').contains('like').click()
            cy.contains('Uncharted Nein').contains('like').click()
            cy.contains('F&F Dom').contains('show').click()
            cy.contains('F&F Dom').contains('like').click()
            cy.contains('F&F Dom').contains('like').click()
            cy.contains('F&F Dom').contains('like').click()
            cy.contains('F&F Dom').contains('like').click()

            cy.wrap(blogs[0]).contains('1')
            cy.wrap(blogs[1]).contains('2')
            cy.wrap(blogs[2]).contains('3')
            cy.wrap(blogs[3]).contains('4')
          })
      })
      })
  })