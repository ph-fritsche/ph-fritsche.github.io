module.exports = require('babel-jest').default.createTransformer({
    presets: [
        'babel-preset-gatsby',
        '@babel/preset-typescript',
    ],
})
