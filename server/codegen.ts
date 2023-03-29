import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: './src/core/schema.ts',
    generates: {
        './resolvers-types.ts': {
            plugins: ['typescript', 'typescript-resolvers'],
        },
    },
};
export default config;
