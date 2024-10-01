import { translate, getParserInfo, listAllParsers } from '../src/index';
import { TemplateFormat } from '../src/parsers/base-parser';
import { writeFileSync, readFileSync } from 'fs';

const awsInfo = getParserInfo('CFN');
console.log('AWS CloudFormation Info:');
console.log(awsInfo);

// Read the Docker Compose file as plain text
const dockerComposeContent = readFileSync('test/sample-docker-compose.yml', 'utf8');

// Testing AWS CloudFormation Plain
const awsConfigPlain = translate(dockerComposeContent, 'CFN', TemplateFormat.plain);
console.log(`AWS CloudFormation ${TemplateFormat.plain}:`);
console.log(awsConfigPlain);
writeFileSync(`test/output/output-aws-${TemplateFormat.plain}.txt`, awsConfigPlain);

// Testing AWS CloudFormation JSON
const awsConfigJson = translate(dockerComposeContent, 'CFN', TemplateFormat.json);
console.log(`AWS CloudFormation ${TemplateFormat.json}:`);
console.log(awsConfigJson);
writeFileSync(`test/output/output-aws-${TemplateFormat.json}.json`, JSON.stringify(awsConfigJson, null, 2));

// Testing AWS CloudFormation YAML
const awsConfigYaml = translate(dockerComposeContent, 'CFN', TemplateFormat.yaml);
console.log(`AWS CloudFormation ${TemplateFormat.yaml}:`);
console.log(awsConfigYaml);
writeFileSync(`test/output/output-aws-${TemplateFormat.yaml}.yml`, awsConfigYaml);

// List all available parsers
const parsers = listAllParsers();

console.log('Available Parsers:');
console.log(parsers);
