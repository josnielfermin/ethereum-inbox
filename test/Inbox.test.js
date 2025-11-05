const assert = require("assert");
const ganache = require("ganache");
const { Web3 } = require("web3");
const { interface, bytecode } = require("../compile");

const web3 = new Web3(ganache.provider());

describe("Inbox", () => {
  let accounts;
  let inbox;

  beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    inbox = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data: bytecode, arguments: ["MuninnDev"] })
      .send({ from: accounts[0], gas: "1000000" });
  });

  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });

  it("has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.strictEqual(message, "MuninnDev");
  });

  it("can change the message", async () => {
    await inbox.methods
      .setMessage("0xMuninn")
      .send({ from: accounts[0], gas: "1000000" });
    const message = await inbox.methods.message().call();
    assert.notStrictEqual(message, "MuninnDev");
    assert.strictEqual(message, "0xMuninn");
  });
});

// class Car {
//   park() {
//     return "stopped";
//   }

//   drive() {
//     return "vroom";
//   }
// }

// describe("Car", () => {
//   let car;

//   beforeEach(() => {
//     car = new Car();
//   });

//   it("can park", () => {
//     assert.strictEqual(car.park(), "stopped");
//   });

//   it("can drive", () => {
//     assert.strictEqual(car.drive(), "vroom");
//   });
// });
