import fs from 'fs'
import path from 'path'
import { CreateSchemaCustomizationArgs, GatsbyNode } from 'gatsby';

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = async ({
    actions,
}: CreateSchemaCustomizationArgs) => {
    // There is probably a way to programmatically restart gatsby develop per Emitter API on changes to schema.gql.

    actions.createTypes(
        String(fs.readFileSync(path.resolve(__dirname, './schema.gql'))),
    )
}
