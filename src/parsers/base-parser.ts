export type ParserInfo = {
  website: string;
  officialDocs: string;
  abbreviation: string;
  name: string;
};

export abstract class BaseParser {
  abstract parse(dockerCompose: any): any;
  abstract getInfo(): ParserInfo;
}