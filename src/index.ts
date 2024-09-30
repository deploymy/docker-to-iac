import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import cloudFormationParserInstance from './parsers/aws-cloudformation';
import { BaseParser, ParserInfo } from './parsers/base-parser';

function translate(dockerComposeFilePath: string, targetPlatform: string): any {
  try {
    // Read and parse the Docker Compose file
    const fileContents = readFileSync(dockerComposeFilePath, 'utf8');
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

function getParserInfo(targetPlatform: string): ParserInfo {
  let parser: BaseParser;
  switch (targetPlatform.toLowerCase()) {
    case 'aws-cloudformation':
      parser = cloudFormationParserInstance;
      break;
    default:
      throw new Error(`Unsupported target platform: ${targetPlatform}`);
  }
  return parser.getInfo();
}

export { translate, getParserInfo };