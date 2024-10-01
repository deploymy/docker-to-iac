import * as yaml from 'js-yaml';
import cloudFormationParserInstance from './parsers/aws-cloudformation';
import { BaseParser, ParserInfo } from './parsers/base-parser';

// List of all available parsers
const parsers: BaseParser[] = [
  cloudFormationParserInstance,
  // Add new parsers here in the future as needed,
  // e.g., terraformParserInstance
];

// Updated translate function to take plain text as input
function translate(dockerComposeContent: string, targetPlatform: string): any {
  try {
    const dockerCompose = yaml.load(dockerComposeContent) as any;

    const parser = parsers.find(parser => parser.getInfo().abbreviation.toLowerCase() === targetPlatform.toLowerCase());
    if (!parser) {
      throw new Error(`Unsupported target platform: ${targetPlatform}`);
    }

    const translatedConfig = parser.parse(dockerCompose);
    return translatedConfig;
  } catch (e) {
    console.error(`Error translating docker-compose content: ${e}`);
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
