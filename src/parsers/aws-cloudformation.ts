import { BaseParser, ParserInfo, DockerCompose } from './base-parser';

class CloudFormationParser extends BaseParser {
  parse(dockerCompose: DockerCompose): any {
    const resources: any = {};

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

    return {
      AWSTemplateFormatVersion: '2010-09-09',
      Description: 'Translated from Docker Compose',
      Resources: resources
    };
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
