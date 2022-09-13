import { Bucket, Table } from "@serverless-stack/resources";

export function StorageStack({ stack, app }) {

    // Create a S3 bucket called Uploads
    const bucket = new Bucket(stack, "Uploads", {
        cors: [
            {
              maxAge: "1 day",
              allowedOrigins: ["*"],
              allowedHeaders: ["*"],
              allowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
            },
          ],
    });

    // Create the DynamoDB table
    const table = new Table(stack, "Notes", {
        fields: {
            userId: "string",
            noteId: "string",
        },
        primaryIndex: { partitionKey: "userId", sortKey: "noteId" },
    });
    stack.addOutputs({
        BucketName: bucket.bucketName,
        BucketArn: bucket.bucketArn,
        TableName: table.tableName,
        TableArn: table.tableArn
      });
    return {
        table,
        bucket
    };
}