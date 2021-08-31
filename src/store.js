import { writable } from 'svelte/store';

export const userId = writable();
// export const userId = writable("N1YnSCWe4raLO68TDmRG6zx1dD82");
export const logsStore = writable([])
// export const logsStore = writable([{type:"error",text:"Ceci est une mechante erreur !"},{type:"warn",text:"Ceci est un warning !"},{type:"info",text:"Ceci est une information !"}])