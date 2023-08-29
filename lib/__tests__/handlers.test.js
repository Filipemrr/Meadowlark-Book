const handlers = require('../handlers')

//esse teste tenta se certificar que a home page esta sendo renderizada
test('home page renders', () => {
    const req = {}
    const res = { render: jest.fn() }
    handlers.home(req,res)
    expect(res.render.mock.calls[0][0]).toBe('home')
})

test('about page renders with fortunes', () => {
    const req = {} 
    const res = {render: jest.fn()}
    handlers.about(req,res)
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe('about')
    expect(res.render.mock.calls[0][1]).toEqual(
        expect.objectContaining({
            fortune: expect.stringMatching(/\W/),
        }))
})

test('404 handlers renders', () => {
    const req = {}
    const res = { render: jest.fn() }
    handlers.notFound(req,res)
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe('404')
})

test('500 handler renders', () => {
    const err = new Error('some error')
    const req = {}
    const res = { render: jest.fn()}
    const next = jest.fn()
    handlers.serverError(err,req,res,next)
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe('500')
})