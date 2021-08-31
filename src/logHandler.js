import { logsStore } from '@/store.js';

let logs

logsStore.subscribe(newLogs => {
    logs =  newLogs
})

export let addLog = (type,text) => {
    logs.push({type,text})
    logsStore.set(logs)
} 

export let removeLog = (index) => {
    logs.splice(index,1)
    logsStore.set(logs)
}