<script>
  import {createEventDispatcher} from 'svelte'

  export let active = true
  export let nom
  export let prenom
  export let lycee
  export let id

  const dispatch = createEventDispatcher();

	function addSup() {
		dispatch('add', {
			id
		});
	}

  function click() {
		dispatch('click');
	}
</script>


<div class="card" class:active>
  <div class="text" on:click={click}>
    <p class="title">{prenom} {nom[0]}.</p>
    <p class="subtitle">{lycee}</p>
  </div>
  <div class="icon" class:active on:click={addSup}>
    <span class="material-icons">child_friendly</span>
  </div>

</div>


<style>
  .card{
    width: 100%;
    display: flex;
    border: 1px solid dimgrey;
    border-radius: .25rem;
    background-color: white;

    transition: all .2s ease-out;

    box-shadow: 0 0 5px 3px rgba(105, 105, 105, 0.1)
  }

  .card:hover{
        transform: translateY(-5px) scale(1.02);
        box-shadow: 0 5px 5px 3px rgba(105, 105, 105, 0.2);

    }

  .card.active{
    border: 1px solid #706FD3;

  }

  .text{
    width: 100%;
    padding: .5rem 1rem;

  }
  
  p{
    margin: 0;
  }

  .title{
    font-family: 'Lobster', cursive;
    font-size: 1.5rem;
  }

  .subtitle{
    opacity: .8;
  }

  .subtitle::before{
    content: "- ";
    opacity: .8;
  }

  .icon{
    display: flex;
    align-items: center;
    justify-content: center;

    width: 4rem;

    background-color: dimgrey;
  }

  .icon.active{
    background-color: #706FD3;
  }

  .material-icons{
    user-select: none;
    font-size: 2rem;
    color: white;
  }
</style>