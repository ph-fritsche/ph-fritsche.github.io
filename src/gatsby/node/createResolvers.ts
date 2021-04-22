import { CreateResolversArgs, GatsbyNode } from "gatsby";
import { capitalize } from "../../utils";

export const createResolvers: GatsbyNode['createResolvers'] = async ({
    createResolvers,
}: CreateResolversArgs) => {
    createResolvers({
        Mdx: {
            meta: {
                resolve: (source: GatsbyTypes.Mdx & { parent: GatsbyTypes.File }) => ({
                    date: source.frontmatter?.date,
                    tags: source.frontmatter?.tags ?? [],
                    title: source.frontmatter?.title
                        ?? capitalize(source.parent.name.replace(/-/g, ' ').replace(/_/g, '-')),
                    slug: source.parent.name.replace('/', ''),
                })
            },
        },
    })
}
