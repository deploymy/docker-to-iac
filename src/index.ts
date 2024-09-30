import * as fs from 'fs';
import * as yaml from 'js-yaml';
import cloudFormationParserInstance from './parsers/aws-cloudformation';
import { BaseParser } from './parsers/base-parser';

function translate(dockerComposeFilePath: string, targetPlatform: string): any {
  try {
    // Read and parse the Docker Compose file
    const fileContents = fs.readFileSync(dockerComposeFilePath, 'utf8');
    const dockerCompose = yaml.load(fileContents) as any;

    // Select the appropriate parser
    let parser: BaseParser;
    switch (targetPlatform.toLowerCase()) {
      case 'aws-cloudformation':
        parser = cloudFormationParserInstance;
        break;
      default:
        throw new Error(`Unsupported target platform: ${targetPlatform}`);
    }

    const translatedConfig = parser.parse(dockerCompose);
    return translatedConfig;

  } catch (e) {
    console.error(`Error translating docker-compose file: ${e}`);
    return null;
  }
}

export { translate };