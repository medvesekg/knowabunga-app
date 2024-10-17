#!/usr/bin/env node
import "dotenv/config";
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { AwsStack } from "../lib/aws-stack";

const app = new cdk.App();

new AwsStack(app, "KnowabungaApp-dev", { envName: "dev" });

new AwsStack(app, "KnowabungaApp-stage", { envName: "dev" });

new AwsStack(app, "KnowabungaApp-prod", { envName: "prod" });
