# Docker-to-IaC

A Node.js module to translate Docker Compose file into AWS CloudFormation and another IaC templates.

## Installation

```sh
npm install docker-to-iac
```

## Usage

```javascript
const dockerToIac = require('docker-to-iac');

const translatedConfig = dockerToIac.translate('path/to/docker-compose.yml', 'aws-cloudformation');
console.log(translatedConfig);
```

