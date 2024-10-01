# Docker-to-IaC

A Node.js module to translate Docker Compose files into AWS CloudFormation and more...

## Installation

First, install the module and its dependencies:

```sh
npm install
```

## Usage

### Translating Docker Compose to AWS CloudFormation

```typescript
import { translate } from '@deploymy/docker-to-iac';
import { readFileSync, writeFileSync } from 'fs';

// Read Docker Compose file content as plain text
const dockerComposeContent = readFileSync('path/to/docker-compose.yml', 'utf8');

const translatedConfig = translate(dockerComposeContent, 'CFN', 'yaml');
console.log(translatedConfig);

// Write the translated config to a file
writeFileSync('output-aws.json', JSON.stringify(translatedConfig, null, 2));
```

### Translate API

```javascript
translate(DOCKER_COMPOSE_CONTENT, SUPPORTED_PLATFORMS, TEMPLATE_FORMAT)
```

#### `DOCKER_COMPOSE_CONTENT`

The docker compose content you want to translate.

#### `SUPPORTED_PLATFORMS`

List of supported plattforms.

Currently we support:

- `CFN`: AWS CloudFormation
  - Default output format: `yaml`

#### `TEMPLATE_FORMAT`

The response format, you want to get.

Currently we support:

- `json` - JavaScript Object Notation
- `yaml` - yet another markup language
- `plain` - for plain text

> [!IMPORTANT]  
> For some IaC languages ​​it doesn't make sense to output them in plain, JSON or YAML. For example: CloudFormation only accepts YAML or JSON. So be careful what you choose.

### Retrieving Parser Information

You can retrieve metadata about the available parsers as well:

```typescript
import { getParserInfo } from '@deploymy/docker-to-iac';

const awsInfo = getParserInfo('CFN');
console.log(awsInfo);
```

## Development

### Project Structure

```
docker-to-iac/
|-- .github
|-- dist/
|-- src/
|   |-- index.ts
|   |-- parsers/
|       |-- aws-cloudformation.ts
|       |-- base-parser.ts
|-- test/
|   |-- sample-docker-compose.yml
|   |-- output/
|       |-- README.md
|   |-- test.ts
|-- .gitignore
|-- eslint.config.mjs
|-- LICENSE
|-- README.md
|-- package-lock.json
|-- package.json
|-- release.config.cjs
|-- tsconfig.json
```

### Scripts

- **Build**: Compile TypeScript files to JavaScript.
  ```sh
  npm run build
  ```

- **Lint**: Run the lint script.
  ```sh
  npm run lint
  ```

- **Test**: Run the test script.
  ```sh
  npm run test
  ```

### Testing

The `test/test.ts` script uses `ts-node` to execute the tests. It generates output files in the `test/output/` directory. The `test/output/README.md` file is tracked by Git to ensure the directory exists and its purpose is clear.

### Adding New Parsers

To add a new Infrastructure as Code (IaC) provider, follow these steps:

1. **Create a new parser file** in the `src/parsers/` directory.
  
2. **Extend the `BaseParser` class** and implement the `parse` and `getInfo` methods.

3. **Update the `parsers` array** in `src/index.ts` to include the new parser.

### Example of a New Parser

```typescript
// src/parsers/new-provider.ts
import { BaseParser, ParserInfo, DockerCompose, TemplateFormat, formatResponse } from './base-parser';

class NewProviderParser extends BaseParser {
  parse(dockerCompose: DockerCompose, templateFormat: TemplateFormat): any {
    // chose the default template response format
    if (templateFormat === undefined) templateFormat = TemplateFormat.json;

    let response: any = {};
    // Implement the logic to translate Docker Compose to the new provider's format
    return formatResponse(JSON.stringify(response, null, 2), templateFormat);
  }

  getInfo(): ParserInfo {
    return {
      website: "https://newprovider.com",
      officialDocs: "https://docs.newprovider.com",
      abbreviation: "NP",
      name: "New Provider"
    };
  }
}

export default new NewProviderParser();
```

```typescript
// src/index.ts
import newProviderParserInstance from './parsers/new-provider';

// List of all available parsers
const parsers: BaseParser[] = [
  cloudFormationParserInstance,
  newProviderParserInstance // Add new parsers here
];
```

## License

This project is licensed under the Apache 2.0 License.