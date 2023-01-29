import { React } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

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

test('renders content', () => {

  render(<Blog blog={blog} user={user}/>)
  
  const element = screen.getByText('test blog dummy author')
  
  screen.debug(element)

  expect(element).toBeDefined()
})

test('clicking the button calls event handler once', async () => {
  const mockHandler = jest.fn()
  
  render(
    <Blog blog={blog} user={user} updateLikes={mockHandler} />
  )
  
  const userAction = userEvent.setup()
  const button = screen.getByText('like')
  await userAction.click(button)
  
  expect(mockHandler.mock.calls).toHaveLength(1)
})

describe('<Togglable />', () => {
  let container

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv" >
          togglable content
        </div>
      </Togglable>
    ).container
  })

  test('renders its children', async () => {
    await screen.findAllByText('togglable content')
  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', async () => {
    const userAction = userEvent.setup()
    const button = screen.getByText('show...')
    await userAction.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })
  test('toggled content can be closed', async () => {
    const userAction = userEvent.setup()
    const button = screen.getByText('show...')
    await userAction.click(button)

    const closeButton = screen.getByText('cancel')
    await userAction.click(closeButton)

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })
})

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const userAction = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const input = screen.getByPlaceholderText('A walk in the park')
  const createButton = screen.getByText('create')

  await userAction.type(input, 'testing a form...')
  await userAction.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
})

