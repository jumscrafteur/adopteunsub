<script>
    export let plutot
</script>
<p class="titre"><slot></slot></p>
<div class="container">
{#each plutot as question}
    <div class="question">
        {#each question.choix as choix}
            <p class:active={choix == question.reponse} class="choix">{choix}</p>
        {/each}
    </div>
{/each}
</div>

<style>
    .container{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        gap: 1.5rem;
        margin: 10px 0;
    }

    .question{
        /* white-space: nowrap;
        background-color: dimgrey;


        width: 100%; */
        display: flex;
        /* background-color: dimgrey; */
        width: 100%;
        /* border-radius: .5rem; */
        /* overflow: hidden; */
        color: white;
        gap: .5rem;
        position: relative;





    }

    .choix{
        /* padding: .5rem 1rem .5rem 2rem; */
        border-radius: .5rem;
        background-color: dimgrey;

        padding: .5rem 0;
        margin: 0;
        width: 100%;
        text-align: center;
    }

    .choix.active{
        background-color: #706FD3;
        box-shadow: 0 0 10px 2px rgba(113, 111, 211, 0.5);

    }

    .titre{
        font-weight: bolder;
        white-space: nowrap;
        margin: 0;
    }

    .question + .question::before {
        content: "";
        position: absolute;
        top: -.75rem;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 100px;
        height: 5px;
        background-color: dimgrey;
        border-radius: 99999999px;
        overflow: hidden;
        opacity: .5;
    }

    .titre::after{
        content: " : ";
    }
</style>