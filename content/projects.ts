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
        avatar: 'https://avatars.githubusercontent.com/u/44036562?s=200&v=4',
    },
    {
        name: 'action-dispatch',
        description: 'Dispatch workflow events in Github Workflow',
        avatar: 'https://avatars.githubusercontent.com/u/44036562?s=200&v=4',
    },
    {
        name: 'user-event',
        owner: 'testing-library',
        description: 'Simulate events that would happen in the browser',
        avatar: 'https://raw.githubusercontent.com/testing-library/user-event/master/other/dog.png',
    },
    {
        name: 'liform',
        description: 'Transform Symfony Forms into JSON Schema',
        avatar: 'https://raw.githubusercontent.com/ph-fritsche/liform/master/docs/assets/liform.svg',
    },
    {
        name: 'liform-react-final',
        description: 'Create React forms from Liform JSON Schema based on React Final Form',
        avatar: 'https://raw.githubusercontent.com/ph-fritsche/liform-react-final/master/docs/assets/liform-react-final.svg',
    },
    {
        name: 'liform-material',
        description: 'Material theme for liform-react-final',
        avatar: 'https://raw.githubusercontent.com/ph-fritsche/liform-material/master/docs/assets/liform-material.svg',
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
