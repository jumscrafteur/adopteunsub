<script>
    export let reponse
    export let choixs = []
    
    let responseType = choixs.length > 0 ? "table" : "text"
</script>

<div class="reponseDiv {responseType}">
    <p class="question"><slot></slot></p>
    {#if responseType == "text"}
        <p class="reponse">{reponse}</p>
    {:else if responseType == "table"}

        <div class="choiceLine">
            {#each choixs as choix}
                <p class:active={choix==reponse}>{choix}</p>
            {/each}
            </div>

    {/if}
</div>

<style>
    p{
        margin: 0 0 .5rem 0;
    }
    .reponseDiv{
        display: flex;
        flex-wrap: wrap;
        gap: .2rem;
        align-items: baseline;
    }

    .reponseDiv.table{
        flex-direction: column;
    }

    .question{
        font-weight: bolder;
        white-space:pre-line;
    }

    .question::after{
        content: " : ";
    }

    .reponseDiv.table .question{
        margin: 0 0 -10px 0;
    }

    .choiceLine{
        position: relative;
        display: flex;
        /* flex-wrap:wrap; */
        overflow-y: visible;
        overflow-x: scroll;
        width: calc(100vw - 1rem);
        justify-content: space-between;
        gap: .5rem;

        color: white;

        padding: 10px;
        /* box-shadow: inset -5px 0 10px 5px red; */
    }

    .choiceLine p {
        white-space: nowrap;
        background-color: dimgrey;
        padding: .5rem 2rem;
        margin: 0;
        border-radius: .5rem;
    }

    .choiceLine p.active {
        background-color: #706FD3;
        box-shadow: 0 0 10px 2px rgba(113, 111, 211, 0.5);
    }

    .shadow{
        width: 100%;
        height: 100%;
        position: relative;
    }

    
</style>