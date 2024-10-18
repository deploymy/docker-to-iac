import { BaseParser, ParserInfo, DockerCompose, TemplateFormat, formatResponse, DefaultParserConfig } from './base-parser';

const defaultParserConfig: DefaultParserConfig = {
  subscriptionName: 'free',
  region: 'oregon',
  fileName: 'render.yaml',
  templateFormat: TemplateFormat.yaml
};

// Assuming you need to convert Docker Compose service to Render service details.
class RenderParser extends BaseParser {

  parse(dockerCompose: DockerCompose, templateFormat: TemplateFormat = defaultParserConfig.templateFormat): any {
    const services: Array<any> = [];
  
    
    for (const [serviceName, serviceConfig] of Object.entries(dockerCompose.services)) {

      const ports = new Set<number>();
      serviceConfig.ports?.map((value) => { 
        ports.add(Number(value.split(':')[0]));
      });

      const environmentVariables: { [key: string]: string | number } = {};
      if (serviceConfig.environment) {
        Object.entries(serviceConfig.environment).forEach(([key, value]) => {
          if (value.includes('=')) {
            const [splitKey, splitValue] = value.split('=');
            environmentVariables[splitKey] = splitValue;
          } else {
            environmentVariables[key] = value;
          }
        });
      };

      if (ports.size > 0) {
        environmentVariables['PORT'] = Array.from(ports)[0];  // Binding port 
      }      

      const service: any = {
        name: serviceName,
        type: 'web',
        env: 'docker',
        runtime: 'image',
        image: { url: `docker.io/library/${serviceConfig.image}` },
        startCommand: serviceConfig.command || '',
        plan: defaultParserConfig.subscriptionName,  // Change according to your needs, Render offers "free", "starter', "standard', "pro"
        region: defaultParserConfig.region, // Default example region, adjust based on preference
        envVars: Object.entries(environmentVariables).map(([key, value]) => ({
          key,
          value
        })),
      };

      services.push(service);
    }

    const renderConfig = {
      services,
    };
    
    return formatResponse(JSON.stringify(renderConfig, null, 2), templateFormat);
  }

  getInfo(): ParserInfo {
    return {
      website: 'https://render.com/docs',
      officialDocs: 'https://docs.render.com/infrastructure-as-code',
      abbreviation: 'RND',
      name: 'Render',
      defaultParserConfig: defaultParserConfig
    };
  }
}

export default new RenderParser();
