
import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { Home } from '.'
import userEvent from '@testing-library/user-event'

const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/posts', async (req, res, ctx) => {
    return res(ctx.json([
      {
        "userId": 1,
        "id": 1,
        "title": "title 1",
        "body": "body1"
      },
      {
        "userId": 2,
        "id": 2,
        "title": "title 2",
        "body": "body1"
      },
      {
        "userId": 3,
        "id": 3,
        "title": "title 3",
        "body": "body1"
      },

    ]))
  })
]

const server = setupServer(...handlers)

describe('<Home/>', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => server.resetHandlers())

  afterAll(() => {
    server.close()
  })

  it('should render search, posts and load more', async () => {
    render(<Home />)
    const noMorePosts = screen.getByText('Não existem posts')

    expect.assertions(3)

    await waitForElementToBeRemoved(noMorePosts)

    const search = screen.getByPlaceholderText(/type your search/i)
    expect(search).toBeInTheDocument()

    const images = screen.getAllByRole('img', { name: /title/i })
    expect(images).toHaveLength(3)

    const button = screen.getByRole('button', { name: /load more posts/i })
    expect(button).toBeInTheDocument()
  })

  it('should search for posts', async () => {
    render(<Home />)
    const noMorePosts = screen.getByText('Não existem posts')

    //expect.assertions(3)

    await waitForElementToBeRemoved(noMorePosts)

    const search = screen.getByPlaceholderText(/type your search/i)

    expect(screen.getByRole('heading', { name: 'title 1 1' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'title 2 2' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'title 3 3' })).toBeInTheDocument()

  })

  it('should load more posts', async () => {
    render(<Home />)
    const noMorePosts = screen.getByText('Não existem posts')

    // expect.assertions(3)

    await waitForElementToBeRemoved(noMorePosts)

    const button = screen.getByRole('button', { name: /load more posts/i })

    userEvent.click(button)

    expect(screen.queryByRole('heading', { name: 'title 3 3' })).toBeInTheDocument()
    expect(button).toBeDisabled()
  })
})
