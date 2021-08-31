<script>
    import Input from "@lib/Input.svelte"
    import Button from "@lib/Button.svelte"

    import { userId } from '@/store.js';
    import { auth } from '@/firebase.js';
    import { addLog } from '@/logHandler.js'

    import { useNavigate } from "svelte-navigator";

    const navigate = useNavigate();

    let email
    let password
    let loading

    async function logIn(email,password){
        loading = true
        try {
        let userCredential = await auth.signInWithEmailAndPassword(email, password)

        userId.set(userCredential.user.uid)

        navigate('/spe')
        } catch (e) {
            switch (e.code) {
                case "auth/invalid-email":
                    addLog("error","Ton adresse mail n'est pas valide 😩")
                    
                    break;
                case "auth/user-not-found":
                    addLog("error","Il n'existe encore personne avec cette adresse mail 😩")
                    
                    break;
                case "auth/wrong-password":
                    addLog("error","Ton mot de passe n'est pas valide 😩")
                    
                    break;
            }
        }
        loading = false
    
    }
</script>

<Input name="email" type="email" bind:value={email}>Email</Input>
<Input name="password" type="password" bind:value={password}>Mot de passe</Input>

<Button on:click={() => logIn(email,password)} disabled={loading}>logIn</Button>
<a href="/" on:click|preventDefault={() => navigate('/spe/register')}>Je n'ai pas de compte</a>

<style>
    a{
        text-align: center;
    }
</style>
