<script>
    import Loading from "@lib/Loading.svelte"
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
    // let sup = {
    //     "id": "4b624d19-fbc8-40c5-822d-eec10f61f1d9",
    //     "relou": [
    //         {
    //             "question": "Nom",
    //             "name": "nom",
    //             "reponse": "Sansané"
    //         },
    //         {
    //             "reponse": "Maxime",
    //             "name": "prenom",
    //             "question": "Prénom"
    //         },
    //         {
    //             "name": "surnom",
    //             "reponse": "Maxou",
    //             "question": "Surnom"
    //         },
    //         {
    //             "question": "De quel lycée viens tu ?",
    //             "reponse": "Richelieu",
    //             "name": "lycee"
    //         },
    //         {
    //             "reponse": "frrrrr",
    //             "type": "textarea",
    //             "question": "Ta bête noire en cours : ",
    //             "name": "mauvaisCours"
    //         },
    //         {
    //             "type": "textarea",
    //             "question": "La matière que tu gères : ",
    //             "name": "bonCours",
    //             "reponse": "info"
    //         }
    //     ],
    //     "plutot": [
    //         {
    //             "name": "netflix_sortir",
    //             "choix": [
    //                 "Netflix",
    //                 "Sortir"
    //             ],
    //             "question": "",
    //             "reponse": "Netflix",
    //             "type": "radio"
    //         },
    //         {
    //             "name": "serie_anime",
    //             "choix": [
    //                 "Série",
    //                 "Anime"
    //             ],
    //             "type": "radio",
    //             "question": "",
    //             "reponse": "Anime"
    //         },
    //         {
    //             "choix": [
    //                 "Montagne",
    //                 "Mer"
    //             ],
    //             "question": "",
    //             "name": "montagne_mer",
    //             "type": "radio",
    //             "reponse": "Montagne"
    //         },
    //         {
    //             "choix": [
    //                 "Sport collectif",
    //                 "Sport individuel"
    //             ],
    //             "question": "",
    //             "reponse": "Sport collectif",
    //             "type": "radio",
    //             "name": "collectif_individuel"
    //         },
    //         {
    //             "choix": [
    //                 "Sucré",
    //                 "Salé"
    //             ],
    //             "question": "",
    //             "type": "radio",
    //             "name": "sucré_salé",
    //             "reponse": "Sucré"
    //         },
    //         {
    //             "name": "livre_adaptation",
    //             "type": "radio",
    //             "question": "",
    //             "reponse": "Adaptation",
    //             "choix": [
    //                 "Livre",
    //                 "Adaptation"
    //             ]
    //         },
    //         {
    //             "type": "radio",
    //             "name": "printemps_ete_automne_hiver",
    //             "reponse": "Été",
    //             "question": "",
    //             "choix": [
    //                 "Printemps",
    //                 "Été",
    //                 "Automne",
    //                 "Hiver"
    //             ]
    //         },
    //         {
    //             "choix": [
    //                 "Leibniz ( dx/dt )",
    //                 "Lagrange ( f'(x) )"
    //             ],
    //             "reponse": "Leibniz ( dx/dt )",
    //             "type": "radio",
    //             "name": "leibniz_lagrange",
    //             "question": ""
    //         },
    //         {
    //             "name": "pile_face",
    //             "type": "radio",
    //             "reponse": "Face",
    //             "question": "",
    //             "choix": [
    //                 "Pile",
    //                 "Face"
    //             ]
    //         }
    //     ],
    //     "musique": [
    //         {
    //             "reponse": "the coconut song",
    //             "name": "musique_meilleur",
    //             "question": "La meilleure musique de tous les temps :"
    //         },
    //         {
    //             "question": "La musique que tu trouves trop bien mais que t'assumes pas de fou :",
    //             "name": "musique_honte",
    //             "reponse": "j'assume tout moi je suis un ouf"
    //         },
    //         {
    //             "question": "Ta musique du moment :",
    //             "name": "musique_moment",
    //             "reponse": "fuckers de demon dice"
    //         }
    //     ],
    //     "fun": [
    //         {
    //             "name": "starwars",
    //             "question": "Quel est ton Star Wars préf ?",
    //             "reponse": "Osef de Star Wars",
    //             "choix": [
    //                 "Osef de Star Wars",
    //                 "IV : Un nouvel espoir",
    //                 "V : L'Empire contre-attaque",
    //                 "VI : Le Retour du Jedi",
    //                 "I : La Menace fantôme",
    //                 "II : L'Attaque des clones",
    //                 "III : La Revanche des Sith",
    //                 "VII : Le Réveil de la Force",
    //                 "VIII : Les Derniers Jedi",
    //                 "IX : L'Ascension de Skywalker",
    //                 "Rogue One: A Star Wars Story",
    //                 "Solo: A Star Wars Story"
    //             ],
    //             "type": "radio"
    //         },
    //         {
    //             "type": "radio",
    //             "reponse": "Poufsouffle",
    //             "name": "maison",
    //             "choix": [
    //                 "Je ne suis pas une sorcier ...",
    //                 "Gryffondor",
    //                 "Poufsouffle",
    //                 "Serdaigle",
    //                 "Serpentard"
    //             ],
    //             "question": "Quelle est ta maison dans Harry Potter"
    //         }
    //     ],
    //     "toi": [
    //         {
    //             "type": "textarea",
    //             "reponse": "oui mon frero d'amour",
    //             "name": "amis",
    //             "question": "Déjà des potes dans la promo ?\nSi oui donne leur petit nom"
    //         },
    //         {
    //             "name": "objectifs",
    //             "reponse": "devenir le meilleur dresseur",
    //             "question": "Des objectifs pour la prépa ?",
    //             "type": "textarea"
    //         },
    //         {
    //             "type": "radio",
    //             "reponse": "Discord",
    //             "question": "Ton réseau préféré pour papoter : ",
    //             "name": "contact",
    //             "choix": [
    //                 "Insta",
    //                 "Snap",
    //                 "Whattsap",
    //                 "Discord",
    //                 "Email"
    //             ]
    //         }
    //     ],
    //     "special": [
    //         {
    //             "name": "special",
    //             "reponse": "je veux pas qu'il soit trop con.",
    //             "question": "As-tu des demandes spécifiques vis-à-vis de ta.on parrain.ne ?",
    //             "type": "textarea"
    //         }
    //     ]
    // }

    $: relou = sup.relou
    $: toi = sup.toi
    $: fun = sup.fun
    $: plutot = sup.plutot
    $: musique = sup.musique
    $: special = sup.special

    onMount(async () => {
        sup = await getSup(id)   

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
<h2>{relou[1].reponse} {relou[0].reponse}</h2>
{#if relou[2].reponse}<span>aka {relou[2].reponse}</span>{/if}

<br>

<!-- Relou -->
<AnswerEmbed reponse={relou[3].reponse}>🏫 Viens du lycee</AnswerEmbed>
<AnswerEmbed reponse={relou[5].reponse}>🙂 Point fort</AnswerEmbed>
<AnswerEmbed reponse={relou[4].reponse}>🙃 Point faible</AnswerEmbed>

<!-- Toi -->
<AnswerEmbed reponse={toi[0].reponse}>🔗 Amis déja présent</AnswerEmbed>
<AnswerEmbed reponse={toi[1].reponse}>📈 Ses Objectifs</AnswerEmbed>
<AnswerEmbed choixs={toi[2].choix} reponse={toi[2].reponse}>💬 Réseau Préféré pour papoter</AnswerEmbed>
<AnswerEmbed choixs={toi[3].choix} reponse={toi[3].reponse}>😍 Ses hobbies dans la vie</AnswerEmbed>

<!-- Fun -->
<AnswerEmbed choixs={fun[0].choix} reponse={fun[0].reponse}>⭐️ Star Wars préféré</AnswerEmbed>
<AnswerEmbed choixs={fun[1].choix} reponse={fun[1].reponse}>🧙‍♂️ Maison dans Harry Potter</AnswerEmbed>
<AnswerEmbed choixs={fun[1].choix} reponse={fun[2].reponse}>🦸 Son héros marvel préféré</AnswerEmbed>
<AnswerEmbed choixs={fun[1].choix} reponse={fun[3].reponse}>🖋 Sa devise</AnswerEmbed>
<AnswerEmbed choixs={fun[1].choix} reponse={fun[4].reponse}>😈 Son score de pureté</AnswerEmbed>

<!-- Plutot -->
<Plutot {plutot}>🎭 Il est plutot ...</Plutot>

<!-- Musique -->
<AnswerEmbed reponse={musique[0].reponse}>🥇 La meilleure musique de tous les temps selon lui</AnswerEmbed>
<AnswerEmbed reponse={musique[1].reponse}>😳 La musique qu'il aime mais pas officiellement</AnswerEmbed>
<AnswerEmbed reponse={musique[2].reponse}>⏰ Sa musique du moment</AnswerEmbed>


<AnswerEmbed reponse={special[0].reponse}>ℹ️ Info importantes</AnswerEmbed>

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