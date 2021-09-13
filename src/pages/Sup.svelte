<script>
    import Input from "@lib/Input.svelte"
    import Button from "@lib/Button.svelte"

    import { db } from '@/firebase.js';
    import { addLog } from '@/logHandler.js'

    import { onMount} from "svelte";
    import { v4 as uuidv4 } from 'uuid';

    let sending = false

    onMount( async () => {
        let results = await fetch('https://api.github.com/gists/7b170b4f66dd0d1537b74d1e3fcecc62')

        let data = await  results.json();
  
        tempQuestions = JSON.parse(data.files["questions.json"].content)

        questions = JSON.parse(JSON.stringify(tempQuestions))

    })

    let tempQuestions ={}

    let questions = JSON.parse(JSON.stringify(tempQuestions))

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms || DEF_DELAY));
    }

    async function sendForm() {
        sending = true

        try {
            db.collection("sup").add({...questions,id:uuidv4()})
            addLog("info","Tes réponses ont bien été envoyé ⬆️")
        } catch (e) {
            addLog("error","Grrrr, on dirait que ça ne marche pas essaye plus tard ")
        }
    
        questions = JSON.parse(JSON.stringify(tempQuestions))

        await sleep(500);

        sending = false
    }

</script>

{#if questions.isVerified != undefined}

    {#each questions.sections as section}
        <h2>{section.sectionTitle}</h2>
        {#each section.questions as question}

                <Input name="{question.name}" type="{question.type}"bind:value={question.reponse} choix="{question.choix}" link="{question.link}">{question.question}</Input> 

        {/each}
    {/each}

    <br>

    <Button on:click={sendForm} disabled={sending}>C'est tout bon ✅</Button>
{/if}

<!-- <pre>{JSON.stringify(questions, null , 4)}</pre> -->