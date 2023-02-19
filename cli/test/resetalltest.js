const chai = require('chai');
const expect = chai.expect;
const { execSync } = require('child_process');

describe('resetall CLI', function() {
  this.timeout(0);
  it('should reset all data when running the CLI command', () => {
    const output = execSync('python D:\\Desktop\\tl\\SoftEng22-69\\cli\\src\\resetall.py').toString();
    //console.log(output); // print the output from the command to the console
    expect(output).to.include("All data removed successfully!");
  });
});
