import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import cloudFormationParserInstance from './parsers/aws-cloudformation';
import { BaseParser, ParserInfo } from './parsers/base-parser';

// List of all available parsers
const parsers: BaseParser[] = [
  cloudFormationParserInstance,
  // Add new parsers here in the future as needed,
  // e.g., terraformParserInstance
];

function translate(dockerComposeFilePath: string, targetPlatform: string): any {
  try {
    const fileContents = readFileSync(dockerComposeFilePath, 'utf8');
    const dockerCompose = yaml.load(fileContents) as any;

    const parser = parsers.find(parser => parser.getInfo().abbreviation.toLowerCase() === targetPlatform.toLowerCase());
    if (!parser) {
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
  const parser = parsers.find(parser => parser.getInfo().abbreviation.toLowerCase() === targetPlatform.toLowerCase());
  if (!parser) {
    throw new Error(`Unsupported target platform: ${targetPlatform}`);
  }
  return parser.getInfo();
}

function listAllParsers(): ParserInfo[] {
  return parsers.map(parser => parser.getInfo());
}

export { translate, getParserInfo, listAllParsers };
