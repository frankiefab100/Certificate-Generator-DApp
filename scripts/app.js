function connectToMetaMask() {
  ethereum.enable().then((result) => {
    console.log("Account: ", result);
  });
}

$(document).ready(function () {
  web3 = new Web3(ethereum);
  console.log("Connection Object: ", web3);

  const contractAddress = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";
  const contractAbi = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      name: "certificateDetails",
      outputs: [
        {
          internalType: "string",
          name: "courseName",
          type: "string",
        },
        {
          internalType: "string",
          name: "candidateName",
          type: "string",
        },
        {
          internalType: "string",
          name: "grade",
          type: "string",
        },
        {
          internalType: "string",
          name: "date",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_certificateID",
          type: "string",
        },
        {
          internalType: "string",
          name: "_courseName",
          type: "string",
        },
        {
          internalType: "string",
          name: "_candidateName",
          type: "string",
        },
        {
          internalType: "string",
          name: "_grade",
          type: "string",
        },
        {
          internalType: "string",
          name: "_date",
          type: "string",
        },
      ],
      name: "newCertificate",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  myContract = new web3.eth.Contract(contractAbi, contractAddress);
  console.log("Contract Object: ", myContract);
});

// Certificate Details
function getCertificateDetails() {
  certificateID = document.getElementById("certificateID").value;
  myContract.methods
    .certificateDetails(certificateID)
    .call({ from: ethereum.selectedAddress })
    .then((result) => {
      console.log(result);
      localStorage.setItem("certificateID", certificateID);
      localStorage.setItem("candidateName", result.candidateName);
      localStorage.setItem("courseName", result.courseName);
      localStorage.setItem("grade", result.grade);
      localStorage.setItem("date", result.date);

      var url = "viewCertificate.html";
      window.location.href = url;
    });
}

// Issue certificate
function generateCertificate() {
  certificateID = document.getElementById("certificateID").value;
  courseName = document.getElementById("courseName").value;
  candidateName = document.getElementById("candidateName").value;
  grade = document.getElementById("grade").value;
  date = document.getElementById("date").value;

  myContract.methods
    .newCertificate(certificateID, courseName, candidateName, grade, date)
    .send({ from: ethereum.selectedAddress, gasLimit: "927000" })
    .then((txn) => {
      console.log(txn);
      alert("Certificate Issue with Number: " + certificateID);
    });
}

// View Certificate
window.onload = function () {
  document.getElementById("certificateID").innerHTML =
    "Certificate No: " + localStorage.getItem("certificateID");
  document.getElementById("candidateName").innerHTML =
    localStorage.getItem("candidateName");
  document.getElementById("courseName").innerHTML =
    localStorage.getItem("courseName");
  document.getElementById("grade").innerHTML = localStorage.getItem("grade");
  +" Grade";
  document.getElementById("date").innerHTML =
    "Date Issued: " + localStorage.getItem("date");
};
