import '@testing-library/jest-dom'
import InterSectionObserverMock from './_mocks/InterSectionObserver'

jest.mock('gatsby', () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...jest.requireActual<any>('gatsby'),
    graphql: jest.fn(),
    StaticQuery: jest.fn(),
    useStaticQuery: jest.fn(() => ({})),
} as unknown))

global.IntersectionObserver = InterSectionObserverMock
