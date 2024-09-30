import { translate, getParserInfo } from '../src/index';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

// Ensure the output directory exists
const outputDir = join(__dirname, 'output');
if (!existsSync(outputDir)) {
  mkdirSync(outputDir);
}

// Retrieve parser information
const awsInfo = getParserInfo('aws-cloudformation');
console.log('AWS CloudFormation Info:');
console.log(awsInfo);

// Testing AWS CloudFormation
const awsConfig = translate(join(__dirname, 'sample-docker-compose.yml'), 'aws-cloudformation');
console.log('AWS CloudFormation:');
console.log(awsConfig);
writeFileSync(join(outputDir, 'aws-cloudformation.json'), JSON.stringify(awsConfig, null, 2));