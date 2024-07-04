
require('@nomiclabs/hardhat-waffle');

module.exports = {
    solidity: '0.8.0',
    networks: {
        sepolia: {
            url: 'https://eth-sepolia.g.alchemy.com/v2/P2Mr6FQTG5eBTRm81hvtyBUwWqfo3FQU',
            accounts: ['790d5b090ffb79d6fdd821a0d2aacfe4a193320b75b51a568d27f9fb4f02f47b']
        }
    }
}