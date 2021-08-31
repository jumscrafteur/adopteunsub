<script>
    import Input from "@lib/Input.svelte"
    import Button from "@lib/Button.svelte"

    import { db } from '@/firebase.js';
    import { addLog } from '@/logHandler.js'

    import { v4 as uuidv4 } from 'uuid';

    let sending = false

    let tempQuestions = {
        isVerified:false,
            relou : [
            {
                name:"nom",
                question:"Nom",
                reponse:""
            },
            {
                name:"prenom",
                question:"Prénom",
                reponse:""
            },
            {
                name:"surnom",
                question:"Surnom",
                reponse:""
            },
            {
                name:"lycee",
                question:"De quel lycée viens tu ?",
                reponse:""
            },
            {
                name:"mauvaisCours",
                question:"Ta bête noire en cours : ",
                reponse:"",
                type:"textarea"
            },
            {
                name:"bonCours",
                question:"La matière que tu gères : ",
                reponse:"",
                type:"textarea"
            },
            
            ],
            toi : [
            {
                name:"amis",
                question:"Déjà des potes dans la promo ?\nSi oui donne leur petit nom",
                reponse:"",
                type:"textarea"
            },
            {
                name:"objectifs",
                question:"Des objectifs pour la prépa ?",
                reponse:"",
                type:"textarea"
            },
            {
                name:"contact",
                question:"Ton réseau préféré pour papoter : ",
                reponse:"Insta",
                type:"radio",
                choix:["Insta","Snap","Whattsap","Discord","Email"],
            },
            ],
            fun : [
            {
                name:"starwars",
                question:"Quel est ton Star Wars préf ?",
                type:"radio",
                choix:["Osef de Star Wars","IV : Un nouvel espoir","V : L'Empire contre-attaque","VI : Le Retour du Jedi","I : La Menace fantôme","II : L'Attaque des clones","III : La Revanche des Sith","VII : Le Réveil de la Force","VIII : Les Derniers Jedi","IX : L'Ascension de Skywalker","Rogue One: A Star Wars Story","Solo: A Star Wars Story"],
                reponse:"Osef de Star Wars"
            },
            {
                name:"maison",
                question:"Quelle est ta maison dans Harry Potter",
                type:"radio",
                choix:["Je ne suis pas une sorcier ...","Gryffondor", "Poufsouffle","Serdaigle","Serpentard"],
                reponse:"Je ne suis pas une sorcier ..."
            },
            ],
            plutot:[
            {
                name:"netflix_sortir",
                question:"",
                type:"radio",
                choix:["Netflix","Sortir"],
                reponse: "Netflix"
            },
            {
                name:"serie_anime",
                question:"",
                type:"radio",
                choix:["Série","Anime"],
                reponse: "Série"
            },
            {
                name:"montagne_mer",
                question:"",
                type:"radio",
                choix:["Montagne","Mer"],
                reponse: "Montagne"
            },
            {
                name:"collectif_individuel",
                question:"",
                type:"radio",
                choix:["Sport collectif","Sport individuel"],
                reponse: "Sport collectif"
            },
            {
                name:"sucré_salé",
                question:"",
                type:"radio",
                choix:["Sucré","Salé"],
                reponse: "Sucré"
            },
            {
                name:"livre_adaptation",
                question:"",
                type:"radio",
                choix:["Livre","Adaptation"],
                reponse: "Livre"
            },
            {
                name:"printemps_ete_automne_hiver",
                question:"",
                type:"radio",
                choix:["Printemps","Été","Automne","Hiver"],
                reponse: "Printemps"
            },
            {
                name:"leibniz_lagrange",
                question:"",
                type:"radio",
                choix:["Leibniz ( dx/dt )","Lagrange ( f'(x) )"],
                reponse: "Leibniz ( dx/dt )"
            },
            {
                name:"pile_face",
                question:"",
                type:"radio",
                choix:["Pile","Face"],
                reponse: "Pile"
            },
            ],
            musique : [
            {
                name:"musique_meilleur",
                question:"La meilleure musique de tous les temps :",
                reponse:""
            },
            {
                name:"musique_honte",
                question:"La musique que tu trouves trop bien mais que t'assumes pas de fou :",
                reponse:""
            },
            {
                name:"musique_moment",
                question:"Ta musique du moment :",
                reponse:""
            },
            ],
            special:[
            {
                name:"special",
                question:"As-tu des demandes spécifiques vis-à-vis de ta.on parrain.ne ?",
                type:"textarea",
                reponse:""
            },
            ]
    }

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


<h2>Questions relous 😴</h2>
{#each questions.relou as question}
<Input name="{question.name}" type="{question.type}" bind:value={question.reponse} choix="{question.choix}">{question.question}</Input> 
{/each}

<h2>Dis m'en un peu plus sur toi 😳</h2>
{#each questions.toi as question}
    <Input name="{question.name}" type="{question.type}"bind:value={question.reponse} choix="{question.choix}">{question.question}</Input> 
{/each}

<h2>Aller, Juste pour le fun 😌</h2>
{#each questions.fun as question}
    <Input name="{question.name}" type="{question.type}"bind:value={question.reponse} choix="{question.choix}">{question.question}</Input> 
{/each}

<h2>T'es plutôt ... 🤔</h2>
{#each questions.plutot as question}
    <Input name="{question.name}" type="{question.type}"bind:value={question.reponse} choix="{question.choix}">{question.question}</Input> 
{/each}

<h2>Un peu de musique ? 🎶</h2>
{#each questions.musique as question}
    <Input name="{question.name}" type="{question.type}"bind:value={question.reponse} choix="{question.choix}">{question.question}</Input> 
{/each}

<h2>Et pour finir 👀</h2>
{#each questions.special as question}
    <Input name="{question.name}" type="{question.type}"bind:value={question.reponse} choix="{question.choix}">{question.question}</Input> 
{/each}

<br>

<Button on:click={sendForm} disabled={sending}>C'est tout bon ✅</Button>
<!-- <pre>{JSON.stringify(questions, null , 4)}</pre> -->