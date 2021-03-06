import { CreateResolversArgs, GatsbyNode } from 'gatsby';
import { capitalize } from '../../utils';

type GraphQLOutputType = unknown
type FiltersCache = unknown

type sourceMdxNode = Omit<GatsbyTypes.Mdx, 'parent'> & {parent: GatsbyTypes.Scalars['ID']}
type resolverArgs = unknown[]
type nodeType = string & GraphQLOutputType
type pageDependencies = {
    path: string,
    connectionType?: string,
}
type resolverContext = {
    nodeModel: {
        findRootNodeAncestor(
            obj: Record<PropertyKey, unknown> | [],
            predicate?: (node: GatsbyTypes.Node) => boolean
        ): GatsbyTypes.Node
        getAllNodes(
            args: {
                type?: nodeType,
            },
            pageDependencies?: pageDependencies,
        ): GatsbyTypes.Node[]
        getNodeById(
            args: {
                id: GatsbyTypes.Scalars['ID'],
                type?: nodeType,
            },
            pageDependencies?: pageDependencies,
        ): GatsbyTypes.Node | null
        getNodesByIds(
            args: {
                id: GatsbyTypes.Scalars['ID'][],
                type?: nodeType,
            },
            pageDependencies?: pageDependencies,
        ): GatsbyTypes.Node[]
        getTypes(): string[]
        replaceFiltersCache(
            map: undefined | null | FiltersCache
        ): void
        runQuery(
            args: {
                query: {
                    filter?: string,
                    sort?: string,
                },
                type: nodeType,
                firstOnly?: boolean
            },
            pageDependencies?: pageDependencies,
        ): Promise<Node[]>
        trackInlineObjectsInRootNode(
            node: Node,
        ): void
        trackPageDependencies(
            result: Node | Node[],
            pageDependencies?: pageDependencies,
        ): Node | Node[]
    }
}

export const createResolvers: GatsbyNode['createResolvers'] = async ({
    createResolvers,
}: CreateResolversArgs) => {
    createResolvers({
        Mdx: {
            meta: {
                resolve(source: sourceMdxNode, args: resolverArgs[], context: resolverContext) {
                    const date = source.frontmatter?.date
                    const tags = source.frontmatter?.tags ?? []
                    const description = source.frontmatter?.description
                    const image = source.frontmatter?.image

                    const file = context.nodeModel.getNodeById({
                        id: source.parent,
                    }) as GatsbyTypes.File
                    const name = [file.relativeDirectory, file.name].filter(f => f && f !== 'index').join('/')

                    const title = source.frontmatter?.title
                        || capitalize(name.replace(/-/g, ' ').replace(/_/g, '-'))
                    const slug = name.replace(/\/$/, '')

                    return {
                        date,
                        tags,
                        title,
                        slug,
                        description,
                        image,
                    }
                },
            },
        },
    })
}
