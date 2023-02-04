import { React } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { userEvent, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import Togglable from './Togglable'

describe('blog list test', () => {
    let container, mockUpdate, mockDelete
    
    beforeEach(() => {
      const blog = {
        title: 'test blog',
        author: 'dummy author',
        url: 'www.link.com',
        likes: 49,
        user: {
          username: 'tduyphat'
        }
      }
      const user = {
        username: 'tduyphat',
        name:'Phat'
      }
      mockUpdate = jest.fn()
      mockDelete = jest.fn()
      container = render(
        <Togglable buttonLabel='show....' cancelLabel='cancel'>
          <Blog blog={blog} updateLikes={mockUpdate} remove={mockDelete} user={user}/>
        </Togglable>
      )
    })
  
    test('It shows title and author by default', () => {
      const check = container.getByText('test blog dummy author')
      expect(check).toBeDefined()
    })
  
    test('It shows url and likes when clicked', () => {
      const show = container.getByText('show....')
      userEvent.click(show)
      const toggler = container.container.querySelector('.togglableContent')
      expect(toggler).toHaveTextContent('www.link.com')
      expect(toggler).toHaveTextContent('49')
    })
  
    test('like button clicked twice', () => {
      const show = container.getByText('show....')
      userEvent.click(show)
      const likeButton = container.getByText('like')
      fireEvent.click(likeButton)
      fireEvent.click(likeButton)
      expect(mockUpdate.mock.calls).toHaveLength(2)
    })
  })