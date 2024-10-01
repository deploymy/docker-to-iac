import { BaseParser, ParserInfo, DockerCompose, TemplateFormat, formatResponse } from './base-parser';

class CloudFormationParser extends BaseParser {
  parse(dockerCompose: DockerCompose, templateFormat: TemplateFormat): any {
    if (templateFormat === undefined) templateFormat = TemplateFormat.yaml;

    let response: any = {};
    const parameters: any = {};
    const resources: any = {};
    const outputs: any = {};

    // Mandatory Template Values
    // ...

    // Populate resources based on dockerCompose contents
    for (const [serviceName, serviceConfig] of Object.entries(dockerCompose.services)) {
      if (serviceConfig.image === 'nginx') {
        // Add logic for S3 bucket if the nginx image is used
        resources['S3Bucket'] = {
          Type: 'AWS::S3::Bucket',
          Properties: {
            BucketName: `${serviceName}-bucket`
          }
        };
      }

      // Add other service resources here as needed
    }

    response = {
      AWSTemplateFormatVersion: '2010-09-09',
      Description: 'Deplo.my CFN template translated from Docker compose',
      Parameters: parameters,
      Resources: resources,
      Outputs: outputs
    };

    return formatResponse(JSON.stringify(response, null, 2), templateFormat);
  }

  getInfo(): ParserInfo {
    return {
      website: 'https://aws.amazon.com/cloudformation/',
      officialDocs: 'https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html',
      abbreviation: 'CFN',
      name: 'AWS CloudFormation'
    };
  }
}

export default new CloudFormationParser();
