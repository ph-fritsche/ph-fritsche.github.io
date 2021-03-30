import '@testing-library/jest-dom'

jest.mock('gatsby', () => ({
    ...jest.requireActual('gatsby'),
    graphql: jest.fn(),
    StaticQuery: jest.fn(),
    useStaticQuery: jest.fn(() => ({})),
}))
