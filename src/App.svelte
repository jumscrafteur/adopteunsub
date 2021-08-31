<script >
  import Sup from "@pages/Sup.svelte"
  import Spe from "@pages/Spe.svelte"
  import LogIn from "@pages/LogIn.svelte"
  import Register from "@pages/Register.svelte"
  import Show from "@pages/Show.svelte"

  import Button from "@lib/Button.svelte"

  import { Router, Link, Route } from "svelte-navigator";

  import { logsStore } from '@/store.js';
  import { removeLog } from '@/logHandler.js'

  let logs



  logsStore.subscribe(newLogs => {
    logs =  newLogs
  })



</script>

<main>
<Router>
  <nav>
    <h1>Adopte un Sup</h1>

    <div class="horzDraw">
      
		<Link to="sup" class="router-link"><Button>Je suis un Sup</Button></Link>
		<Link to="spe" class="router-link"><Button>Je suis un Spé</Button></Link>
  </div>

	</nav>
		<Route path="/sup">
			<Sup />
		</Route>
		<Route path="/spe">
			<Spe />
		</Route>
		<Route path="/spe/login">
			<LogIn />
		</Route>
		<Route path="/spe/register">
			<Register />
		</Route>
		<Route path="/sup/show/:id" let:params>
			<Show id={params.id}/>
		</Route>
		<!-- <Route path="about" component={About} />
		<Route path="blog/*">
			<Route path="/">
				<Blog />
			</Route>
			<Route path=":id" component={BlogPost} />
		</Route>
		<Route path="search/:query" let:params>
			<Search query={params.query} />
		</Route> -->
</Router>

</main>
<div class="logs">
  {#each logs as log,i}
    <div class="log {log.type}">
      {log.text}
      <div class="close" on:click={() => removeLog(i)}>
        ✖️
      </div>
    </div>
    
  {/each}
</div>

<style>
  main{
    display: flex;
    flex-direction: column;

    max-width: 700px;
    margin: auto;

  }

  :global(.router-link) { 
    width: 100%;
    min-width: 200px;
  }


  .horzDraw{
    display: flex;
    /* flex-wrap: wrap; */
    gap:.5rem 3rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 500px) {
    .horzDraw{flex-wrap: wrap;} 

   }

  .logs{
      position: sticky;
      bottom: 1rem;
      margin: 1rem 0;
      display: flex;
      flex-direction: column;
      gap: .5rem;
      white-space: pre-line;
  }

  .log{
      position: relative;
      padding: .5rem 1rem;
      border-radius: .5rem;
      
      background-color: hsl(241, 53%, 80%);
      border: 2px solid #706FD3;
   }

   .error{
      background-color: hsl(9, 100%, 80%);
      border: 2px solid tomato;
   }
   .warn{
      background-color: hsl(51, 100%, 80%);
      border: 2px solid gold;
   }
   .info{
      background-color: hsl(80, 61%, 80%);
      border: 2px solid yellowgreen;
   }

   .close{
     position: absolute;
     top:50%;
     transform: translateY(-50%);
     right:.5rem;
     cursor: pointer;
   }

  /* pre{
    font-family: 'Courier New', Courier, monospace;
    border: 1px solid #706fd3;
    border-radius: .25rem;
    overflow-x: scroll;
  } */
</style>
