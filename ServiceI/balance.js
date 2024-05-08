const axios = require('axios')

class Balance{
    constructor(statusBalance, servers) {
        this.statusBalance = statusBalance
        this.servers = servers
        this.currentServer = 0
        this.nameCurrentServer = ''
        this.connections = servers.map(() => 0);
    }

    funBalance(state, params) {
        switch (state) {
            case this.statusBalance.ROUND_ROBIN:
                this.roundRobin();
                this.request();
                break;
            case this.statusBalance.WEIGHT_ROUND_ROBIN:
                this.weightRoundRobin(params['weights']);
                this.request();
                break;
            case this.statusBalance.STICKY_SESSION:
                this.stickySession(params['x-session-id']);
                this.request();
                break;
            case this.statusBalance.LEAST_CONNECTION:
                this.leastConnection();
                this.request();
                break;
            default:
                this.roundRobin();
                this.request();
                break;
        }
    }

    request(){
        axios.get(this.nameCurrentServer)
            .then(response => {
                const ID = response.data;
                console.log("UUID serviceB: " + ID);
                console.log("URL serviceB: " + this.nameCurrentServer)
            })
            .catch(error => {
                console.error('An error has occurred:', error);
            });
    }

    roundRobin() {
        this.currentServer = (this.currentServer + 1) % this.servers.length
        this.connections[this.currentServer]++;
        this.nameCurrentServer = this.servers[this.currentServer];
    }

    weightRoundRobin(weights) {
        let lengthWithWeight = 0
        const newServers = []
        for (let i = 1; i <= this.servers.length; i++){
            lengthWithWeight += weights[i - 1]
            for (let j = 0; j < weights[i - 1]; j++){
                newServers.push(this.servers[i - 1])
            }
        }
        this.currentServer = (this.currentServer + 1) % lengthWithWeight
        const indexConnection = this.servers.indexOf(newServers[this.currentServer]);
        this.connections[indexConnection]++;
        this.nameCurrentServer = newServers[this.currentServer];
    }

    stickySession(sessionId) {
        const sessionIdNumber = parseInt(sessionId.replace(/-/g, ''), 16);
        this.currentServer = sessionIdNumber % this.servers.length;
        this.connections[this.currentServer]++;
        this.nameCurrentServer = this.servers[this.currentServer];
    }

    leastConnection(){
        this.currentServer = this.connections.indexOf(Math.min(...this.connections));
        this.connections[this.currentServer]++;
        this.nameCurrentServer = this.servers[this.currentServer];
    }
}

module.exports = Balance;