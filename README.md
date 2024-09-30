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
import { translate } from 'docker-to-iac';
import { writeFileSync } from 'fs';

const translatedConfig = translate('path/to/docker-compose.yml', 'aws-cloudformation');
console.log(translatedConfig);

// Write the translated config to a file
writeFileSync('output-aws.json', JSON.stringify(translatedConfig, null, 2));
```

### Retrieving Parser Information

You can retrieve metadata about the available parsers as well:

```typescript
import { getParserInfo } from 'docker-to-iac';

const awsInfo = getParserInfo('aws-cloudformation');
console.log(awsInfo);
```

### Supported Platforms

- `aws-cloudformation`

## Development

### Project Structure

```
docker-to-iac/
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
|-- README.md
|-- package.json
|-- tsconfig.json
```

### Scripts

- **Build**: Compile TypeScript files to JavaScript.
  ```sh
  npm run build
  ```

- **Start**: Run the project using `ts-node` (for development).
  ```sh
  npm run start
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

3. **Update the `translate` and `getParserInfo` functions** in `src/index.ts` to include the new parser.

### Example of a New Parser

```typescript
// src/parsers/new-provider.ts
import { BaseParser, ParserInfo } from './base-parser';

class NewProviderParser extends BaseParser {
  parse(dockerCompose: any): any {
    // Implement the logic to translate Docker Compose to the new provider's format
    return {};
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

// Inside translate and getParserInfo functions
case 'new-provider':
  parser = newProviderParserInstance;
  break;
```

## License

This project is licensed under the Apache 2.0 License.