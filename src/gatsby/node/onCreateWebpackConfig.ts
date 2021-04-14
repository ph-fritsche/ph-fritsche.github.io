import { GatsbyNode } from "gatsby";
import TsPathsPlugin from 'tsconfig-paths-webpack-plugin';

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({actions}) => {
    actions.setWebpackConfig({
        resolve: {
            plugins: [new TsPathsPlugin()],
        },
    })
}
