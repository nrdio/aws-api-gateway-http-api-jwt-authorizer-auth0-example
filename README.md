# Example project demonstrating usage of Serverless framework for creating a CRUD Rest API using API gateway, Lambda with Node.js 8.10 runtime and Dynamodb for persistence

Serverless framework provides consistent packaging and deployment experience across cloud providers. It provides an abstraction on top of cloud vendor settings and configurations. This makes it easier to focus on actual functions instead of cloud specific configurations, packaging and deployments. Under the hood serverless framework uses cloudformation for creating stack on AWS.          

This example demonstrates uses of AWS API Gateway HTTP API and JWT Authorizer for securing REST API using JWT Token.   

Serverless Framework will spin up CloudFormation stack comprising of -

   * API Gateway HTTP API
   * JWT Authorizer
   * DynamoDB Table
   * Node.js 12.x Lambda functions for CRUD operations on Account  
   * IAM Roles and Policies


This example project can be used as template to - 
   * Create CRUD REST API With DynamoDB as Database
   * Expose API with API Gateway HTTP API
   * Secure API Using JWT Authorizer and Auth0

## How to run?

Prerequisite : 

### [Auth0 Account](https://auth0.com/signup)
  * Create an [API](https://manage.auth0.com/dashboard/us/nrdio/apis) from Auth0 dashboard
  * You can provide any name and identifer. Note API identifier. It will be used as audience  
  * Use RS256 Algorithm
  * Copy JWT Token from Test section of newly created API
  * Replace 'issuerURL' and 'audience' in [serverless.yml](serverless.yml) with Auth0 Issuer URL(account base URL) and API identifer 

   

### [AWS account](https://aws.amazon.com/) and [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/installing.html)

### [Serverless Framework](https://www.serverless.com/)
Install Serverless Framework - 

```
npm install -g serverless 
```

Initial setup - 

```
serverless 
```

Make sure that you replaced issuerURL and audience in [serverless.yml](serverless.yml) with Auth0 issuer URL and API identifier

After that create a package and cloudformation stack using following command

```
serverless deploy

Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service serverless-api-lambda-dynamodb-example.zip file to S3 (8.64 MB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
..............................................
Serverless: Stack update finished...
Service Information
service: serverless-api-lambda-dynamodb-example
stage: dev
region: us-west-2
stack: serverless-api-lambda-dynamodb-example-dev
resources: 37
api keys:
  None
endpoints:
  POST - https://68efg0jnn6.execute-api.us-west-2.amazonaws.com/accounts
  GET - https://68efg0jnn6.execute-api.us-west-2.amazonaws.com/accounts/{id+}
  GET - https://68efg0jnn6.execute-api.us-west-2.amazonaws.com/accounts
  PUT - https://68efg0jnn6.execute-api.us-west-2.amazonaws.com/accounts/{id+}
  DELETE - https://68efg0jnn6.execute-api.us-west-2.amazonaws.com/accounts/{id+}
functions:
  createAccount: serverless-api-lambda-dynamodb-example-dev-createAccount
  getAccount: serverless-api-lambda-dynamodb-example-dev-getAccount
  getAccounts: serverless-api-lambda-dynamodb-example-dev-getAccounts
  updateAccounts: serverless-api-lambda-dynamodb-example-dev-updateAccounts
  deleteAccount: serverless-api-lambda-dynamodb-example-dev-deleteAccount
layers:
  None
```

## Test

Test the endpoints using following curl commands

Create Account - 

```
curl --location --request POST 'https://e5atxwgxtk.execute-api.us-west-2.amazonaws.com/accounts' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <JWT Token from Auth0>' \
--data-raw '{
        "name":"Foo",
        "iban":"NL25ABNA0435472493"
}'


HTTP/2 201 
content-type: application/json
content-length: 128
date: Mon, 21 May 2018 19:37:38 GMT
x-amzn-requestid: 6ac40494-5d2e-11e8-8b67-718f823c1ffb
x-amz-apigw-id: HQHwPFayPHcFccQ=
x-amzn-trace-id: Root=1-5b032001-f509e6d2538974637bc5ebae
x-cache: Miss from cloudfront
via: 1.1 a459bf9dec7bba4e0a329e8ab2ebd928.cloudfront.net (CloudFront)
x-amz-cf-id: kL3IMgzi4EwmRdQOCZ7fJUyaJKv8fqF3Xju-0MaJes6UgKTwwO0YIw==

{"id":"6b480180-5d2e-11e8-9275-39f4e1e8b11f","name":"Foo","iban":"NL25ABNA0435472492","createdAt":1526931458456,"updatedAt":1526931458456}
```

Get Account -

```
curl --location --request GET 'https://e5atxwgxtk.execute-api.us-west-2.amazonaws.com/accounts/6b480180-5d2e-11e8-9275-39f4e1e8b11f' \
--header 'Authorization: Bearer <JWT Token from Auth0>'

  
HTTP/2 200 
content-type: application/json
content-length: 128
date: Mon, 21 May 2018 19:42:33 GMT
x-amzn-requestid: 1a7b8a28-5d2f-11e8-ace2-3932708348fd
x-amz-apigw-id: HQIeTGmXvHcF5wg=
x-amzn-trace-id: Root=1-5b032128-bbcf64f5c4982abd6f346b31
x-cache: Miss from cloudfront
via: 1.1 9ece10f886f26459a29d505f7dc15d23.cloudfront.net (CloudFront)
x-amz-cf-id: iNDcWZXuJHr02GStW0rUpS9Qrjnq_SI_MV_pmFgWDYKGq_Ygk1J7eg==

{"id":"6b480180-5d2e-11e8-9275-39f4e1e8b11f","name":"Foo","iban":"NL25ABNA0435472492","createdAt":1526931458456,"updatedAt":1526931458456}
```

Update Account -

```
curl --location --request PUT 'https://e5atxwgxtk.execute-api.us-west-2.amazonaws.com/accounts' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <JWT Token from Auth0>' \
--data-raw '{
        "name":"Bar",
        "iban":"NL25ABNA0435472493"
}'

HTTP/2 200 
content-type: application/json
content-length: 0
date: Mon, 21 May 2018 19:43:20 GMT
x-amzn-requestid: 36d8e4cc-5d2f-11e8-bdd8-83a00846daaf
x-amz-apigw-id: HQIlvGWuvHcFZ0A=
x-amzn-trace-id: Root=1-5b032157-fa9d45eda83d906634f26893
x-cache: Miss from cloudfront
via: 1.1 ce2b03db99d40501c5695fce9dfbb777.cloudfront.net (CloudFront)
x-amz-cf-id: VGNK0CozL3ipCbGWxsrGZjmArmt_pF9FmOutyCPpwbEp8I0h5uYKIQ==
```

Get Accounts -

```
curl --location --request GET 'https://e5atxwgxtk.execute-api.us-west-2.amazonaws.com/accounts' \
--header 'Authorization: Bearer <JWT Token from Auth0>'


HTTP/2 200
content-type: application/json
content-length: 130
date: Mon, 21 May 2018 19:44:46 GMT
x-amzn-requestid: 69a5f4e4-5d2f-11e8-9194-b13541233785
x-amz-apigw-id: HQIzEHgCPHcFbIQ=
x-amzn-trace-id: Root=1-5b0321ad-c1cc417235030daa049d978f
x-cache: Miss from cloudfront
via: 1.1 4edcf55d6938e557aa2c6e71997d17b4.cloudfront.net (CloudFront)
x-amz-cf-id: XfB58gtI2DtRyWp2c5Qxk3bXg8ympTJyv3MaEH1BN_y8pCDOxs588Q==

[{"iban":"NL25ABNA0435472492","createdAt":1526931458456,"id":"6b480180-5d2e-11e8-9275-39f4e1e8b11f","name":"Bar","updatedAt":1526931800589}]
```

Delete Account -

```
curl --location --request DELETE 'https://e5atxwgxtk.execute-api.us-west-2.amazonaws.com/accounts/36c03610-aaf4-11ea-8bd5-2bb3644c9f9a' \
--header 'Authorization: Bearer <JWT Token from Auth0>'
 
HTTP/2 200 
content-type: application/json
content-length: 0
date: Mon, 21 May 2018 19:45:35 GMT
x-amzn-requestid: 87718603-5d2f-11e8-8513-ffa125d6edb3
x-amz-apigw-id: HQI64FymvHcFwWw=
x-amzn-trace-id: Root=1-5b0321df-b021dddac58e20662121f796
x-cache: Miss from cloudfront
via: 1.1 c035b03e455c334ee837503784ad41c8.cloudfront.net (CloudFront)
x-amz-cf-id: KX1uEWob2gImG_KZVQzJZm1mi0lKHM5Aa0c5NvtvJi-rl9jOGxh4tg==
```


Finally you can delete the stack using following command - 

```
serverless remove
         
Serverless: Getting all objects in S3 bucket...
Serverless: Removing objects in S3 bucket...
Serverless: Removing Stack...
Serverless: Checking Stack removal progress...
......................................................................
Serverless: Stack removal finished...
``` 
