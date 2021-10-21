import ActionRelease from './icons/action-release.svg'
import ActionDispatch from './icons/action-dispatch.svg'
import LiformMaterial from './icons/liform-material.svg'
import LiformReactFinal from './icons/liform-react-final.svg'
import Liform from './icons/liform.svg'
import Adr from './icons/symfony-adr.svg'
import PitchForm from './icons/symfony-form.svg'

const projects: {
    name: string,
    owner?: string,
    repo?: string,
    description: string,
    avatar: string,
    media?: string,
}[] = [
    {
        name: 'action-release',
        description: 'Conveniently create releases in your Github Workflow per Semantic Release',
        avatar: ActionRelease,
    },
    {
        name: 'action-dispatch',
        description: 'Dispatch workflow events in Github Workflow',
        avatar: ActionDispatch,
    },
    {
        name: '@testing-library/user-event',
        owner: 'testing-library',
        repo: 'https://github.com/testing-library/user-event',
        description: 'Simulate events that would happen in the browser',
        avatar: 'https://raw.githubusercontent.com/testing-library/user-event/master/other/dog.png',
    },
    {
        name: 'pitch/liform',
        repo: 'https://github.com/ph-fritsche/liform',
        description: 'Transform Symfony Forms into JSON Schema',
        avatar: Liform,
    },
    {
        name: 'liform-react-final',
        description: 'Create React forms from Liform JSON Schema based on React Final Form',
        avatar: LiformReactFinal,
    },
    {
        name: 'liform-material',
        description: 'Material theme for liform-react-final',
        avatar: LiformMaterial,
    },
    {
        name: 'pitch/symfony-adr',
        repo: 'https://github.com/ph-fritsche/symfony-adr',
        description: 'Write Symfony applications in ADR pattern',
        avatar: Adr,
    },
    {
        name: 'pitch/form',
        repo: 'https://github.com/ph-fritsche/symfony-form',
        description: 'Move input validation out of Symfony Controllers',
        avatar: PitchForm,
    },
]

export default projects.map(({
    name,
    owner = 'ph-fritsche',
    repo = `https://github.com/${owner}/${name}`,
    description,
    avatar,
    media,
}) => ({
    name,
    owner,
    repo: new URL(repo),
    description,
    avatar,
    media,
}))
