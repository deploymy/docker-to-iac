import { translate, getParserInfo, listAllParsers } from '../src/index';
import { writeFileSync, readFileSync } from 'fs';

const awsInfo = getParserInfo('CFN');
console.log('AWS CloudFormation Info:');
console.log(awsInfo);

// Read the Docker Compose file as plain text
const dockerComposeContent = readFileSync('test/sample-docker-compose.yml', 'utf8');

// Testing AWS CloudFormation
const awsConfig = translate(dockerComposeContent, 'CFN');
console.log('AWS CloudFormation:');
console.log(awsConfig);
writeFileSync('test/output/output-aws.json', JSON.stringify(awsConfig, null, 2));

// List all available parsers
const parsers = listAllParsers();

console.log('Available Parsers:');
console.log(parsers);
