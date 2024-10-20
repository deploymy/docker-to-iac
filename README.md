# Docker-to-IaC

A Node.js module to translate Docker Compose files into AWS CloudFormation and more...

## Installation

First, install the module and its dependencies:

```sh
npm i @deploymy/docker-to-iac
```

## Usage

### Translating Docker Compose to AWS CloudFormation

```typescript
import { translate } from '@deploymy/docker-to-iac';
import { readFileSync, writeFileSync } from 'fs';

// Read Docker Compose file content as plain text
const dockerComposeContent = readFileSync('path/to/docker-compose.yml', 'utf8');

const translatedConfig = translate(dockerComposeContent, 'CFN');
console.log(translatedConfig);

// Write the translated config to a file
writeFileSync('output-aws.json', JSON.stringify(translatedConfig, null, 2));
```

## Documentation

Please visit [docs.deploy.my](https://docs.deploy.my/docker-to-iac) to read full documentation.

## License

This project is licensed under the Apache 2.0 License.