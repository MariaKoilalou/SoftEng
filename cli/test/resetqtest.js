const chai = require('chai');
const expect = chai.expect;
const { execSync } = require('child_process');

describe('resetq CLI', function() {
  this.timeout(0);
  it('should reset all data when running the CLI command', () => {
    const output = execSync('python D:\\Desktop\\tl\\SoftEng22-69\\cli\\src\\resetq.py --questionnaire_id 0001').toString();
    //console.log(output); // print the output from the command to the console
    expect(output).to.include("200");
  });
});
