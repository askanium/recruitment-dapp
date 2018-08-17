import IPFS from 'ipfs-api';

// Using the infura.io node, otherwise ipfs requires you to run a daemon on your own computer/server. See IPFS.io docs
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

// Run with local daemon
// const ipfs = new IPFS('localhost', '5001', {protocol: 'http'});

export default ipfs;