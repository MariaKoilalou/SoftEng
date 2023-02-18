const chai = require('chai');
const expect = chai.expect;
const { execSync } = require('child_process');

describe('doanswer CLI', function() {
  this.timeout(0);

  it('should return the correct output when running the CLI command', () => {
    const output = execSync('python D:\\Desktop\\tl\\SoftEng22-69\\cli\\src\\doanswer.py --questionnaire_id 0001 --question_id 0003 --session_id 0001 --option_id 0002').toString();
    // console.log(output); // print the output from the command to the console
    expect(output).to.include("200");
  });
});
