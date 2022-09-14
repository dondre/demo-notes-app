import { Api, use } from "@serverless-stack/resources";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack, app }) {
    const { table } = use(StorageStack);
    // Create the API
    const api = new Api(stack, "Api", {
        defaults: {
            authorizer: "iam",
            function: {
                permissions: [table],
                environment: {
                    TABLE_NAME: table.tableName,
                    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
                },
            },
        },
        routes: {
            "POST /gifts": "functions/create.main",
            "GET /gifts/{id}": "functions/get.main",
            "GET /gifts": "functions/list.main",
            "PUT /gifts/{id}": "functions/update.main",
            "DELETE /gifts/{id}": "functions/delete.main",
            "POST /billing": "functions/billing.main",
        },
    });
    stack.addOutputs({
        ApiEndpoint: api.url,
    });
    return {
        api,
    };
}