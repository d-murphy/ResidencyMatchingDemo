const Program = require('../utils/program.js');

const Program1 = new Program("City", 2, ["Arthur", "Betty"]);

test('Test program creation - program name', () => {
    expect(Program1.name).toBe("City");
})

test('Test program creation - program max', () => {
    expect(Program1.maxApplicants).toBe(2);
})

test('Test program creation - program applicant rank', () => {
    expect(Program1.applicantRank.length).toBe(2);
})

test('Test program change - applicant rank', () => {
    Program1.changeRank(["Arthur", "Betty", "Charles"])
    expect(Program1.applicantRank.length).toBe(3);
})
