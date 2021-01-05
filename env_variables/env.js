const envs = {
  local: {
    domainUrl: "http://localhost:3000",
    nodeUrl: "http://localhost:8081",
    publishUrl: "http://localhost:9091",
    dbDialect: "mssql",
    dbHost: "192.168.43.252",
    dbName: "catchme",
    dbUname: "atmecsUser",
    dbPwd: "Atmecs@1234",
    ksUname: "svcusr_CRVL",
    ksPwd: "citrixkey",
    dbPort: 1433,
    whiteListEnable: false,
    imagesBaseUrl: 'https://evolution-dev.citrix.com',
    ksApi: 'https://webapi-dev-dev.citrix.com',
    ksApiKey: '4AQYth5LqA6xWTufz8rR9hqJ7rIHLOGU',
    jProjectKey: 'JAI',
    jUrl: "https://atmecs-internal.atlassian.net",
    jName: "subhankar.mukkoti@atmecs.com",
    jPwd: "m0ETqUGxeZvwaU5HFouA3C17"
  },
  atmecsip: {
   
  },
  dev: {
    
  },

};

module.exports = envs;