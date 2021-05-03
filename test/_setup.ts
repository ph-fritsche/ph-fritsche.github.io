import '@testing-library/jest-dom'
import InterSectionObserverMock from './_mocks/InterSectionObserver'

jest.mock('gatsby', () => ({
    ...jest.requireActual('gatsby'),
    graphql: jest.fn(),
    StaticQuery: jest.fn(),
    useStaticQuery: jest.fn(() => ({})),
}))

global.IntersectionObserver = InterSectionObserverMock

jest.mock('tiny-warning')
