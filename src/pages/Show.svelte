<script>
    import Loading from "@lib/Loading.svelte"
    import Input from "@lib/Input.svelte"

    import AnswerEmbed from "@lib/AnswerEmbed.svelte"
    import Plutot from "@lib/PlutotEmbed.svelte"


    import { userId } from '@/store.js';
    import { db } from '@/firebase.js';

    import { onMount} from "svelte";
    import { useNavigate, useLocation } from "svelte-navigator";

    export let id

    const navigate = useNavigate();
    const location = useLocation();


    $: if (!$userId) {
        navigate("/spe/login", {
        state: { from: $location.pathname },
        replace: true,
        });
    }

    let sup = {}


    onMount(async () => {
        sup = await getSup(id)   

        console.log(sup)

        loading = false
    })

    async function getSup(id){

        try {
            let docRef = db.collection("sup");
            let querySnapshot = await docRef.where("id", "==", id).limit(3).get();

            return querySnapshot.docs[0].data()

        } catch (e) {
            return []
        }
        
    }

    let loading = true
    
</script>

<!-- <AnswerEmbed reponse={'Lorem '}>⚙️ Test</AnswerEmbed>
<AnswerEmbed reponse={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolorem facilis qui quos a laudantium nam et fugiat! Qui, libero veritatis! Maiores sit soluta quam excepturi eum impedit sed explicabo!'}>⚙️ Test</AnswerEmbed>
<AnswerEmbed choixs={['Choix Long 1','Choix Long 2','Choix Long 3','Choix Long 4','Choix Long 5',]} reponse={'Choix Long 1'}>⚙️ Test</AnswerEmbed> -->

<!-- {#if loading || !user.isVerified } -->
{#if loading && sup != {}}
  <Loading/>
{:else}
    <h2>{sup.sections[0].questions[1].reponse} {sup.sections[0].questions[0].reponse}</h2>
        {#if sup.sections[0].questions[2].reponse}<span>aka {sup.sections[0].questions[2].reponse}</span>{/if}
        <br>
        <AnswerEmbed reponse={sup.sections[0].questions[4].reponse}>🏫 Viens du lycee</AnswerEmbed>
        <AnswerEmbed reponse={sup.sections[0].questions[6].reponse}>🙂 Point fort</AnswerEmbed>
        <AnswerEmbed reponse={sup.sections[0].questions[5].reponse}>🙃 Point faible</AnswerEmbed>

    {#each sup.sections as section}

        {#if section.sectionTitle == "T'es plutôt ... 🤔"}
            <Plutot plutot={ section.questions }>🎭 Il est plutot ...</Plutot>

        {:else if section.sectionTitle != "Questions relous 😴"}
            {#each section.questions as question}
                <!-- <Input name="{question.name}" type="{question.type}"bind:value="" choix="">{question.question}</Input>  -->
                <AnswerEmbed choixs={question.choix} reponse={question.reponse}>{question.display}</AnswerEmbed>

            {/each}
        {/if}
    {/each}

{/if}

<style>
    *{
        text-align: left;
        margin: 0;
    }

    span {
        font-size: 1rem;
    }
    span:before {
        content: "- ";
    }
</style>