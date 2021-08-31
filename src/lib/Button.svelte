<script>
    import { createEventDispatcher } from 'svelte';

    export let disabled

	const dispatch = createEventDispatcher();

	function clickHandle() {
		dispatch('click');
	}
</script>


<button on:click={clickHandle} {disabled}>
<slot></slot>
</button>

<style>
    button{
        border: none;
        border-radius: .5rem;

        background-color: #706fd3;
        color: white;

        padding: .75rem;
        width: 100%;

        font-size: 1.5rem;

    }

    button:disabled{
        background-color: dimgrey;
    }
</style>