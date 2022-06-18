module.exports = async (process) => {

    process.on('multipleResolves', (type, reason, promisse) => {
        console.log(`Script erro:` + type, promisse, reason)
    })
    
    process.on('unhandledRejection', (reason, promisse) => {
        console.log(`Script com erro:` + reason, promisse)
    })
    
    process.on('uncaughtException', (error, origin) => {
        console.log(`Script com erro:` + error, origin)
    })
    
    process.on('uncaughtExceptionMonitor', (error, origin) => {
        console.log(`Script com erro:` + error, origin)
    })

}