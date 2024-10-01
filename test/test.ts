import { translate, getParserInfo, listAllParsers } from '../src/index';
import { writeFileSync } from 'fs';

const awsInfo = getParserInfo('CFN');
console.log('AWS CloudFormation Info:');
console.log(awsInfo);

// Testing AWS CloudFormation
const awsConfig = translate('test/sample-docker-compose.yml', 'CFN');
console.log('AWS CloudFormation:');
console.log(awsConfig);
writeFileSync('test/output/output-aws.json', JSON.stringify(awsConfig, null, 2));

// List all available parsers
const parsers = listAllParsers();
console.log('Available Parsers:');
console.log(parsers);
