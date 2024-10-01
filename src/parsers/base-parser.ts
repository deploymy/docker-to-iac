export type ParserInfo = {
  website: string;
  officialDocs: string;
  abbreviation: string;
  name: string;
};

export interface DockerComposeService {
  image: string;
  ports?: string[];
  environment?: { [key: string]: string };
}

export interface DockerCompose {
  services: {
    [key: string]: DockerComposeService;
  };
}

export abstract class BaseParser {
  abstract parse(dockerCompose: DockerCompose): any;
  abstract getInfo(): ParserInfo;
}
