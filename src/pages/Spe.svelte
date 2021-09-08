<script>
  import Loading from "@lib/Loading.svelte"
  import Card from "@lib/Card.svelte"

  import { userId } from '@/store.js';
  import { db } from '@/firebase.js';
  import { addLog } from '@/logHandler.js'



  import { useNavigate, useLocation } from "svelte-navigator";
  import { onMount} from "svelte";
  import firebase from 'firebase/app';

  const navigate = useNavigate();
  const location = useLocation();


  $: if (!$userId) {
    navigate("/spe/login", {
      state: { from: $location.pathname },
      replace: true,
    });
  }

  onMount(async () => {
    sups = await getAllSup()
    user = await getUser()

    if (!user.isVerified) addLog("warn","Ton compte n'est pas vérifié.\nEnvoie un message a un.e délégué.e pour qu'il puisse le faire !")

    loading = false
  })
  
  let loading = true

  let sups = [] 
  let user = {
    likes:[]
  }

  async function getAllSup() {
    try {
      let query = await db.collection("sup").where("isVerified", "==", true).get()
      console.log([...query.docs].map(doc => doc.data()))
      return [...query.docs].map(doc => doc.data())
    } catch (e) {
      return []
    }
    
  }

  async function getUser() {
    let doc = await db.collection("spe").doc($userId).get()
    return doc.data()
  }

  async function adopt(id) {
    let docRef = db.collection("spe").doc($userId);

    if (user.likes.includes(id)){

      await docRef.update('likes', firebase.firestore.FieldValue.arrayRemove(id))
      let doc = await docRef.get();
      user = doc.data()
    } else {
      await docRef.update('likes', firebase.firestore.FieldValue.arrayUnion(id))
      let doc = await docRef.get();
      user = doc.data()
    }
  }


  
</script>

<!-- {$userId} -->

<!-- <pre>{JSON.stringify(user)}</pre> -->

<!-- {#if loading || !user.isVerified } -->
{#if loading }
  <Loading/>
{:else}
  {#if  user.isVerified && sups.length > 0}
    <div>
      {#each sups as sup}
        <Card 
          nom={sup.sections[0].questions[0].reponse}
          prenom={sup.sections[0].questions[1].reponse} 
          lycee={sup.sections[0].questions[4].reponse} 
          active={user.likes.includes(sup.id)} 
          id={sup.id}
          on:add={(e) => {adopt(e.detail.id)}}
          on:click={() => { navigate(`/sup/show/${sup.id}`)}}/>
      {/each}
    </div>
  {:else}
    <img src="/Notifications_Flatline.svg" alt="test">
    <p>Il n'y a pas encore de sup a Parrainer 😭</p>
  {/if}
{/if}

<style>
  div{
    display: grid;
    grid-template-columns: repeat(3, minmax(200px, 1fr));
    gap: .5rem;
  }

  @media (max-width: 700px) {
    div{grid-template-columns: repeat(2, minmax(200px, 1fr))}
} 
  @media (max-width: 500px) {
    div{grid-template-columns: repeat(1, minmax(200px, 1fr))}
} 

img{
  height: 50%;
  max-width: calc(100vw - 1rem);
}

p{
  text-align: center;
  font-size: 1.5rem;
  /* font-weight: 800; */
}
</style>