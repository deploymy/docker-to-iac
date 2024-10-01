import * as YAML from 'yaml';
import cloudFormationParserInstance from './parsers/aws-cloudformation';
import { BaseParser, ParserInfo, TemplateFormat } from './parsers/base-parser';

// List of all available parsers
const parsers: BaseParser[] = [
  cloudFormationParserInstance,
  // Add new parsers here in the future as needed,
  // e.g., terraformParserInstance
];

function translate(dockerComposeContent: string, targetPlatform: string, templateFormat?: TemplateFormat): any {
  try {
    const dockerCompose = YAML.parse(dockerComposeContent) as any;

    const parser = parsers.find(parser => parser.getInfo().abbreviation.toLowerCase() === targetPlatform.toLowerCase());
    if (!parser) {
      throw new Error(`Unsupported target platform: ${targetPlatform}`);
    }

    const translatedConfig = parser.parse(dockerCompose, templateFormat);
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
