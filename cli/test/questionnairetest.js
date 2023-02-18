const chai = require('chai');
const expect = chai.expect;
const { execSync } = require('child_process');

describe('questionnaire CLI', function() {
  this.timeout(0);
  it('should return the correct output when running the CLI command with json format', () => {
    const output = execSync('python D:\\Desktop\\tl\\SoftEng22-69\\cli\\src\\questionnaire.py --questionnaire_id 0001 --format json').toString();
    console.log(output); // print the output from the command to the console
    expect(output).to.include("200");
    //expect(output).to.include('"questionnaire_id": 1');
  });

  it('should return the correct output when running the CLI command with csv format', () => {
    const output = execSync('python D:\\Desktop\\tl\\SoftEng22-69\\cli\\src\\questionnaire.py --questionnaire_id 0001 --format csv').toString();
    console.log(output); // print the output from the command to the console
    expect(output).to.include("200");
    //expect(output).to.include("What is your name");
  });
});
