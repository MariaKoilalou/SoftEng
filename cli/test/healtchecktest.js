const chai = require('chai');
const expect = chai.expect;
const { spawn } = require('child_process');
const { execSync } = require('child_process');


//healthcheck
describe('healthcheck CLI', function() {
  this.timeout(0);
  it('should return the correct output when running the CLI command', () => {
    const output = execSync('python D:\\Desktop\\tl\\SoftEng22-69\\cli\\src\\healthcheck.py').toString();
    console.log(output); // print the output from the command to the console
    expect(output).to.include("200");
    expect(output).to.include("{'status': 'OK'}");
  });
});


