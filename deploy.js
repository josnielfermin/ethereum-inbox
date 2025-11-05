const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  "shy green gloom chuckle shift uncover cave ten tuna void actor erupt",
  "https://sepolia.infura.io/v3/85ba41084f1b41ae82dafd7bed22c7c2"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("first", accounts[0]);

  await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["MuninnDev"] })
    .send({ from: accounts[0], gas: "1000000" });
};
deploy();
